import React, { Component } from 'react';
import './Mapbox.less'

class MapBoxExp extends Component {
  componentDidMount() {
    const { mapboxgl, MapboxLanguage } = window;
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VvamllbWFwYm94IiwiYSI6ImNrcWtodmhlajBnaTUzMW12ZXludGY0YXAifQ.aMxTFTlFdi1tw9PMJtX-Iw';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      // attributionControl: false,
      center: [148.9819, -35.3981],
      zoom: 15.99,
      pitch: 40,
      bearing: 20
    });

    // parameters to ensure the model is georeferenced correctly on the map
    var modelOrigin = [148.98190, -35.39847];
    var modelAltitude = 0;
    var modelRotate = [Math.PI / 2, 0, 0];
    var modelScale = 5.41843220338983e-8;
    
    // transformation parameters to position, rotate and scale the 3D model onto the map
    var modelTransform = {
      translateX: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).x,
      translateY: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).y,
      translateZ: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelScale
    };
    
    var THREE = window.THREE;
    
    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    var customLayer = {
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function(map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();
      
      // create two three.js lights to illuminate the model
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(0, -70, 100).normalize();
      this.scene.add(directionalLight);
      
      var directionalLight2 = new THREE.DirectionalLight(0xffffff);
      directionalLight2.position.set(0, 70, 100).normalize();
      this.scene.add(directionalLight2);
      
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      var loader = new THREE.GLTFLoader();
      loader.load('https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf', (function (gltf) {
      this.scene.add(gltf.scene);
      }).bind(this));
      this.map = map;
      
      // use the Mapbox GL JS map canvas for three.js
      this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl
      });
      
      this.renderer.autoClear = false;
      },
      render: function(gl, matrix) {
      var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
      var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
      var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);
      
      var m = new THREE.Matrix4().fromArray(matrix);
      var l = new THREE.Matrix4().makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
      .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);
      
      this.camera.projectionMatrix.elements = matrix;
      this.camera.projectionMatrix = m.multiply(l);
      this.renderer.state.reset();
      this.renderer.render(this.scene, this.camera);
      this.map.triggerRepaint();
      }
    };
    
    map.on('style.load', function() {
      map.addLayer(customLayer, 'waterway-label');
    });

    map.on('load', function() {
      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;
       
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
       
      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',
        
        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        'fill-extrusion-height': [
        "interpolate", ["linear"], ["zoom"],
        15, 0,
        15.05, ["get", "height"]
        ],
        'fill-extrusion-base': [
        "interpolate", ["linear"], ["zoom"],
        15, 0,
        15.05, ["get", "min_height"]
        ],
        'fill-extrusion-opacity': .6
        }
        }, labelLayerId);
      });
      // map.setLayoutProperty('country-label', 'text-field', ['get', 'name_zh']);
      console.log('before', mapboxgl)
      const status = mapboxgl.getRTLTextPluginStatus()
      if (!status) {
        mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');
      }
      console.log('after', mapboxgl)
      map.addControl(new MapboxLanguage({
        defaultLanguage: 'zh'
    }));
  }

  componentWillUnmount() {
    this.setState = () => false;
  }
  render() {
    return (
      <div id='map' style={{width: '100%', height: '100%'}}></div>
    );
  }
}

export default MapBoxExp;