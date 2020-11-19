/* eslint-disable */
import React from 'react';
import styles from './map.less';
import './map.less';
import * as coordtransform from '@/utils/coordtransform/index';
import riskBlue from '../../img/riskBlue.png';
import riskGreen from '../../img/riskGreen.png';
import riskYellow from '../../img/riskYellow.png';
import riskRed from '../../img/riskRed.png';
import road25 from '@/assets/tsp/road25.png';
import road20 from '@/assets/tsp/road20.png';
import bim25 from '@/assets/tsp/bim25.png';
import bim20 from '@/assets/tsp/bim20.png';
import video25 from '@/assets/tsp/video25.png';
import video20 from '@/assets/tsp/video20.png';
import { customInfoWindow } from './CustomInfoWindow';
import RightSideInfoDrawer from './RightSideInfoDrawer';
import CalendarModal from './CalendarModal';
import * as CONFIG from '@/config/common/commonConfig';
import _ from 'lodash';
class BmapGeo extends React.Component {
  constructor() {
    super();
    this.state = {
      roadPoint: [],
      bimPoint: {
        point: [],
        bimId: '',
      },
      monitorPoint: [],
      showRoadInfo: false,
      showTspInfo: false,
      mapCenter: [],
      checkIndex: ['keyPro', 'tsp'],
      currentMapType: '卫星',
      anchorId: '',
      clickedProject:''
    };
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

  directToMarker = anchorId => {
    let allOverlay = this.map.getOverlays();
    for (let i = 0; i < allOverlay.length; i++) {
      if (allOverlay[i].toString() == '[object Polyline]') {
        let polyline = allOverlay[i];
        if(polyline.projectId ==this.state.clickedProject){
          polyline.setStrokeColor('blue');
        }
        if (polyline.projectId == anchorId) {
          polyline.setStrokeColor('red');
          this.map.setViewport(polyline.pointArray);
          break;
        }
      }
    }
  };

  //地图绘制
  drawMap() {
    const { BMap } = window;
    this.map = new BMap.Map('mapContainer', { enableMapClick: false }); // 创建Map实例
    let map = this.map;
    let zoomNum = 0;
    let mapType = '';
    map.centerAndZoom(new BMap.Point(114.08306, 22.60197), 10); // 初始化地图,设置中心点坐标和地图级别
    // map.centerAndZoom(new BMap.Point(116.32715863448607, 39.990912172420714), 10); // 初始化地图,设置中心点坐标和地图级别
    // map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    let MapTypeControl = new BMap.MapTypeControl({
      mapTypes: [BMAP_SATELLITE_MAP, BMAP_NORMAL_MAP],
      anchor: BMAP_ANCHOR_TOP_LEFT,
    });
    map.addControl(MapTypeControl); //添加二维地图与卫星地图切换按钮
    map.setMapType(BMAP_SATELLITE_MAP);
    map.setCurrentCity('深圳'); // 设置地图显示的城市 此项是必须设置的
    // map.centerAndZoom("深圳",10);      // 初始化地图,用城市名设置地图中心点
    map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
    map.disableDoubleClickZoom(); //禁用地图点击事件
    let viewPoints = [];
    let roadData = this.props.roadData;
    roadData.map(data => {
      data.contractCoordList.map(item => {
        for (let i = 0; i < item.contractCoord.length; i++) {
          let point = coordtransform.wgs84tobd09(item.contractCoord[i].x, item.contractCoord[i].y);
          viewPoints.push(new BMap.Point(point[0], point[1]));
        }
      });
    });
    map.setViewport(viewPoints);
    zoomNum = map.getZoom();
    mapType = map.getMapType();
    map.getMapType().getName() == '地图' && map.setMapStyle({ styleJson: CONFIG.styleJson });
    const getZoomNum = () => {
      debugger;
      /**获取当前地图等级 */
      zoomNum = map.getZoom();
      map.clearOverlays();
      if (zoomNum > 12) {
        let iconList = this.state.checkIndex;
        if (iconList.length > 0) {
          this.drawRoad();
          iconList.forEach(item => {
            item == 'keyPro' && this.drawRoadPic();
            item == 'tsp' && this.drawTspPoint();
            item == 'monitor' && this.drawMonitorPic();
            item == 'bim' && this.drawBimPic();
          });
        }
      } else {
        this.drawRoadPic();
        this.drawRoad();
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
  //危险源图标绘制
  drawTspPoint() {
    const { BMap } = window;
    let _this = this;
    let map = this.map;
    let mapW = map.getSize().width;
    let mapH = map.getSize().height;
    let tspSiteList = this.props.tspSiteList;
    let viewPoints = [];
    tspSiteList.map(item => {
      let width = 30;
      let height = 30;
      let myIcon = '';
      let point = coordtransform.wgs84tobd09(item.longitude, item.latitude);
      let pt = new BMap.Point(point[0], point[1]);
      viewPoints.push(pt);
      if (item.superviseStatus == 1) {
        myIcon = new BMap.Icon(riskBlue, new BMap.Size(width, height), {
          imageSize: new BMap.Size(30, 30),
        });
      } else if (item.superviseStatus == 2) {
        myIcon = new BMap.Icon(riskGreen, new BMap.Size(width, height), {
          imageSize: new BMap.Size(30, 30),
        });
      } else if (item.superviseStatus == 3) {
        myIcon = new BMap.Icon(riskYellow, new BMap.Size(width, width), {
          imageSize: new BMap.Size(30, 30),
        });
      } else if (item.superviseStatus == 4) {
        myIcon = new BMap.Icon(riskRed, new BMap.Size(width, height), {
          imageSize: new BMap.Size(30, 30),
        });
      }
      let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      marker.type = 'tsp';
      marker.siteId = item.siteId; //工地ID
      marker.addEventListener('click', () => {
        this.setState({
          calendarVisible: true,
        });
      });

      let infoHTML = `
        <div class="info-window">
          <p class="hide_text">项目名称：${item.projectName ? item.projectName : ''}</p>
          <p class="hide_text">合同段：${item.workCompany ? item.workCompany : ''}</p>
          <div style="display: flex;justify-content: space-between;" class="p-t-b-10">
            <p style="width:50%;">危险源编号：${item.projectManager ? item.projectManager : ''}</p>
            <p style="width:50%;">重大危险源内容：${
              item.projectNumber ? item.projectNumber : ''
            }</p>
          </div>
          <div style="display: flex;justify-content: space-between;" class="p-t-b-10">
            <p style="width:50%;">危险类别：${item.projectManager ? item.projectManager : ''}</p>
            <p style="width:50%;">风险等级：${item.projectNumber ? item.projectNumber : ''}</p>
          </div>
          <div style="display: flex;justify-content: space-between;" class="p-t-b-10">
            <p style="width:50%;">施工状态：${item.projectManager ? item.projectManager : ''}</p>
            <p style="width:50%;">危险源状态：${item.projectNumber ? item.projectNumber : ''}</p>
          </div>
          <div style="display: flex;justify-content: space-between;" class="p-t-b-10">
            <p style="width:50%;">巡查情况：${item.projectManager ? item.projectManager : ''}</p>
            <p style="width:50%;">动态评估情况：${item.projectNumber ? item.projectNumber : ''}</p>
          </div>
        </div>
          `;
      let myCompOverlay = customInfoWindow(pt, infoHTML, 420, 20);
      let timer = null;
      marker.addEventListener('mouseover', function(e) {
        !_this.state.showTspInfo && map.removeOverlay(myCompOverlay);
        timer = null;
        map.addOverlay(myCompOverlay);
        let infoH = document.getElementById('customInfoWindow').offsetHeight + 30;
        let x = e.pixel.x;
        let y = e.pixel.y;
        _this.moveMap(x, y, 420);
        _this.state.showRoadInfo = false;
        _this.state.showTspInfo = true;
      });

      marker.addEventListener('mouseout', function(e) {
        _this.state.showRoadInfo = true;
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
    let color = ['red', 'blue', 'black'];
    let lineBg = '';
    let map = this.map;
    let roadData = this.props.roadData;
    let points = [];
    let tmpPoints = [];
    roadData.map((data, index) => {
      lineBg = color[index % 3];
      data.contractCoordList.map(item => {
        points = [];
        tmpPoints = [];
        for (let i = 0; i < item.contractCoord.length; i++) {
          if (i > 0 && item.contractCoord[i].roadName != item.contractCoord[i - 1].roadName) {
            points.push(tmpPoints);
            tmpPoints = [];
          } else if (i == item.contractCoord.length - 1) {
            points.push(tmpPoints);
            tmpPoints = [];
          }
          let point = coordtransform.wgs84tobd09(item.contractCoord[i].x, item.contractCoord[i].y);
          tmpPoints.push(new BMap.Point(point[0], point[1]));
        }
      });
      points.map(line => {
        let polyline = new BMap.Polyline(line, {
          strokeColor: 'blue',
          strokeWeight: 5,
          strokeOpacity: 1,
        }); //创建折线
        polyline.projectId = data.projectId;
        polyline.projectName = data.projectName;
        polyline.totalInvestment = data.totalInvestment;
        polyline.scheduleTime = data.scheduleTime;
        polyline.pointArray = tmpPoints; //把整条折线存起来
        polyline.addEventListener('click', () => {
          polyline.setStrokeColor('red');
          let state = {
            clickedProject: data.projectId,
          };
          if (!this.RightSideInfoDrawer.state.visible) {
            state['visible'] = true;
          }
          /**鼠标点击时移出信息弹窗 */
          this.RightSideInfoDrawer.setState({ ...state }, () => {
            this.RightSideInfoDrawer.scrollToCard(data.projectId);
          });
        });
        map.addOverlay(polyline); //将折线描绘至地图
      });
    });
  }
  drawBimPic() {
    const { BMap } = window;
    let map = this.map;
    let bimPoint = this.state.bimPoint;
    bimPoint.point.map(item => {
      let pt = new BMap.Point(item.x, item.y);
      let myIcon = new BMap.Icon(bim25, new BMap.Size(25, 25));
      let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      marker.id = bimPoint.bimId;
      marker.type = 'bim';
      marker.addEventListener('click', function(e) {
        console.log('bim点击事件====>>>>', e.target);
      });
      map.addOverlay(marker);
    });
  }
  drawRoadPic() {
    const { BMap } = window;
    let map = this.map;
    let roadPoint = this.state.roadPoint;
    roadPoint.map(item => {
      let pt = new BMap.Point(item.x, item.y);
      let myIcon = new BMap.Icon(road25, new BMap.Size(25, 25));
      let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      marker.type = 'keyPro';
      marker.addEventListener('click', function(e) {
        console.log('点击事件====>>>>', e.target);
      });
      map.addOverlay(marker);
    });
  }
  drawMonitorPic() {
    //监控图标
    const { BMap } = window;
    let map = this.map;
    let monitorPoint = this.state.monitorPoint;
    monitorPoint.map(item => {
      let pt = new BMap.Point(item.x, item.y);
      let myIcon = new BMap.Icon(video25, new BMap.Size(25, 25));
      let marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
      marker.type = 'monitor';
      marker.addEventListener('click', function(e) {
        console.log('摄像头点击事件====>>>>', e.target);
      });
      map.addOverlay(marker);
    });
  }

  componentDidMount() {
    this.drawMap();
    this.drawTspPoint();
    this.drawRoad();
    // // this.drawBimPic();
    // this.drawRoadPic()
  }

  render() {
    let list = [
      { type: 'station', name: '驻地与场站' },
      { type: 'keyPro', name: '关键工程' },
      { type: 'tsp', name: '危险源图标' },
      { type: 'pic', name: '全景照片' },
      { type: 'monitor', name: '监控视频' },
      { type: 'bim', name: 'BIM模型' },
    ];
    let { checkIndex, currentMapType } = this.state;
    const onCheckOneBox = item => {
      if (checkIndex.indexOf(item.type) == -1) {
        checkIndex.push(item.type);
        item.type == 'keyPro' && this.drawRoad();
        item.type == 'tsp' && this.drawTspPoint();
        item.type == 'monitor' && this.drawMonitorPic();
        item.type == 'bim' && this.drawBimPic();
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
      directToMarker: this.directToMarker,
    };
    const calendarProps = {
      calendarVisible: this.state.calendarVisible,
      closeCalendar: () => {
        this.setState({
          calendarVisible: false,
        });
      },
    };

    return (
      <div className={styles.normal}>
        {/* <h1 className={styles.title}>百度地图测试demo</h1> */}
        <div className={styles.container} id="bMapContainer">
          <div style={{ width: '100%', height: '100%' }} id="mapContainer"></div>
          <div className={styles.checkBox_list}>
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
          </div>
          <RightSideInfoDrawer {...drawerProps} ref={ref => (this.RightSideInfoDrawer = ref)} />
          <CalendarModal {...calendarProps} />
        </div>
      </div>
    );
  }
}

export default BmapGeo;
