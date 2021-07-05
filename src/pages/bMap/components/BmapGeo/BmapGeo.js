/* eslint-disable */
import React from 'react';
import styles from './map.less';
import './map.less';
import * as coordtransform from '@/utils/coordtransform/index';
import riskBlue from '../../img/riskBlue.png';
import riskGreen from '../../img/riskGreen.png';
import riskYellow from '../../img/riskYellow.png';
import riskRed from '../../img/riskRed.png';
import bim25 from '@/assets/tsp/bim25.png';
import video25 from '@/assets/tsp/video25.png';
import projectStart from '../../img/proStart.png';
import projectEnd from '../../img/proEnd.png';
import contractStart from '../../img/contractStart.png';
import contractEnd from '../../img/contractEnd.png';
import station from '../../img/station.png';
import siteIcon from '../../img/site.png';
import interFlow from '../../img/interFlow.png';
import bridge from '../../img/bridge.png';
import service from '../../img/service.png';
import department from '../../img/department.png';
import tunnel from '../../img/tunnel.png';
import panoramic from '../../img/panoramic.png';
import { customInfoWindow } from './CustomInfoWindow';
import RightSideInfoDrawer from './RightSideInfoDrawer';
import CalendarModal from './CalendarModal';
import * as CONFIG from '@/config/common/commonConfig';
import _ from 'lodash';
import config from '../../config/mapConfig';
import { Icon } from 'antd';
class BmapGeo extends React.Component {
  constructor() {
    super();
    this.state = {
      showTspInfo: false,
      rightSiderVisible: false,
      checkIndex: ['keyProject'],
      currentMapType: '卫星',
      anchorId: '',
      freshLoading: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.type != this.props.type) {
      this.drawMap(newProps.type);
      this.drawRoadStartAndEndPic();
      this.drawRoad();
      let iconList = this.state.checkIndex;
      if (iconList.length > 0) {
        iconList.forEach(item => {
          item == 'keyProject' && this.drawKeyProject();
          item == 'danger' && this.drawDangerPoint();
          item == 'monitor' && this.drawMonitorPic();
          item == 'bim' && this.drawBimPic();
          item == 'panoramic' && this.drawPanoramicData();
          item == 'station' && this.drawStationAndSite();
        });
      }
    }
  }
  /**
   *
   * @param {number} x 鼠标的X方向像素值
   * @param {number} y 鼠标的y方向像素值
   * @param {number} infoW 信息窗口宽度
   * @param {number} infoH 信息窗口高度
   */
  moveMap(x, y, infoW) {
    //设置信息窗口偏移
    let map = this.map;
    let mapW = map.getSize().width;
    let mapH = map.getSize().height;
    let infoH = document.getElementById('customInfoWindow').offsetHeight + 30;
    if (x < (infoW + 20) / 2) {
      map.panBy((infoW + 20) / 2 - x, 0, true);
    } else if (x > mapW - (infoW + 20) / 2) {
      map.panBy(mapW - (infoW + 20) / 2 - x, 0, true);
    }
    if (y < infoH) {
      map.panBy(0, infoH - y, true);
    }
  }

  //寻找路线，id要匹配的线的属性，compareIds为要查找的线的属性值
  findRoadLine = (id, compareIds = []) => {
    let allOverlay = this.map.getOverlays();
    let polylines = [];
    for (let i = 0; i < allOverlay.length; i++) {
      if (allOverlay[i].toString() == '[object Polyline]') {
        let line = allOverlay[i];
        if (compareIds.indexOf(line[id]) !== -1) {
          polylines.push(line);
        }
      }
    }
    return polylines;
  };

  //地图绘制
  drawMap(propstype) {
    const { BMap } = window;
    const {type} = this.props;
    if ((propstype != undefined && propstype == 1) || (propstype == undefined && type == 1)) {
      var map = initMap({
        style: snowStyle,
        heading: -45.3,
        tilt: 80,
        zoom: 17,
        center: [106.542353,29.565448],
        skyColors: [
            // 地面颜色
            'rgba(226, 237, 248, 0)',
            // 天空颜色
            'rgba(186, 211, 252, 1)'
        ],
      });

      map.setDisplayOptions({
          building: true
      });

      var view = new mapvgl.View({
          map: map
      });

      fetch('/static/chongqing.json').then(function (rs) {
          return rs.json();
      }).then(function (rs) {
          var data = rs;
          var polygons = [];
          var len = data.length;
          for (var i = 0; i < len; i++) {
              var line = data[i];
              var polygon = [];
              var pt = [line[1] * 512, line[2] * 512];
              for (var j = 3; j < line.length; j += 2) {
                  pt[0] += line[j] / 100 / 2;
                  pt[1] += line[j + 1] / 100 / 2;
                  polygon.push([pt[0], pt[1]]);
              }

              polygons.push({
                  geometry: {
                      type: 'Polygon',
                      coordinates: [polygon]
                  },
                  properties: {
                      height: line[0] / 2
                  }
              });
          }

          // 面
          var shaperLayer = new mapvgl.ShapeLayer({
              color: 'rgba(230, 230, 230, 1)',
              style: 'window',
              opacity: 1.0,
              enablePicked: true,
              autoSelect: true, // 根据鼠标位置来自动设置选中项
              selectedColor: '#ee1111', // 选中项颜色
              selectedIndex: -1,
              onClick: (e) => {
                console.log(e);
              }
          });
          view.addLayer(shaperLayer);
          shaperLayer.setData(polygons);

          // 点
          var pointlayer = new mapvgl.PointLayer({
            color: 'rgba(50, 50, 200, 1)',
            blend: 'lighter',
            size: 20
          });
          var pointData = [{
              geometry: {
                  type: 'Point',
                  coordinates: [106.586837,29.576216]
              }
          }];
          view.addLayer(pointlayer);
          pointlayer.setData(pointData);

          // 窄线
          var simpleLineLayer = new mapvgl.SimpleLineLayer({
            color: 'rgba(50, 50, 200, 1)',
            blend: 'lighter',
          });
          var simpleLineData = [{
            geometry: {
                type: 'LineString',
                coordinates: [
                    [106.578501,29.57843],
                    [106.578801,29.589085]
                ]
            }
          }]
          view.addLayer(simpleLineLayer);
          simpleLineLayer.setData(simpleLineData);

          // 粗线
          var lineLayer = new mapvgl.LineLayer({
            color: 'rgba(50, 50, 200, 1)',
            blend: 'lighter',
          });
          var lineData = [{
            geometry: {
                type: 'LineString',
                coordinates: [
                    [106.541432,29.588897],
                    [106.565507,29.588018],
                    [106.568884,29.581171],
                    [106.565147,29.566847],
                    [106.54869,29.558364],
                ]
            }
          }]
          view.addLayer(lineLayer);
          lineLayer.setData(lineData);

          // icon
          var iconLayer = new mapvgl.IconLayer({
            width: 100 / 2,
            height: 153 / 2,
            offset: [0, - 153 / 2 / 2],
            icon: '../../../../assets/dingwei.png',
            enablePicked: true, // 是否可以拾取
            selectedIndex: -1, // 选中项
            selectedColor: '#ff0000', // 选中项颜色
            autoSelect: true, // 根据鼠标位置来自动设置选中项
            onClick: (e) => { // 点击事件
                console.log(e)
            },
          });
          var iconData = [{
              geometry: {
                  type: 'Point',
                  coordinates: [
                    106.590111,29.576082
                  ],
                  id: 1213
              }
          }]
          view.addLayer(iconLayer);
          iconLayer.setData(iconData);
      });
    } else {
      this.map = new BMap.Map('mapContainer', { enableMapClick: false }); // 创建Map实例
      let map = this.map;
      let zoomNum = 0;
      let mapType = '';
      map.centerAndZoom(new BMap.Point(114.08306, 22.60197), 10); // 初始化地图,设置中心点坐标和地图级别
      let MapTypeControl = new BMap.MapTypeControl({
        mapTypes: [BMAP_SATELLITE_MAP, BMAP_NORMAL_MAP],
        anchor: BMAP_ANCHOR_TOP_LEFT,
      });
      map.addControl(MapTypeControl); //添加二维地图与卫星地图切换按钮
      map.setMapType(BMAP_SATELLITE_MAP);
      map.setCurrentCity('西安'); // 设置地图显示的城市 此项是必须设置的
      // map.centerAndZoom("深圳",10);      // 初始化地图,用城市名设置地图中心点
      map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
      map.disableDoubleClickZoom(); //禁用地图点击事件
      let viewPoints = [];
      let roadData = this.props.roadData;
      roadData.map(data => {
        for (let i = 0; i < data.roadNameList.length; i++) {
          let point = coordtransform.wgs84tobd09(
            data.roadNameList[i].latitude,
            data.roadNameList[i].longitude,
          );
          viewPoints.push(new BMap.Point(point[0], point[1]));
        }
      });
      map.setViewport(viewPoints, {
        enableAnimation: true,
      });
      zoomNum = map.getZoom();
      mapType = map.getMapType();
      map.getMapType().getName() == '地图' && map.setMapStyle({ styleJson: CONFIG.styleJson });
      const getZoomNum = () => {
        /**获取当前地图等级 */
        zoomNum = map.getZoom();
        map.clearOverlays();
        this.drawRoadStartAndEndPic();
        this.drawRoad();
        let iconList = this.state.checkIndex;
        if (iconList.length > 0) {
          iconList.forEach(item => {
            item == 'keyProject' && this.drawKeyProject();
            item == 'danger' && this.drawDangerPoint();
            item == 'monitor' && this.drawMonitorPic();
            item == 'bim' && this.drawBimPic();
            item == 'panoramic' && this.drawPanoramicData();
            item == 'station' && this.drawStationAndSite();
          });
        }
      };
      map.addEventListener('zoomend', getZoomNum); /**地图缩放结束事件 */
      map.addEventListener('maptypechange', () => {
        /** 地图类型改事件，即切换地图、卫星地图 */
        let mapType = map.getMapType().getName();
        this.setState({
          currentMapType: mapType,
        });
      });
    }
  }
  //危险源图标绘制
  drawDangerPoint() {
    const { BMap } = window;
    let _this = this;
    let map = this.map;
    let dangereData = this.props.dangereData;
    let viewPoints = [];
    dangereData.map(item => {
      let width = 25;
      let height = 25;
      let myIcon = '';
      let point = coordtransform.wgs84tobd09(
        item.coordinateList[0].latitude,
        item.coordinateList[0].longitude,
      );
      let pt = new BMap.Point(point[0], point[1]);
      viewPoints.push(pt);
      if (item.level == '1') {
        myIcon = new BMap.Icon(riskGreen, new BMap.Size(width, height), {
          imageSize: new BMap.Size(25, 25),
        });
      } else if (item.level == '2') {
        myIcon = new BMap.Icon(riskBlue, new BMap.Size(width, height), {
          imageSize: new BMap.Size(25, 25),
        });
      } else if (item.level == '3') {
        myIcon = new BMap.Icon(riskYellow, new BMap.Size(width, width), {
          imageSize: new BMap.Size(25, 25),
        });
      } else if (item.level == '4') {
        myIcon = new BMap.Icon(riskRed, new BMap.Size(width, height), {
          imageSize: new BMap.Size(25, 25),
        });
      }
      let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      marker.type = 'danger';
      marker.projectId = item.projectId; //工地ID
      marker.contractId = item.contractId; //工地ID
      marker.addEventListener('click', () => {
        this.setState({
          calendarVisible: true,
        });
      });

      let infoHTML = `
        <div class="info-window">
          <p class="hide_text">项目名称：${item.projectName ? item.projectName : ''}</p>
          <p class="hide_text">合同段：${item.contractName ? item.contractName : ''}</p>
          <div style="display: flex;justify-content: space-between;" class="p-t-b-10">
            <p style="width:50%;">危险源编号：${item.code ? item.code : ''}</p>
            <p style="width:50%;">重大危险源内容：${item.content ? item.content : ''}</p>
          </div>
          <div style="display: flex;justify-content: space-between;" class="p-t-b-10">
            <p style="width:50%;">危险类别：${item.type ? item.type : ''}</p>
            <p style="width:50%;">风险等级：${
              item.level ? (config.RISK_LEVEL.find(fi => fi.id == item.level) || {}).name : ''
            }</p>
          </div>
          <div style="display: flex;justify-content: space-between;" class="p-t-b-10">
            <p style="width:50%;">施工状态：${
              item.constructStatus
                ? (config.CONSTRUCT_STATUS.find(fi => fi.id == item.constructStatus) || {}).name
                : ''
            }</p>
            <p style="width:50%;">危险源状态：${
              item.riskStatus
                ? (config.RISK_STATUS.find(fi => fi.id == item.riskStatus) || {}).name
                : ''
            }</p>
          </div>
          <div style="display: flex;justify-content: space-between;" class="p-t-b-10">
            <p style="width:50%;">巡查情况：${
              item.patrolResult
                ? (config.CHECK_STATUS.find(fi => fi.id == item.patrolResult) || {}).name
                : ''
            }</p>
            <p style="width:50%;">动态评估情况：${
              item.dynamicEvaluation ? item.dynamicEvaluation : ''
            }</p>
          </div>
        </div>
          `;
      let myCompOverlay = customInfoWindow(pt, infoHTML, 435, 20);
      let timer = null;
      marker.addEventListener('mouseover', function(e) {
        !_this.state.showTspInfo && map.removeOverlay(myCompOverlay);
        timer = null;
        map.addOverlay(myCompOverlay);
        let x = e.pixel.x;
        let y = e.pixel.y;
        _this.moveMap(x, y, 435);
        _this.state.showTspInfo = true;
      });

      marker.addEventListener('mouseout', function(e) {
        _this.state.showTspInfo = true;
        map.removeOverlay(myCompOverlay);
        clearTimeout(timer);
        timer = null;
      });
      map.addOverlay(marker); // 将标注添加到地图中
    });
  }
  drawRoad() {
    const { BMap } = window;
    let map = this.map;
    let roadData = this.props.roadData;
    let lines = [];
    let tmpPoints = [];
    roadData.map((item, index) => {
      lines = [];
      tmpPoints = [];
      let points = [];
      for (let i = 0; i < item.roadNameList.length; i++) {
        let point = coordtransform.wgs84tobd09(
          item.roadNameList[i].latitude,
          item.roadNameList[i].longitude,
        );
        tmpPoints.push(new BMap.Point(point[0], point[1]));
        points.push(new BMap.Point(point[0], point[1]));
        if (
          i < item.roadNameList.length - 1 &&
          item.roadNameList[i].roadName != item.roadNameList[i + 1].roadName
        ) {
          lines.push(tmpPoints);
          tmpPoints = [];
        } else if (i == item.roadNameList.length - 1) {
          if (item.roadNameList[i].roadName !== item.roadNameList[i - 1].roadName) {
            lines.push(tmpPoints);
            tmpPoints = [];
          }
          tmpPoints.push(new BMap.Point(point[0], point[1]));
          lines.push(tmpPoints);
          tmpPoints = [];
        }
      }
      lines.map(line => {
        let polyline = new BMap.Polyline(line, {
          strokeColor: this.state.anchorId == item.contractId ? 'red' : '#ffebb4',
          strokeWeight: 5,
          strokeOpacity: 1,
        }); //创建折线
        polyline.projectId = item.projectId;
        polyline.contractId = item.contractId;
        polyline.projectName = item.projectName;
        polyline.pointArray = points; //把整条折线存起来
        polyline.addEventListener('click', () => {
          let activeLines = this.findRoadLine('contractId', [this.state.anchorId, item.contractId]);
          for (let li of activeLines) {
            if (li.contractId == this.state.anchorId) {
              li.setStrokeColor('#ffebb4');
            } else {
              li.setStrokeColor('red');
            }
          }
          let state = {
            anchorId: item.contractId,
          };
          if (!this.state.rightSiderVisible) {
            state['rightSiderVisible'] = true;
          }
          /**鼠标点击时移出信息弹窗 */
          this.setState({ ...state });
          this.RightSideInfoDrawer.scrollToCard(item.contractId);
        });
        map.addOverlay(polyline); //将折线描绘至地图
      });
    });
  }
  drawBimPic() {
    const { BMap } = window;
    let map = this.map;
    let bimPoint = this.props.bimPoints;
    bimPoint.map(item => {
      if (item.isBim) {
        let point = coordtransform.wgs84tobd09(item.latitude, item.longitude);
        let pt = new BMap.Point(point[0], point[1]);
        let myIcon = new BMap.Icon(bim25, new BMap.Size(25, 25));
        let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        marker.projectId = item.pid;
        marker.contractId = item.cid;
        marker.type = 'bim';
        marker.addEventListener('click', function(e) {
          console.log('bim点击事件====>>>>', e.target);
        });
        map.addOverlay(marker);
      }
    });
  }
  //道路起讫点
  drawRoadStartAndEndPic() {
    const { BMap } = window;
    let map = this.map;
    let _this = this;
    let startAndEndData = this.props.startAndEndData;
    startAndEndData.map(item => {
      let point = coordtransform.wgs84tobd09(item.latitude, item.longitude);
      let pt = new BMap.Point(point[0], point[1]);
      let myIcon = new BMap.Icon(
        item.bizType == 0 && item.type == 0
          ? projectStart
          : item.bizType == 0 && item.type == 1
          ? projectEnd
          : item.bizType == 1 && item.type == 0
          ? contractStart
          : item.bizType == 1 && item.type == 1
          ? contractEnd
          : null,
        new BMap.Size(25, 25),
        {
          imageSize: new BMap.Size(25, 25),
        },
      );
      let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      marker.type = 'startEnd';
      let infoHTML = `
      <div class="info-window">
        <p class="hide_text">${
          item.bizType == 0 && item.type == 0
            ? '项目起点桩号：'
            : item.bizType == 0 && item.type == 1
            ? '项目终点桩号：'
            : item.bizType == 1 && item.type == 0
            ? (item.contractName ? item.contractName : '') + '标起点桩号：'
            : item.bizType == 1 && item.type == 1
            ? (item.contractName ? item.contractName : '') + '标终点桩号：'
            : ''
        }${item.pile ? item.pile : ''}</p>
      </div>
        `;
      let myCompOverlay = customInfoWindow(pt, infoHTML, 200, 20);
      let timer = null;
      marker.addEventListener('mouseover', function(e) {
        !_this.state.showTspInfo && map.removeOverlay(myCompOverlay);
        timer = null;
        map.addOverlay(myCompOverlay);
        let x = e.pixel.x;
        let y = e.pixel.y;
        _this.moveMap(x, y, 200);
        _this.state.showTspInfo = true;
      });
      marker.addEventListener('mouseout', function(e) {
        _this.state.showTspInfo = true;
        map.removeOverlay(myCompOverlay);
        clearTimeout(timer);
        timer = null;
      });
      map.addOverlay(marker);
    });
  }
  drawMonitorPic() {
    //监控图标
    const { BMap } = window;
    let _this = this;
    let map = this.map;
    let monitorData = this.props.videoPoints;
    monitorData.map(item => {
      if (item.isVideo) {
        let point = coordtransform.wgs84tobd09(item.latitude, item.longitude);
        let pt = new BMap.Point(point[0], point[1]);
        let myIcon = new BMap.Icon(video25, new BMap.Size(25, 25));
        let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        marker.projectId = item.pid;
        marker.contractId = item.cid;
        marker.type = 'monitor';
        marker.addEventListener('click', () => {
          this.props.getVideoList();
        });
        let infoHTML = `
        <div class="info-window">
          <p class="hide_text">项目名称：${item.projectName ? item.projectName : ''}</p>
          <p class="hide_text">合同段：${item.contractName ? item.contractName : ''}</p>
        </div>
          `;
        let myCompOverlay = customInfoWindow(pt, infoHTML, 200, 20);
        let timer = null;
        marker.addEventListener('mouseover', function(e) {
          !_this.state.showTspInfo && map.removeOverlay(myCompOverlay);
          timer = null;
          map.addOverlay(myCompOverlay);
          let x = e.pixel.x;
          let y = e.pixel.y;
          _this.moveMap(x, y, 200);
          _this.state.showTspInfo = true;
        });
        marker.addEventListener('mouseout', function(e) {
          _this.state.showTspInfo = true;
          map.removeOverlay(myCompOverlay);
          clearTimeout(timer);
          timer = null;
        });
        map.addOverlay(marker);
      }
    });
  }
  drawKeyProject() {
    const { BMap } = window;
    let _this = this;
    let map = this.map;
    let keyProjectData = this.props.keyProjectData;
    keyProjectData.map(item => {
      let point = coordtransform.wgs84tobd09(item.latitude, item.longitude);
      let pt = new BMap.Point(point[0], point[1]);
      let myIcon = new BMap.Icon(
        item.type == 1
          ? bridge
          : item.type == 2
          ? tunnel
          : item.type == 3
          ? service
          : item.type == 4
          ? interFlow
          : item.type == 5
          ? station
          : null,
        new BMap.Size(25, 25),
        {
          imageSize: new BMap.Size(25, 25),
        },
      );
      let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      marker.projectId = item.projectId;
      marker.contractId = item.contractId;
      marker.type = 'keyProject';
      let infoHTML = `
      <div class="info-window">
        <p class="hide_text">中点里程桩号：${item.pile ? item.pile : ''}</p>
        <p class="hide_text">名称：${item.name ? item.name : ''}</p>
      </div>
        `;
      let myCompOverlay = customInfoWindow(pt, infoHTML, 200, 20);
      let timer = null;
      marker.addEventListener('mouseover', function(e) {
        !_this.state.showTspInfo && map.removeOverlay(myCompOverlay);
        timer = null;
        map.addOverlay(myCompOverlay);
        let x = e.pixel.x;
        let y = e.pixel.y;
        _this.moveMap(x, y, 200);
        _this.state.showTspInfo = true;
      });
      marker.addEventListener('mouseout', function(e) {
        _this.state.showTspInfo = true;
        map.removeOverlay(myCompOverlay);
        clearTimeout(timer);
        timer = null;
      });
      map.addOverlay(marker);
    });
  }
  drawStationAndSite() {
    const { BMap } = window;
    let _this = this;
    let map = this.map;
    let stationData = this.props.stationData;
    stationData.map(item => {
      let point = coordtransform.wgs84tobd09(item.latitude, item.longitude);
      let pt = new BMap.Point(point[0], point[1]);
      let myIcon = new BMap.Icon(item.type == 1 ? department : siteIcon, new BMap.Size(25, 25), {
        imageSize: new BMap.Size(25, 25),
      });
      let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      marker.projectId = item.projectId;
      marker.contractId = item.contractId;
      marker.type = 'station';
      let infoHTML = `
      <div class="info-window">
        <p class="hide_text">${item.name ? item.name : ''}</p>
      </div>
        `;
      let myCompOverlay = customInfoWindow(pt, infoHTML, 200, 20);
      let timer = null;
      marker.addEventListener('mouseover', function(e) {
        !_this.state.showTspInfo && map.removeOverlay(myCompOverlay);
        timer = null;
        map.addOverlay(myCompOverlay);
        let x = e.pixel.x;
        let y = e.pixel.y;
        _this.moveMap(x, y, 200);
        _this.state.showTspInfo = true;
      });
      marker.addEventListener('mouseout', function(e) {
        _this.state.showTspInfo = true;
        map.removeOverlay(myCompOverlay);
        clearTimeout(timer);
        timer = null;
      });
      map.addOverlay(marker);
    });
  }
  drawPanoramicData() {
    const { BMap } = window;
    let map = this.map;
    let panoramicData = this.props.panoramicData;
    let _this = this;
    panoramicData.map(item => {
      let point = coordtransform.wgs84tobd09(item.latitude, item.longitude);
      let pt = new BMap.Point(point[0], point[1]);
      let myIcon = new BMap.Icon(panoramic, new BMap.Size(25, 25), {
        imageSize: new BMap.Size(25, 25),
      });
      let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      marker.projectId = item.projectId;
      marker.contractId = item.contractId;
      marker.type = 'panoramic';
      let infoHTML = `
      <div class="info-window">
        <p class="hide_text">项目名称：${item.projectName ? item.projectName : ''}</p>
        <p class="hide_text">合同段：${item.contractName ? item.contractName : ''}</p>
        <p class="hide_text">全景点名称：${item.name ? item.name : ''}</p>
      </div>
        `;
      let myCompOverlay = customInfoWindow(pt, infoHTML, 200, 20);
      let timer = null;
      marker.addEventListener('mouseover', function(e) {
        !_this.state.showTspInfo && map.removeOverlay(myCompOverlay);
        timer = null;
        map.addOverlay(myCompOverlay);
        let x = e.pixel.x;
        let y = e.pixel.y;
        _this.moveMap(x, y, 200);
        _this.state.showTspInfo = true;
      });
      marker.addEventListener('mouseout', function(e) {
        _this.state.showTspInfo = true;
        map.removeOverlay(myCompOverlay);
        clearTimeout(timer);
        timer = null;
      });
      marker.addEventListener('click', function(e) {
        window.open(item.url);
      });

      map.addOverlay(marker);
    });
  }

  componentDidMount() {
    this.drawMap();
    this.drawRoadStartAndEndPic();
    this.drawRoad();
    let iconList = this.state.checkIndex;
    if (iconList.length > 0) {
      iconList.forEach(item => {
        item == 'keyProject' && this.drawKeyProject();
        item == 'danger' && this.drawDangerPoint();
        item == 'monitor' && this.drawMonitorPic();
        item == 'bim' && this.drawBimPic();
        item == 'panoramic' && this.drawPanoramicData();
        item == 'station' && this.drawStationAndSite();
      });
    }
  }

  render() {
    const {type} = this.props;
    let list = [
      { type: 'station', name: '驻地与场站' },
      { type: 'keyProject', name: '关键工程' },
      { type: 'danger', name: '危险源图标' },
      { type: 'panoramic', name: '全景照片' },
      { type: 'monitor', name: '监控视频' },
      { type: 'bim', name: 'BIM模型' },
    ];
    let { checkIndex, currentMapType, rightSiderVisible } = this.state;
    const onCheckOneBox = item => {
      if (checkIndex.indexOf(item.type) == -1) {
        checkIndex.push(item.type);
        item.type == 'keyProject' && this.drawKeyProject();
        item.type == 'danger' && this.drawDangerPoint();
        item.type == 'monitor' && this.drawMonitorPic();
        item.type == 'bim' && this.drawBimPic();
        item.type == 'panoramic' && this.drawPanoramicData();
        item.type == 'station' && this.drawStationAndSite();
      } else {
        checkIndex.splice(checkIndex.indexOf(item.type), 1);
        let allOverlay = this.map.getOverlays();
        for (let i = 0; i < allOverlay.length; i++) {
          if (allOverlay[i].toString() == '[object Marker]' && allOverlay[i].type == item.type) {
            this.map.removeOverlay(allOverlay[i]);
          }
        }
      }
      this.setState({
        checkIndex,
      });
    };
    const drawerProps = {
      roadData: this.props.roadData,
      anchorId: this.state.anchorId,
      directToMarker: anchorId => {
        let polylines = this.findRoadLine('contractId', [this.state.anchorId, anchorId]);
        polylines
          .filter(item => item.contractId == this.state.anchorId)
          .forEach(fe => {
            fe.setStrokeColor('#ffebb4');
          });
        let viewPoints = [];
        polylines
          .filter(item => item.contractId == anchorId)
          .forEach(fe => {
            fe.setStrokeColor('red');
            viewPoints = viewPoints.concat(fe.pointArray);
          });
        this.setState(
          {
            anchorId,
          },
          () => {
            this.map.setViewport(viewPoints);
          },
        );
      },
      visible: rightSiderVisible,
      onClose: () => {
        this.setState({
          rightSiderVisible: false,
        });
        let anchorId = this.state.anchorId;
        let polylines = this.findRoadLine('contractId', [anchorId]);
        polylines.forEach(item => item.setStrokeColor('#ffebb4'));
      },
      showInfoBox: () => {
        this.setState({
          rightSiderVisible: true,
        });
      },
    };
    const calendarProps = {
      projectId: '00469fda708f411aafcb7368b3c27cc1',
      contractId: '16ae9205871f49b1975ff722618d78ed',
      sourceId: 'd03ffa59f73b4bf6915eb7ae56318dc9',
      calendarVisible: this.state.calendarVisible,
      closeCalendar: () => {
        this.setState({
          calendarVisible: false,
        });
      },
    };
    const freshCheckStatus = () => {
      this.setState({
        freshLoading: true,
      });
      let allOverlay = this.map.getOverlays();
      for (let i = 0; i < allOverlay.length; i++) {
        if (
          allOverlay[i].toString() == '[object Marker]' &&
          allOverlay[i].type !== 'keyProject' &&
          allOverlay[i].type !== 'startEnd'
        ) {
          this.map.removeOverlay(allOverlay[i]);
        }
      }
      this.setState(
        {
          checkIndex: ['keyProject'],
          freshLoading: false,
          rightSiderVisible: false,
          anchorId: '',
          currentMapType: '卫星',
        },
        () => {
          this.drawMap();
          this.drawRoad();
          this.drawRoadStartAndEndPic();
          this.drawKeyProject();
        },
      );
    };
    return (
      <div className={styles.normal}>
        {/* <h1 className={styles.title}>百度地图测试demo</h1> */}
        <div className={styles.container} id="bMapContainer">
          <div style={{ width: '100%', height: '100%' }} id="mapContainer"></div>
          {type === 0 && <div className={styles.checkBox_list}>
            <Icon
              type="sync"
              spin={this.state.freshLoading}
              style={{ color: '#fff', padding: '5px 15px 5px 5px' }}
              onClick={freshCheckStatus}
            />
            {list.length > 0 &&
              list.map(item => {
                return (
                  <div className={styles.checkBox_li} onClick={() => onCheckOneBox(item)}>
                    <div className={styles.checkBox}>
                      <div
                        className={checkIndex.indexOf(item.type) !== -1 ? styles.check : null}
                      ></div>
                    </div>
                    <span style={{ color: currentMapType == '地图' ? 'black' : 'white' }}>
                      {item.name}
                    </span>
                  </div>
                );
              })}
          </div>}
          <RightSideInfoDrawer {...drawerProps} ref={ref => (this.RightSideInfoDrawer = ref)} />
        </div>
      </div>
    );
  }
}

export default BmapGeo;
