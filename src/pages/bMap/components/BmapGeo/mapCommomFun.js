/* eslint-disable */
import * as coordtransform from  '@/utils/coordtransform/index';
/**
  * @param {array} contractCoord 合同段坐标数组
  * @param {array} arr 最后生成的坐标数组
  * @param {array} tmpArr 临时数组
*/
export function switchPoints(contractCoord,arr,tmpArr ){
  for(let i = 0;i<contractCoord.length;i++){
    let point = coordtransform.wgs84tobd09(contractCoord[i].x*1, contractCoord[i].y*1);
    tmpArr.push(new BMap.Point(point[0], point[1]))
    if( i<(contractCoord.length-1) && contractCoord.roadName != contractCoord[i+1].roadName){
      arr.push(tmpArr);
      tmpArr= [];
    }else if(i == contractCoord.length - 1 ){
      if(contractCoord[i].roadName == contractCoord[i-1].roadName){
        let point = coordtransform.wgs84tobd09(contractCoord[i].x*1, contractCoord[i].y*1);
        tmpArr.push(new BMap.Point(point[0], point[1]))
        arr.push(tmpArr);
        tmpArr= [];
      }else{
        arr.push(tmpArr);
        tmpArr= [];
        let point = coordtransform.wgs84tobd09(contractCoord[i].x*1, contractCoord[i].y*1);
        tmpArr.push(new BMap.Point(point[0], point[1]))
        arr.push(tmpArr);
        tmpArr= [];
      }
    }
  }
}
/**
 * 道路悬浮弹框信息
 * @param {*} obj
 */
export function roadHoverInfo(obj){
  let infoHTML = `
    <div style="border-radius: 15px;padding:5px 10px;color:#fff;background:rgba(0,0,0,0.65)">
      <div style =" display:flex">
        <p>项目名称：</p>
        <p style="flex:1">${obj.projectName?obj.projectName:''}</p>
      </div>
      <p class="p-t-b-5 margin_0">项目投资金额(万)： ${obj.totalInvestment?obj.totalInvestment:''}</p>
      <p class="p-t-b-5 margin_0">计划工期(月)： ${obj.scheduleTime?obj.scheduleTime:''}</p>
      <p class="p-t-b-5 margin_0">车道数： ${obj.laneNum?obj.laneNum:''}</p>
      <p class="p-t-b-5 margin_0">设计时速(km/h)： ${obj.designSpeed?obj.designSpeed:''}</p>
      <p class="p-t-b-5 margin_0">里程(km)： ${obj.mileage?obj.mileage:''}</p>
    </div>
  `
  return infoHTML
}
/**
 * TSP监测点悬浮信息
 * @param {*} obj
 */
export function tspPointInfo(obj){
  let infoHTML = `
      <div class="info-window">
        <p class="hide_text p-t-b-5 border-b margin_0">${obj.projectName?obj.projectName:''}</p>
        <p class="hide_text p-t-b-5 margin_0">施工单位：${obj.workCompany?obj.workCompany:''}</p>
        <div style="display: flex;justify-content: space-between;" class="p-t-b-10">
          <p style="width:50%;" class="margin_0">项目经理：${obj.projectManager?obj.projectManager:''}</p>
          <p style="width:50%;" class="margin_0">联系电话：${obj.projectNumber?obj.projectNumber:''}</p>
        </div>
        <p class="hide_text p-t-b-5 margin_0">详细地址：${obj.address?obj.address:''}</p>
        <p class="hide_text p-t-b-5 border-b margin_0">监管部门：${obj.regCompany?obj.regCompany:''}</p>
        <div style="padding:0 5px;">
          <div style="display: flex;justify-content: space-between; padding:5px 0;text-align:center" class="border-b">
            <p style="width:25%" class="margin_0">工地设备名称</p>
            <p style="width:25%" class="margin_0">TSP</p>
            <p style="width:25%" class="margin_0">PM10</p>
            <p style="width:25%" class="margin_0">PM2.5</p>
          </div>
          <div id="scrollBox" style="max-height:155px;overflow:auto" class="scrollBox">
        `
        if(obj.equipDetailList.length>0){
          obj.equipDetailList.map(item=>{
            infoHTML+=`
                <div style="display: flex;justify-content: space-between; padding:5px 0;text-align:center;">
                  <p style="width:25%" class="hide_text margin_0">${item.equipName?item.equipName:""}</p>
                  <p style="width:25%" class="hide_text margin_0">${item.tsp?item.tsp:""}</p>
                  <p style="width:25%" class="hide_text margin_0">${item.pm10?item.pm10:""}</p>
                  <p style="width:25%" class="hide_text margin_0">${item.pm25?item.pm25:""}</p>
                </div>
            `
          })
        }else{
          infoHTML+=`
                <div style="display: flex;justify-content: space-between; padding:5px 0;text-align:center;">
                  暂无数据
                </div>
            `
        }
      infoHTML+=`
          </div>
        </div>
      </div>
      `
      return infoHTML
}
/**
 * 道路点击弹出信息框
 * @param {Object} obj 合同段坐标数组
 * @param {array} contractList 项目合同段列表
 * @param {array} contractInfo 合同段信息
 */
export function roadClickInfo(obj,contractList,contractInfo){
  let newContractList = [];
  contractList.map(item=>{
    if(item.projectId == obj.projectId){
      newContractList.push(item)
    }
  })
  let HTML = `
  <p class="margin_0" style="padding:5px 10px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" title=${obj.projectName} ><span>项目名称：</span><span>${obj.projectName}</span></p>
  <div class="flex_box">
    <p class="margin_0"><span>总投资额(万元)：</span><span>${obj.totalInvestment}</span></p>
    <p class="margin_0"><span>计划工期(月)：</span><span>${obj.scheduleTime}</span></p>
  </div>
  <div class="flex_box">
    <p class="margin_0"><span>车道数：</span><span>${obj.laneNum}</span></p>
    <p class="margin_0"><span>里程(KM)：</span><span>${obj.mileage}</span></p>
  </div>
  <div class="flex_box">
    <p class="margin_0"><span>设计时速(km/h)：</span><span>${obj.designSpeed}</span></p>
    <p class="margin_0"></p>
  </div>
  <div class="flex_box" style="background:#000">
    <p class="margin_0">合同段信息</p>
    <p class="margin_0">
      <select id="contractSelect"  class="select_class">
  `

  for(let i = 0; i<newContractList.length; i++){
    HTML+=`<option value=${newContractList[i].idx}>${newContractList[i].contractName}</option>`
  }
  HTML+=`
      </select>
    </p>
  </div>
  <div id="contractInfo">
    <div class="flex_box">
      <p class="margin_0"><span>合同额(万元)：</span><span>${contractInfo[0].contractAmount}</span></p>
      <p class="margin_0"><span>车道数：</span><span>${contractInfo[0].laneNum}</span></p>
    </div>
    <div class="flex_box">
      <p class="margin_0"><span>计划开工时间：</span><span>${contractInfo[0].startTime}</span></p>
      <p class="margin_0"><span>计划竣工时间：</span><span>${contractInfo[0].endTime}</span></p>
    </div>
    <div class="flex_box">
      <p class="margin_0"><span>设计时速(km/h)：</span><span>${contractInfo[0].designSpeed}</span></p>
      <p class="margin_0"><span>里程(km)：</span><span>${contractInfo[0].mileage}</span></p>
    </div>
  </div>
  `

  document.getElementById("infoContant").innerHTML=HTML;
  document.getElementById('contractSelect').addEventListener('change',function(){//下拉框选择改变事件
    let val = this.value
    let infoVal = contractInfo[val];
    let contractHtml = `
    <div class="flex_box">
      <p class="margin_0"><span>合同额(万元)：</span><span>${infoVal.contractAmount}</span></p>
      <p class="margin_0"><span>车道数：</span><span>${infoVal.laneNum}</span></p>
    </div>
    <div class="flex_box">
      <p class="margin_0"><span>计划开工时间：</span><span>${infoVal.startTime}</span></p>
      <p class="margin_0"><span>计划竣工时间：</span><span>${infoVal.endTime}</span></p>
    </div>
    <div class="flex_box">
      <p class="margin_0"><span>设计时速(km/h)：</span><span>${infoVal.designSpeed}</span></p>
      <p class="margin_0"><span>里程(km)：</span><span>${infoVal.mileage}</span></p>
    </div>
    `
    document.getElementById("contractInfo").innerHTML=contractHtml;
  },false);
}

/**
 * 提取摄像头、BIM、道路图标绘制点
 * @param {*} arr
 * @param {*} infoPoints
 * @param {*} projectId 项目ID
 * @param {*} projectName 项目名称
 * @param {*} totalInvestment 总投资额
 * @param {*} scheduleTime 计划工期
 * @param {*} isBim 是否包含BIM模型
 */
export function getInterestingPoints(arr,infoPoints,projectId,projectName,totalInvestment,scheduleTime,isBim,){
  let monitorPoint = [];
  for(let j=0;j<arr.length;j++){
    if(arr[j].contractCoord.length>0){
      let contractCoord =arr[j].contractCoord
      let x1 = contractCoord[contractCoord.length - 1].x;
      let y1 = contractCoord[contractCoord.length - 1].y;
      monitorPoint.push(
        {
          "point":{"x":x1*1,"y":y1*1},
          "isVideo" : arr[j].video == 1 ? true : false
        }
      )
    }
  }
  for(let j=0;j<arr.length;j++){
    if(arr[j].contractCoord.length>0){
      let contractCoord =arr[j].contractCoord
      let x = contractCoord[0].x;
      let y = contractCoord[0].y;
      infoPoints.push(
        {
          "bimPoint":{"x":x*1,"y":y*1},
          "monitorPoint":monitorPoint,
          "projectId":projectId,
          "projectName":projectName,
          "totalInvestment":totalInvestment,
          "scheduleTime":scheduleTime,
          "isBim":isBim
        }
      )
      break
    }
  }
}
