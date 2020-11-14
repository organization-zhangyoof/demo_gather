import React, { Component } from 'react';
import styles from './bimStyle.less';
import { Icon, Switch, Popover } from 'antd';
import 'cesium/Source/Widgets/widgets.css';
const Cesium = window.Cesium;
class BimDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewer: null,
      switchOpen: false,
      bimAddress: '',
      openChangeBim: false,
      openLayerControl: false,
      openOperate: false,
      openMeasure: false,
      showMapMark: false,
      showTianDiMap: false,
      positionInfo: {},
      positionInfoPop: false,
      flyPosition: {},
      allSceneLayers:[]
    };
  }

  componentDidMount() {
    this.initComponent();
  }

  async initComponent() {
    let viewer = new Cesium.Viewer(this.cesiumContainer);
    this.setState({
      viewer: viewer,
    });
    //添加天地图全球中文标记
    let labelImagery = new Cesium.TiandituImageryProvider({
      mapStyle: Cesium.TiandituMapsStyle.CIA_C, //天地图全球中文注记服务
      token: '72f2b9d3be4dde9ae012ee075bfa7bc0', //由天地图官网申请的密钥
    });
    viewer.imageryLayers.addImageryProvider(labelImagery);
  }

  async onloadModel() {
    this.setState({
      switchOpen: false,
      openChangeBim: false,
      openLayerControl: false,
      openOperate: false,
      openMeasure: false,
      positionInfo: {},
      positionInfoPop: false,
    });

    let { viewer, bimAddress, flyPosition, allSceneLayers } = this.state;
    let scene = viewer.scene;
    let widget = viewer.cesiumWidget;
    this.pickPositionHandler &&
      this.pickPositionHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    try {
      let promise = scene.open(bimAddress);
      Cesium.when(promise, function(layers) {
        flyPosition
          ? scene.camera.flyTo({
              destination: flyPosition.destination,
              orientation: flyPosition.orientation,
            })
          : viewer.zoomTo(promise);
        for (let i = 0; i < layers.length; i++) {
          allSceneLayers.push(layers);
          layers[i].selectEnabled = false;
        }
      });
    } catch (e) {
      if (widget._showRenderLoopErrors) {
        let title = '渲染时发生错误，已停止渲染。';
        widget.showErrorPanel(title, undefined, e);
      }
    }
  }

  render() {
    let {
      viewer,
      openChangeBim,
      openLayerControl,
      openMeasure,
      openOperate,
      showMapMark,
      showTianDiMap,
    } = this.state;

    //展开或收缩功能按钮
    const switchClick = () => {
      let { switchOpen } = this.state;
      this.setState({
        switchOpen: !switchOpen,
        openChangeBim: false,
        openLayerControl: false,
        openOperate: false,
        openMeasure: false,
      });
    };

    /***************************************量算功能************************************************/
    //打开或收缩量算扩展按钮取
    const switchMeasure = () => {
      let tmp = this.state.openMeasure;
      this.setState({ openMeasure: !tmp });
    };
    //测距
    const measuerDistance = viewer => {
      let tmp = this.state.openMeasure;
      this.setState({ openMeasure: !tmp });
    };
    //测面
    const measuerArea = viewer => {
      let tmp = this.state.openMeasure;
      this.setState({ openMeasure: !tmp });
    };
    //测高
    const measuerHeight = viewer => {
      let tmp = this.state.openMeasure;
      this.setState({ openMeasure: !tmp });
    };
    //清除测量
    const clearMeasure = viewer => {
      let tmp = this.state.openMeasure;
      this.setState({ openMeasure: !tmp });
    };

    /**************************************地图操作******************************************************/
    //打开或收缩操作扩展按钮取
    const switchOperate = () => {
      let tmp = this.state.openOperate;
      this.setState({ openOperate: !tmp });
    };
    //拾取坐标
    const pickPosition = viewer => {
      this.setState({ openOperate: false });
      let scene = viewer.scene;
      this.pickPositionHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
      //设置鼠标左键单击回调事件
      this.pickPositionHandler.setInputAction(e => {
        //首先移除之前添加的点
        viewer.entities.removeAll();
        //获取点击位置笛卡尔坐标
        let position = scene.pickPosition(e.position);
        //将笛卡尔坐标转化为经纬度坐标
        let cartographic = Cesium.Cartographic.fromCartesian(position);
        let longitude = Cesium.Math.toDegrees(cartographic.longitude);
        let latitude = Cesium.Math.toDegrees(cartographic.latitude);
        let height = cartographic.height;
        if (height < 0) {
          height = 0;
        }
        this.setState({
          positionInfo: {
            screen: e.position,
            longitude,
            latitude,
            height,
          },
          positionInfoPop: true,
        });
        //在点击位置添加对应点
        viewer.entities.add(
          new Cesium.Entity({
            point: new Cesium.PointGraphics({
              color: Cesium.Color.AQUAMARINE,
              pixelSize: 10,
              outlineColor: Cesium.Color.BROWN,
            }),
            position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height + 0.5),
          }),
        );
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    };
    //绘制标示
    const drawMark = viewer => {};
    //剖切
    const cutOperate = viewer => {};
    //压平
    const toFlatten = viewer => {};

    /**************************************图层控制**************************************************************/
    //图层控制开关
    const switchLayerControl = () => {
      let tmp = this.state.openLayerControl;
      this.setState({ openLayerControl: !tmp });
    };
    //显示或关闭底图注记
    const showMapMarkClcik = (checked, viewer) => {
      console.log('showMapMark===', checked);
      this.setState({ showMapMark: checked });
    };
    //显示或取消天地底图
    const shouTianDiMapClick = (checked, viewer) => {
      console.log('shouTianDiMap===', checked);
      this.setState({ showTianDiMap: checked });
    };

    /***************************************模型切换*******************************************************/
    //打开或收缩模型切换扩展按钮取
    const switchChangBim = () => {
      let tmp = this.state.openChangeBim;
      this.setState({ openChangeBim: !tmp });
    };

    const changeModel = () => {
      this.setState(
        {
          bimAddress: 'http://iserver2.gcnao.cn/iserver/services/3D-shajiangxilu/rest/realspace',
        },
        () => {
          this.onloadModel();
        },
      );
    };
    const changeSuperBim = () => {
      this.setState(
        {
          bimAddress: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace',
          flyPosition: {
            destination: Cesium.Cartesian3.fromDegrees(116.4486, 39.9092, 91.3293),
            orientation: {
              heading: 3.179304500963121,
              pitch: -0.46239072362282485,
              roll: 6.283185307179583,
            },
          },
        },
        () => {
          this.onloadModel();
        },
      );
    };
    const clearLayers = () => {

    }
    return (
      <div className={styles._bim_modal_}>
        <div className={styles.btn_box}>
          <div className={this.state.switchOpen ? styles.btn_other_on : styles.btn_other_off}>
            <div className={styles.btn_item} onClick={switchMeasure}>
              量算
              <div className={openMeasure ? styles.expand_measuer_on : styles.expand_measuer_off}>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    measuerDistance(viewer);
                  }}
                >
                  测距
                </span>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    measuerArea(viewer);
                  }}
                >
                  测面
                </span>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    measuerHeight(viewer);
                  }}
                >
                  测高
                </span>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    clearMeasure(viewer);
                  }}
                >
                  清除
                </span>
              </div>
            </div>

            <div className={styles.btn_item} onClick={switchOperate}>
              地图
              <br />
              操作
              <div className={openOperate ? styles.expand_operate_on : styles.expand_operate_off}>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    pickPosition(viewer);
                  }}
                >
                  拾取坐标
                </span>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    drawMark(viewer);
                  }}
                >
                  绘制标示
                </span>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    cutOperate(viewer);
                  }}
                >
                  剖切
                </span>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    toFlatten(viewer);
                  }}
                >
                  压平
                </span>
              </div>
            </div>

            <div className={styles.btn_item} onClick={() => switchLayerControl(viewer)}>
              图层
              <br />
              控制
              <div
                className={
                  openLayerControl
                    ? styles.expand_layer_control_on
                    : styles.expand_layer_control_off
                }
              >
                <Switch
                  checkedChildren="底图注记"
                  unCheckedChildren="底图注记"
                  className={showMapMark ? styles.sub_switch_on : styles.sub_switch_off}
                  onClick={(checked, e) => {
                    e.stopPropagation();
                    showMapMarkClcik(checked, viewer);
                  }}
                />
                <Switch
                  checkedChildren="天地图"
                  unCheckedChildren="天地图"
                  className={showTianDiMap ? styles.sub_switch_on : styles.sub_switch_off}
                  onClick={(checked, e) => {
                    e.stopPropagation();
                    shouTianDiMapClick(checked, viewer);
                  }}
                />
              </div>
            </div>

            <div className={styles.btn_item} onClick={switchChangBim}>
              模型
              <br />
              切换
              <div
                className={
                  openChangeBim ? styles.expand_change_bim_on : styles.expand_change_bim_off
                }
              >
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    changeModel();
                  }}
                >
                  自有模型
                </span>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    changeSuperBim();
                  }}
                >
                  超图模型
                </span>
                <span
                  className={styles.expand_item}
                  onClick={e => {
                    e.stopPropagation();
                    clearLayers(viewer);
                  }}
                >
                  清除模型
                </span>
              </div>
            </div>
            <div className={styles.btn_item}>功能</div>
          </div>
          <div
            className={this.state.switchOpen ? styles.btn_switch_on : styles.btn_switch_off}
            onClick={switchClick}
          >
            <Icon type="plus" style={{ fontSize: 40, color: '#fff' }} />
          </div>
        </div>
        <Popover
          title="位置信息"
          content={
            <div>
              <p>经度：{this.state.positionInfo.longitude}</p>
              <p>纬度：{this.state.positionInfo.latitude}</p>
              <p>高度：{this.state.positionInfo.height}</p>
            </div>
          }
          visible={this.state.positionInfoPop}
        >
          <div
            style={{
              display: this.state.positionInfoPop ? 'block' : 'none',
              position: 'absolute',
              top: this.state.positionInfoPop ? this.state.positionInfo.screen.y : 0,
              left: this.state.positionInfoPop ? this.state.positionInfo.screen.x : 0,
              zIndex: 1,
            }}
          ></div>
        </Popover>

        <div id="cesiumContainer" ref={element => (this.cesiumContainer = element)}></div>
      </div>
    );
  }
}

export default BimDemo;
