/* eslint-disable */
import React, {Component} from 'react';
import styles from './map.less';
import * as coordtransform from  '@/utils/coordtransform/index';
import { Checkbox, Icon, Select, Tooltip } from 'antd';
import tsp030 from '@/assets/tsp/tsp030.gif';
import tsp1 from '@/assets/tsp/tsp1.png';
import tsp120 from '@/assets/tsp/tsp120.png';
import tsp2 from '@/assets/tsp/tsp2.png';
import tsp220 from '@/assets/tsp/tsp220.png';
import tsp3 from '@/assets/tsp/tsp3.png';
import tsp4 from '@/assets/tsp/tsp4.png';
import tsp420 from '@/assets/tsp/tsp420.png';
import tsp5 from '@/assets/tsp/tsp5.png';
import tsp520 from '@/assets/tsp/tsp520.png';
import tsp6 from '@/assets/tsp/tsp6.png';
import tsp620 from '@/assets/tsp/tsp620.png';
import road25 from '@/assets/tsp/road25.png';
import road251 from '@/assets/tsp/road251.png';
import bim25 from '@/assets/tsp/bim25.png';
import video25 from '@/assets/tsp/video25.png';
import { customInfoWindow, mapStylesJson, getData,getRoadData,getOneData} from './CustomInfoWindow'
import * as mapFun from './mapCommomFun';
class Map extends React.Component{
  constructor(){
    super();
    this.state={
      zoomNum:11,//地图等级
      infoPoints:[],// 道路、BIM、摄像头描点数据
      showRoadInfo:true,//是否显示道路信息弹框
      isRoad:true,//是否描绘道路
      isTsp:true,//是否描绘监测点
      mapType:"地图",//地图类型
      mapCenter:'',// 地图中心点
      copyMapCenter:'',
      isSetZoomAndCenter:true,//是否设置地图等级及中心点
      copyProjectId:'',
    }
  }
  /**鼠标悬浮至监测点或者道路时判断地图是否需要偏移 */
  /**
   * @param {number} x 鼠标的X方向像素值
   * @param {number} y 鼠标的Y方向像素值
   * @param {number} infoW 信息弹窗的宽度值
   */
  moveMap(x,y,infoW){
    let map = this.map;
    let mapW = map.getSize().width;//获取地图的宽度值
    let mapH = map.getSize().height;//获取地图的高度值
    let infoH = document.getElementById("customInfoWindow").offsetHeight + 30;//获取信息弹窗的高度值
    if(x<((infoW+20)/2)){
      map.panBy((infoW+20)/2-x,0, true);
    }else if(x>(mapW -(infoW+20)/2)){
      map.panBy((mapW-(infoW+20)/2)-x,0, true);
    }
    if(y < (infoH)){
      map.panBy(0,(infoH-y), true);
    }
  }
  //根据地图等级来描绘
  judgeToDraw(){
    this.map.clearOverlays();
    if(this.state.zoomNum>12){
      if(this.state.isTsp){
        this.drawTspPoint();
      }
      if(this.state.isRoad){
        this.drawContract()
        this.drawBimPic();
        this.drawMonitorPic()
      }
    }else{
      if(this.state.isTsp){
        this.drawTspPoint();
      }
      if(this.state.isRoad){
        this.drawContract()
        this.drawRoadPic()
      }
    }
  }
  /**描绘地图 */
  drawMap() {
    const { BMap } = window;
    let _this=this;
    this.map = new BMap.Map("myMap", { enableMapClick: false }); // 创建Map实例
    let map = this.map;
    if(!this.state.mapCenter){
      this.state.mapCenter = new BMap.Point(114.08306, 22.60197)
    }

    map.centerAndZoom(this.state.mapCenter , this.state.zoomNum); // 初始化地图,设置中心点坐标和地图级别
    let MapTypeControl = new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP ],anchor:BMAP_ANCHOR_TOP_LEFT})
    map.addControl(MapTypeControl);//添加二维地图与卫星地图切换按钮
    // map.setCurrentCity("深圳"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
    map.disableDoubleClickZoom();//禁用双击放大
    if(this.state.mapType !== '地图'){//判断显示普通地图还是卫星地图
        map.setMapType(BMAP_SATELLITE_MAP)
    }
    this.state.zoomNum = map.getZoom()
    map.clearOverlays();//清空所有地图覆盖物
    this.judgeToDraw()
    map.setMapStyle({ styleJson: mapStylesJson });//设置自定义地图属性
    const getZoomNum =()=>{/**获取当前地图等级 */
      this.state.zoomNum = map.getZoom()// 记录更改后地图等级
      this.state.mapCenter = map.getCenter()// 记录更改后地图中心点
      map.clearOverlays();//清空所有地图覆盖物
      this.judgeToDraw()
    }
    map.addEventListener("zoomend",getZoomNum);/** 地图缩放结束事件 */
    map.addEventListener("maptypechange",function(){/** 地图类型改事件，即切换地图、卫星地图 */
      _this.state.mapType = map.getMapType().ad // 记录更改后的地图类型
    })
    map.addEventListener("moveend",function(){/** 地图移动结束事件 */
      _this.state.mapCenter = map.getCenter() // 记录更改后地图中心点
      _this.state.copyMapCenter = map.getCenter()// 拷贝更改后地图中心点
    })

    if(!this.props.tspSiteListProps.tspFlag && this.props.mapData.projectList.length==1){
        let viewPoints = [];
        this.props.mapData.projectList.map(item=>{
          if(item.projectId != this.state.copyProjectId){
            this.state.copyProjectId = item.projectId;
            item.contractCoordList.map(tmp=>{
              tmp.contractCoord.map(coord=>{
                let point = coordtransform.wgs84tobd09(coord.x, coord.y);
                let pt = new BMap.Point(point[0], point[1]);
                viewPoints.push(pt);
              })
            })
            this.map.setViewport(viewPoints);//设置道路中心点及地图等级
            _this.state.mapCenter = map.getCenter() // 记录更改后地图中心点
            _this.state.copyMapCenter = map.getCenter()// 拷贝更改后地图中心点
          }
        })
      }else{
        this.state.copyProjectId = '';//置空拷贝项目ID
      }
  }
  /**描绘TSP监测点 */
  drawTspPoint(){

    let _this = this
    let map = this.map;
    let tspSiteList = this.props.tspSiteListProps.tspSiteList;
    let tspFlag = this.props.tspSiteListProps.tspFlag
    if(tspSiteList.length>0 && tspFlag){
      let viewPoints = [];
      tspSiteList.map((item) => {
        let gifWidth = 30;
        let gifHeight = 30;
        let width = 20;
        let height = 20;
        let myIcon = '';
        let point = coordtransform.wgs84tobd09(item.longitude, item.latitude);
        let pt = new BMap.Point(point[0], point[1]);
        viewPoints.push(pt);
        //根据监测点状态值描绘不同图片
        // if (item.superviseStatus == 1) {
          myIcon = new BMap.Icon(tsp120, new BMap.Size(width, height));
        // } else if (item.superviseStatus == 2) {
        //   myIcon = new BMap.Icon(tsp220, new BMap.Size(width, height));
        // } else if (item.superviseStatus == 3) {
        //   myIcon = new BMap.Icon(tsp030, new BMap.Size(gifWidth, gifHeight));
        // } else if (item.superviseStatus == 4) {
        //   myIcon = new BMap.Icon(tsp420, new BMap.Size(width, height));
        // } else if (item.superviseStatus == 5) {
        //   myIcon = new BMap.Icon(tsp520, new BMap.Size(width, height));
        // } else if (item.superviseStatus == 6) {
        //   myIcon = new BMap.Icon(tsp620, new BMap.Size(width, height));
        // }
        let marker = new BMap.Marker(pt, {icon: myIcon}); // 创建标注
        marker.type = "tsp"
        marker.siteId = item.siteId;//工地ID
        marker.projectName = item.projectName;//工地名称
        marker.regCompany = item.regCompany ;//监管单位
        marker.workCompany = item.workCompany;//施工单位
        marker.projectManager =item.projectManager;//项目经理
        marker.projectNumber = item.projectNumber;//联系电话
        marker.address = item.address;//详细地址
        marker.equipDetailList = item.equipDetailList;//工地设备信息[{}]
        marker.setTop(true)
        marker.addEventListener("click", function(e){
          let tspSiteId = e.target.siteId;
          let projectName = e.target.projectName;
          _this.props.onPageTsp ({tspSiteId, projectName})
        });

        let infoHTML = mapFun.tspPointInfo(item)
        let myCompOverlay = customInfoWindow( pt, infoHTML, 420, 20 );
        let timer = null;
        marker.addEventListener("mouseover",function(e){// 设置监测点鼠标移入事件
          // 停止定时器
          _this.stop();
          map.addOverlay(myCompOverlay);
          let x = e.pixel.x;// 获取鼠标X方向像素值
          let y = e.pixel.y;// 获取鼠标Y方向像素值
          _this.moveMap(x,y,420);
          _this.state.showRoadInfo = false;
          /** 设置信息弹窗下方的信息自动滚动 */
          let obj = document.getElementById("scrollBox");
          let H = obj.scrollHeight; /* 总高度（包括可见区域及不可见区域高度）*/
          let h = obj.clientHeight;/* 可见区域高度*/
          let move = 2;// 设置滚动值
          let scrollDirection = 1;// 设置滚动方向1为向下滚动，-1为向上滚动
          if ( H - h ){
            timer = setInterval(function(){
              if(obj.scrollTop == 0){
                scrollDirection = 1;
              }else if((H-h) == obj.scrollTop ){
                scrollDirection = -1;
              }
              obj.scrollBy(0,move*scrollDirection);
            },200)
          }

        });
        marker.addEventListener("mouseout",function(e){//添加监测点鼠标移除事件
          //开启定时器
          _this.start();
          _this.state.showRoadInfo = true
          map.removeOverlay(myCompOverlay);
          clearTimeout(timer);
          timer = null;
        });
        map.addOverlay(marker); // 将标注添加到地图中
      })
      if(_this.state.isSetZoomAndCenter){
        map.setViewport(viewPoints);
        _this.state.mapCenter = map.getCenter()// 记录更改后地图中心点
        _this.state.zoomNum = map.getZoom()// 记录更改后地图等级
        _this.state.copyMapCenter = map.getCenter()// 拷贝更改后地图中心点
        _this.state.isSetZoomAndCenter = !_this.state.isSetZoomAndCenter;
      }

    }
  }
  /**依据合同段描绘道路线 */
  drawContract(){
    let color = ['#4E85FC', '#FF0000', '#00CC00'];
    let _this = this;
    let map = this.map;
    let myCompOverlay = '';
    let roadData = this.props.mapData.projectList;
    // let roadData = getData().data;//假数据
    if (roadData.length>0){
      let points = [];
      let tmpPoints = []
      let projectId = ''; //项目ID
      let projectName = ''; //项目名称
      let totalInvestment =  '';//项目投资金额
      let scheduleTime = '';//计划工期
      let isBim = '';//是否有BIM模型
      let isVideo = '';//是否显示摄像头
      let laneNum = '';//车道数
      let designSpeed = ''//设计时速;
      let mileage = ''//里程
      let isChangeLineWeight = true;//是否更改线宽
      let contractInfo = [];//合同段信息
      let contractList = [];//项目合同段列表
      let depot = false;//是否是场站
      _this.state.infoPoints = [];//重置道路图标、BIM图标、摄像头图标点坐标
      roadData.map((data,index)=>{
        projectId = data.projectId && data.projectId != 'null' ? data.projectId : '';
        projectName = data.projectName && data.projectName != 'null' ? data.projectName :'';
        totalInvestment = data.totalInvestment && data.totalInvestment != 'null'?data.totalInvestment : '';
        scheduleTime = data.scheduleTime && data.scheduleTime != 'null' ? data.scheduleTime : '';
        laneNum = data.roadLine && data.roadLine != 'null' ? data.roadLine:'';
        designSpeed = data.speed && data.speed != 'null' ? data.speed:'';
        mileage = data.mileage && data.mileage != 'null' ? data.mileage:'';
        isBim = data.bimModel == '1' ? true : false;
        /**提取摄像头、BIM、道路图标绘制点 */
        mapFun.getInterestingPoints(data.contractCoordList,_this.state.infoPoints,projectId,projectName,totalInvestment,scheduleTime,isBim,)

        points = [];
        tmpPoints=[];
        contractList:[];
        contractInfo:[];
        data.contractCoordList.map((item,index)=>{
          contractList.push(
            {
              "idx":index,
              "projectId":projectId,
              "projectName":projectName,
              "contractId":item.contractId && item.contractId != 'null'?item.contractId:'',
              "contractName":item.contractName && item.contractName != 'null'?item.contractName:'',
              "sgdwname":item.sgdwname && item.sgdwname != 'null'?item.sgdwname:''
            }
          )
          contractInfo.push(
            {
              "contractAmount":item.contractAmount && item.contractAmount != 'null'?item.contractAmount:'',//合同额
              "laneNum":item.lane && item.lane != 'null'?item.lane:'',//车道数
              "startTime":item.startDate && item.startDate != 'null' ? item.startDate:'',//开工时间
              "endTime":item.endDate && item.endDate != 'null'?item.endDate:'',//竣工时间
              "designSpeed":item.speed &&　item.speed != 'null'?item.speed:'',//设计时速
              "mileage":item.totalLength && item.totalLength != 'null'?item.totalLength:''//里程
            }
          )
          // mapFun.switchPoints(item.contractCoord,points,tmpPoints )
          /**按照道路名称重新组合道路数据*/
          if(item.contractCoord.length>1){
            for(let i = 0;i<item.contractCoord.length;i++){
              let point = coordtransform.wgs84tobd09(item.contractCoord[i].x*1, item.contractCoord[i].y*1);
              tmpPoints.push(new BMap.Point(point[0], point[1]))
              if( i<(item.contractCoord.length-1) && item.contractCoord[i].roadName != item.contractCoord[i+1].roadName){
                points.push(tmpPoints);
                tmpPoints= [];
              }else if(i == item.contractCoord.length - 1 ){
                if(item.contractCoord[i].roadName == item.contractCoord[i-1].roadName){
                  let point = coordtransform.wgs84tobd09(item.contractCoord[i].x*1, item.contractCoord[i].y*1);
                  tmpPoints.push(new BMap.Point(point[0], point[1]))
                  points.push(tmpPoints);
                  tmpPoints= [];
                }else{
                  points.push(tmpPoints);
                  tmpPoints= [];
                  let point = coordtransform.wgs84tobd09(item.contractCoord[i].x*1, item.contractCoord[i].y*1);
                  tmpPoints.push(new BMap.Point(point[0], point[1]))
                  points.push(tmpPoints);
                  tmpPoints= [];
                }
              }
            }
          }
          //是否是场站(场站字段depot;有则depot字段值为1；否则不是场站)
          if(item.depot == 1){
            depot = true;
          }
        })
        if(!depot){//如果不是场站则绘制道路线
          points.map((line)=>{
            let polyline = new BMap.Polyline(line ,{strokeColor:color[index%3], strokeWeight:4, strokeOpacity:1});   //创建折线
            polyline.projectId = projectId;
            polyline.projectName = projectName;
            polyline.totalInvestment = totalInvestment;
            polyline.scheduleTime = scheduleTime;
            polyline.laneNum = laneNum;
            polyline.designSpeed = designSpeed;
            polyline.mileage = mileage;
            polyline.addEventListener("mousemove",function(e){//鼠标悬浮至道路时显示信息弹窗
              // polyline.setStrokeColor('blue')//更改线色
              // polyline.setStrokeWeight(7)//更改线宽
              if(_this.state.showRoadInfo){
                map.removeOverlay(myCompOverlay);
                let pt = e.point;
                let infoHTML = mapFun.roadHoverInfo(e.target)
                myCompOverlay = customInfoWindow(pt,infoHTML,250,10);
                map.addOverlay(myCompOverlay);
                let x = e.pixel.x;//获取鼠标X方向像素值
                let y = e.pixel.y;//获取鼠标Y方向像素值
                _this.moveMap(x,y,220)
              }

            });
            polyline.addEventListener("mouseout",function(e){//鼠标移出时移出信息弹窗
              if(isChangeLineWeight){
                // polyline.setStrokeWeight(2)
              }
              map.removeOverlay(myCompOverlay);
            });
            polyline.addEventListener("click",function(e){//鼠标点击时移出信息弹窗
              map.removeOverlay(myCompOverlay);
              isChangeLineWeight = false;
              // polyline.setStrokeWeight(7)
              document.getElementById("infoModal").style.display='block';

              mapFun.roadClickInfo(e.target,contractList,contractInfo)
              document.getElementById("closeInfo").addEventListener("click",function(){
                document.getElementById("infoModal").style.display='none'
                isChangeLineWeight = true;
              })
            });
            map.addOverlay(polyline);//将折线描绘至地图
          })
        }else{//如果是场站则绘制场站面
          points.map(line=>{
            var polygon = new BMap.Polygon(line, {strokeColor:color[index%3], strokeWeight:4, strokeOpacity:1,fillColor:color[index%3]});  //创建多边形
            map.addOverlay(polygon);   //增加多边形
          })
        }
      })
    }else{
      _this.state.infoPoints = [];//重置道路图标、BIM图标、摄像头图标点坐标
      _this.state.copyProjectId = '';//置空拷贝项目ID
    }
  }
  //描绘BIM图标
  drawBimPic(){
    let map = this.map;
    let _this = this
    let points = this.state.infoPoints;
    if(points && points.length>0){
      points.map(item=>{
        if(item.isBim){
          let point = coordtransform.wgs84tobd09(item.bimPoint.x, item.bimPoint.y);
          let pt = new BMap.Point(point[0], point[1]);
          let myIcon = new BMap.Icon(bim25, new BMap.Size(25, 25));
          let marker = new BMap.Marker(pt, {icon: myIcon}); // 创建标注
          marker.projectId = item.projectId;
          marker.projectName = item.projectName;
          marker.type = "bim"
          marker.addEventListener("click",function(e){
            _this.props.onPageBIM(item.projectId, null, item.projectName);
          });
          marker.addEventListener("mouseover",function(e){
            _this.state.showRoadInfo = false
          })
          marker.addEventListener("mouseout",function(e){
            _this.state.showRoadInfo = true
          })
          map.addOverlay(marker);
        }
      })
    }
  }
  //描绘道路图标
  drawRoadPic(){
    let map = this.map;
    let _this = this;
    let points = this.state.infoPoints;
    if(points && points.length>0){
      points.map(item=>{
        let point = coordtransform.wgs84tobd09(item.bimPoint.x, item.bimPoint.y);
        let pt = new BMap.Point(point[0], point[1]);
        let myIcon
        if(item.isBim){
          myIcon = new BMap.Icon(road251, new BMap.Size(25, 25));
        }else{
          myIcon = new BMap.Icon(road25, new BMap.Size(25, 25));
        }
        let marker = new BMap.Marker(pt, {icon: myIcon}); // 创建标注
        marker.setTop(true)
        marker.type = "road"
        let infoHTML = mapFun.roadHoverInfo(item)
        let myCompOverlay = customInfoWindow(pt,infoHTML,220,10);
        marker.addEventListener("mouseover",e=>{
          //关闭定时器
          _this.stop();
          _this.state.showRoadInfo = false
          map.addOverlay(myCompOverlay);
          _this.moveMap(x,y,220)
        })
        marker.addEventListener("mouseout",e=>{
          //开启定时器
          _this.start();
          _this.state.showRoadInfo = true
          map.removeOverlay(myCompOverlay);
        })
        map.addOverlay(marker);
      })
    }
  }
  //描绘摄像头图标
  drawMonitorPic(){
    let map = this.map;
    let _this = this;
    let points = this.state.infoPoints;
    if(points && points.length>0){
      points.map(item=>{
        item.monitorPoint.map(tmp =>{
          if(tmp.isVideo){
            let point = coordtransform.wgs84tobd09(tmp.point.x, tmp.point.y);
            let pt = new BMap.Point(point[0], point[1]);
            let myIcon = new BMap.Icon(video25, new BMap.Size(25, 25));
            let marker = new BMap.Marker(pt, {icon: myIcon}); // 创建标注
            marker.type = "monitor"
            marker.addEventListener("click",function(e){
              console.log("摄像头点击事件====>>>>")
              _this.props.onPageMonitor(item.projectId);
            });
            marker.addEventListener("mouseover",function(e){
              _this.state.showRoadInfo = false
            })
            marker.addEventListener("mouseout",function(e){
              _this.state.showRoadInfo = true
            })
            map.addOverlay(marker);
          }
        })
      })
    }
  }
  start=()=>{
    const onQuerySiteList = this.props.tspSiteListProps.onQuerySiteList;
    const tspFlag = this.props.tspSiteListProps.tspFlag
    if(tspFlag){
      if(!this.tspTimer){
        this.tspTimer = setInterval(onQuerySiteList,60000);
      }
    }
  }
  stop(){
    clearInterval(this.tspTimer);
    this.tspTimer = null;
  }
  componentDidMount(){
    this.drawMap();
    this.start()
  }
  componentWillUnmount(){
    this.stop();
  }

  resetClick = () => {
    let copyMapCenter = this.state.copyMapCenter
    this.map.setCenter(copyMapCenter)
    this.state.mapType = '地图'
    this.setState({isRoad:true,isTsp:true,isSetZoomAndCenter:true})
    this.drawMap()
  }
  changeRode = (e) => {
    this.setState({ isRoad: e.target.checked })
    this.drawMap()

  }
  changeTsp = (e) => {
    this.setState({ isTsp: e.target.checked })
    this.drawMap()
  }
  render(){
    // console.log("map_this=====>>>>>",this)
    if(this.map){
      this.map.clearOverlays();
      if(!this.props.tspSiteListProps.tspFlag){
        this.stop();
      }else{
        this.start();
      }

      if (this.props.tspSiteListProps.tspSiteList.length>0 && this.props.tspSiteListProps.tspFlag){
        this.drawTspPoint();
      }

      if (this.props.mapData.projectList.length>0){
        this.drawMap();
        if(this.state.isRoad){
          this.drawContract();
        }
      }else if (this.props.mapData.projectList.length == 1){
        this.drawMap();
        if(this.state.isRoad){
          this.drawContract();
        }
      }
    }
    return(
      <div className={styles.normal} style={{height:this.props.centerHeight||'100%'}}>
        <div className={styles.top_right} >
            <p className={styles.reset}>
              <Tooltip placement="left" title="重置" onClick={this.resetClick}>
                <Icon type="reload" />
              </Tooltip>
            </p>
            {this.props.tspSiteListProps.tspFlag?
              <div>
                <p style={{padding:'0 15px',display:'inline-block'}}>
                  <Checkbox checked={this.state.isRoad} onChange={this.changeRode}>项目路线</Checkbox>
                </p>
                <p style={{display:'inline-block'}}>
                  <Checkbox checked={this.state.isTsp} onChange={this.changeTsp}>TSP监测</Checkbox>
                </p>
              </div>:''
            }
        </div>
        <div id="myMap" style={{height:'100%', paddingTop: '0.5em',paddingBottom: '0.4em'}}></div>
        {this.props.tspSiteListProps.tspFlag?
          <div className={styles.lenged}>
            <p className={styles.title}>图 &nbsp;&nbsp;&nbsp; 例</p>
            <div className={styles.lenged_pic}>
              <div className={styles.lenged_contant}>
                <img src={tsp1} />
                <p>正常</p>
              </div>
              <div className={styles.lenged_contant}>
                <img src={tsp2} />
                <p>预警</p>
              </div>
              <div className={styles.lenged_contant}>
                <img src={tsp3} />
                <p>报警</p>
              </div>
              <div className={styles.lenged_contant}>
                <img src={tsp4} />
                <p>离线</p>
              </div>
              <div className={styles.lenged_contant}>
                <img src={tsp5} />
                <p>异常</p>
              </div>
              <div className={styles.lenged_contant}>
                <img src={tsp6} />
                <p>未接入</p>
              </div>
            </div>
          </div>:""
        }
      </div>
    )
  }
}

export default Map;
