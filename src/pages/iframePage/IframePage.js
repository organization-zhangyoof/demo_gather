import React, { Component } from 'react';
import { Button } from 'antd';
import styles from '../index.less';
import { router } from 'umi';

class IframePage extends Component {
    constructor(props){
        super(props)
        this.state={
            isVisibleBim:false,
            showOrHideModel:true,
            showOrHideComponent:false
        }
    }
    //模拟工具栏打开实景窗口
    showBimWindow(){
        this.setState({
            isVisibleBim:!this.state.isVisibleBim
        })
    }

    //业务与模型互动时,打开窗口的方式
    setBimWidth(){
        let box=document.getElementById('bimBox');
        box.style.display='block';
    }

    //打开模型
    openModel(){
        // this.setBimWidth();
        for (let index = 0; index < window.frames.length; index++) {
            let iframeInfo = {
                isHandleBim: true,
                isSelfModel: true,
                type: 'openModel',
                data: {
                    auxiliaryCalculate: undefined,
                    bimWidth: null,
                    calculatePeriodId: "4c84bb8b2dc64a36b81ce0b3c66036fb",
                    contractId: "e1f70480e6074cb2926e25216f75cb1a",
                    critical: null,
                    openBimWidth: null,
                    openEntity: null,
                    projectId: "4513f7ec42f34a3eb41a40dafe8a35c8",
                    realend: null,
                    recordId: null,
                    taskStatus: null,
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //视角定位到某构件
    setViewToObj(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'setViewToObj',
                data:{
                    projectId: '00469fda708f411aafcb7368b3c27cc1',
                    contractId: 'e1c66b9585984be3b0ce8a92ebda138c',
                    bimWidth:null,
                    id:'',
                    layerName:'33c4d3f0172a4e2a826b6adc58f07a2c',
                    wbsId:'',
                    relativeObjs:["16502", "24831"],
                    isHighLight:true
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //为构件着色
    setObjsColor(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'setObjsColor',
                data:{
                    layerName:'33c4d3f0172a4e2a826b6adc58f07a2c',
                    ids:["16502", "24831"],
                    color:'#8918c7'
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //移除模型的着色
    removeModelColor(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'removeModelColor',
                data:{
                    projectId: '00469fda708f411aafcb7368b3c27cc1',
                    contractId: 'e1c66b9585984be3b0ce8a92ebda138c',
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //隐藏/显示模型
    showOrHideModel(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'showOrHideModel',
                data:{
                    projectId: '00469fda708f411aafcb7368b3c27cc1',
                    contractId: 'e1c66b9585984be3b0ce8a92ebda138c',
                    bool:!this.state.showOrHideModel
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
        this.setState({
            showOrHideModel:!this.state.showOrHideModel
        })
    }

    //移除模型高亮(被选中的状态)
    removeModelHighLight(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'removeModelHighLight',
                data:{
                    projectId: '00469fda708f411aafcb7368b3c27cc1',
                    contractId: 'e1c66b9585984be3b0ce8a92ebda138c',
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //打开进度开关
    openProgressSwitch(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'openProgressSwitch',
                data:{}
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //显示/隐藏构件
    showComponentByNameAndIds(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'showComponentByNameAndIds',
                data:{
                    layerName:'33c4d3f0172a4e2a826b6adc58f07a2c',
                    ids:["16502", "24831"],
                    bool:this.state.showOrHideComponent
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
        this.setState({
            showOrHideComponent:!this.state.showOrHideComponent
        })
    }

    //预览模型(参考 模型管理里bim模型发布里的定位功能  就是调用这个 打开的效果就是按钮的效果)
    openModelPreview(){
        this.setBimWidth()
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'openModelPreview',
                data:{
                    scene:{
                        "id":"33c4d3f0172a4e2a826b6adc58f07a2c",
                        "tenantId":"39ca61dfcfac43dca8d5cdb0f1cfddf1",
                        "ownerId":"39ca61dfcfac43dca8d5cdb0f1cfddf1",
                        "appId":"fff65187cc5d4d539eb12dd8cda4b511",
                        "projectId":"00469fda708f411aafcb7368b3c27cc1",
                        "contractId":"e1c66b9585984be3b0ce8a92ebda138c",
                        "modelInfoId":null,
                        "name":"tw公路项目-2021自研合同段-V3.3",
                        "description":null,
                        "gmtCreate":"2021-03-17 16:44:53",
                        "gmtModified":"2021-03-17 16:44:53",
                        "status":1,
                        "realFilename":null,
                        "dataUrl":null,
                        "cameraProp":"{}",
                        "appSetUp":"{'calculateFlag':false}",
                        "fileProps":"{'componentFileProps':{'name':'构件信息表.xlsx','size':51396,'type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','uid':'552a6504-b71e-4947-9583-1f3aa16b9e6c','uploaderId':'e95cf67d5d3c4c20ad81d70c09f54ae0','uploaderName':'公路测试业主','status':'done'},'wbsFileProps':{'name':'实体单元划分导入模板.xlsx','size':9474,'type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','uid':'8aa178f5-d96f-4049-b993-1374d63f1c6d','uploaderId':'e95cf67d5d3c4c20ad81d70c09f54ae0','uploaderName':'公路测试业主','status':'done'}}",
                        "modelType":null,
                        "qxsyUrl":null,
                        "qxsyDataUrl":null,
                        "dixingUrl":null,
                        "dixingDataUrl":null,
                        "cadUrl":null,
                        "cadDataUrl":null,
                        "floatIcon":null,
                        "onceStart":1,
                        "version":"V3.3",
                        "type":"3",
                        "uploadUserId":"e95cf67d5d3c4c20ad81d70c09f54ae0",
                        "uploadCompanyId":"39ca61dfcfac43dca8d5cdb0f1cfddf1",
                        "uploadUserName":"公路测试业主",
                        "uploadCompanyName":"IT三部业主单位",
                        "projectName":"tw公路项目",
                        "contractName":"2021自研合同段",
                        "longitude":0.0,
                        "latitude":0.0,
                        "height":0.0,
                        "heading":0.0,
                        "pitch":0.0,
                        "roll":null,
                        "lodRangeScale":"5",
                        "linkBoxList":null,
                        "location":"2",
                        "release":null,
                        "createType":"1",
                        "modelLink":null,
                        "urlList":[
                        {
                        "id":"b9718703299c45228f4cbc1bdf68060f",
                        "ownerId":"39ca61dfcfac43dca8d5cdb0f1cfddf1",
                        "tenantId":"39ca61dfcfac43dca8d5cdb0f1cfddf1",
                        "appId":"fff65187cc5d4d539eb12dd8cda4b511",
                        "projectId":"00469fda708f411aafcb7368b3c27cc1",
                        "contractId":"e1c66b9585984be3b0ce8a92ebda138c",
                        "gmtCreate":"2021-03-17 16:44:53",
                        "gmtModified":"2021-03-17 16:44:53",
                        "pid":"33c4d3f0172a4e2a826b6adc58f07a2c",
                        "name":"测试模型3.0",
                        "service3D":null,
                        "serviceData":null,
                        "cameraProp":"{\"angleOfPitch\":\"1\",\"heading\":\"\",\"height\":\"\",\"latitude\":\"1\",\"longitude\":\"1\",\"pitch\":\"\",\"roll\":\"1\",\"viewHeight\":\"1\",\"yawAngle\":\"1\"}",
                        "longitude":"",
                        "latitude":"",
                        "height":"",
                        "pitch":"",
                        "heading":"",
                        "viewHeight":"",
                        "angleOfPitch":"",
                        "yawAngle":"",
                        "roll":"",
                        "link":"c4da41790e2a1",
                        "modelLink":"http://dd-test.gcnao.cn/bim-api/assets/1615455485874/tileset.json"
                        }
                        ]
                        }
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //关闭模型预览
    closeModelPreview(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'closeModelPreview',
                data:{}
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //勾选实体树(多选模式下)
    checkEntityTree(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'checkEntityTree',
                data:{
                    wbsIds:['600e6c55-bfa9-4d3c-97e7-6201ca4d467b'],
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //高亮实体树的某一条(设为被选中状态)
    highlightEntityTree(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'highlightEntityTree',
                data:{
                    wbsIds:['600e6c55-bfa9-4d3c-97e7-6201ca4d467b'],
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    postRelateTypeToBim(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'postRelateTypeToBim',
                data:{
                    type:'Layer',
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }
    postRelateValToBim(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                isSelfModel:true,
                type:'postRelateValToBim',
                data:{
                    val:['2004-桥梁-E2-copy-16503'],
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    //向模型窗口发送信息
    postIntoBim(){
        let iframeInfo={
            token:"eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiI3NDk3MzVmMWVlNTk0ODYyYmI2YjI4YzIwZDljZmY4OSIsImVtYWlsIjoiMTM3NTE0MzAwMDFAcXEuY29tIiwibmFtZSI6IuWFrOi3r-a1i-ivleS4muS4uyIsInVzZXJuYW1lIjoiMTM3NTE0MzAwMDFhIiwicGhvbmVOdW1iZXIiOiIxMzc1MTQzMDAwMSIsImFjY291bnRUeXBlIjoiUEVSU09OQUwiLCJ1c2VySWQiOiJlOTVjZjY3ZDVkM2M0YzIwYWQ4MWQ3MGMwOWY1NGFlMCIsImNvbXBhbnlJZCI6IjM5Y2E2MWRmY2ZhYzQzZGNhOGQ1Y2RiMGYxY2ZkZGYxIiwiY29tcGFueU5hbWUiOiJJVOS4iemDqOS4muS4u-WNleS9jSIsImp0aS11dWlkIjoianRpLTQwZmEyYjU4LWFkZTgtNDMzMS05ZTgwLTUzYjAxNDI0M2IxYyIsImV4cCI6MTYxODQ5MDIxOH0.VafwAclE58ZYEA0UqMgvmlxYcXc9dFH4ExdtaWmPRQQ",
            userInfo:{"accountId":"749735f1ee594862bb6b28c20d9cff89","email":"13751430001@qq.com","name":"公路测试业主","username":"13751430001a","phoneNumber":"13751430001","accountType":"PERSONAL","userId":"e95cf67d5d3c4c20ad81d70c09f54ae0","companyId":"39ca61dfcfac43dca8d5cdb0f1cfddf1","companyName":"IT三部业主单位","jti-uuid":"jti-736328a2-096d-4ce9-b674-76e50f9157f5","exp":1614623192},
            limitBtns:[],
            projectId:null,
            isVisibleBim:true,
            userIndentity:'owner',
            parentHost:'http://bimcloud.gcnao.cn:9001',
            appId:'fff65187cc5d4d539eb12dd8cda4b511',
            bimType:'gisViewer',
            isBim:true
        };
        for(let index=0;index<window.frames.length;index++){
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }


    render(){
        let {isVisibleBim}=this.state
        return (
            <div style={{ width: '100%', height: '100%', background: '#f1f1f1' }} className={styles.page1_main}>
                <div style={{ width: '20%', height: '100%', background: 'pink' }}>
                    <div style={{ width: '100%', border: '1px solid red' }}>
                        <p>模拟左侧工具栏里的自研实景入口</p>
                        <Button onClick={this.showBimWindow.bind(this)}>实景</Button>
                    </div>
                    <div style={{ width: '100%', border: '1px solid blue' }}>
                        <p>模拟业务与实景iframe交互,外侧调用iframe中bim的方法操作模型</p>
                        <Button onClick={this.setBimWidth.bind(this)}>setBimWidth</Button>
                        <Button onClick={this.openModel.bind(this)}>openModel</Button>
                        <Button onClick={this.openModelPreview.bind(this)}>openModelPreview</Button>
                        <Button onClick={this.closeModelPreview.bind(this)}>closeModelPreview</Button>
                        <Button onClick={this.checkEntityTree.bind(this)}>checkEntityTree</Button>
                        <Button onClick={this.highlightEntityTree.bind(this)}>highlightEntityTree</Button>
                        <Button onClick={this.setViewToObj.bind(this)}>setViewToObj</Button>
                        <Button onClick={this.setObjsColor.bind(this)}>setObjsColor</Button>
                        <Button onClick={this.removeModelColor.bind(this)}>removeModelColor</Button>
                        <Button onClick={this.showOrHideModel.bind(this)}>showOrHideModel</Button>
                        <Button onClick={this.removeModelHighLight.bind(this)}>removeModelHighLight</Button>
                        <Button onClick={this.openProgressSwitch.bind(this)}>openProgressSwitch</Button>
                        <Button onClick={this.showComponentByNameAndIds.bind(this)}>showComponentByNameAndIds</Button>
                        <Button onClick={this.postRelateTypeToBim.bind(this)}>postRelateTypeToBim</Button>
                        <Button onClick={this.postRelateValToBim.bind(this)}>postRelateValToBim</Button>
                    </div>

                </div>
                <div style={{ width: '80%', height: '100%', display: isVisibleBim ? 'block' : 'none' }} id='bimBox'>
                    <iframe
                        src='http://localhost:9988/bim'
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        onLoad={this.postIntoBim.bind(this)}
                    ></iframe>
                </div>

            </div>
        )
    }
}

export default IframePage;
