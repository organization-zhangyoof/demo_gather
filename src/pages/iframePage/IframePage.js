import React, { Component } from 'react';
import { Button } from 'antd';
import styles from '../index.less';
import { router } from 'umi';

class IframePage extends Component {
    constructor(props){
        super(props)
        this.state={
            isVisibleBim:false
        }
    }
    showBimWindow(){
        this.setState({
            isVisibleBim:!this.state.isVisibleBim
        })
    }
    setBimWidth(){
        let box=document.getElementById('bimBox');
        box.style.display='block';
    }

    openModel(){
        this.setBimWidth();
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'openModel',
                data:{
                    projectId: '00469fda708f411aafcb7368b3c27cc1',
                    contractId: 'e1c66b9585984be3b0ce8a92ebda138c',
                    bimWidth:null,
                    openBimWidth:null,
                    openEntity:null,
                    realEnd:'',
                    recordId:null,
                    taskStatus:null,
                    critical:null,
                    calculatePeriodId:null,
                    anxiliaryCalculate:null
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    setViewToObj(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'setViewToObj',
                data:{
                    projectId: '00469fda708f411aafcb7368b3c27cc1',
                    contractId: 'e1c66b9585984be3b0ce8a92ebda138c',
                    bimWidth:null,
                    id:'',
                    layerName:'1ed699701e864e3e9c0b2da1b027f689',
                    wbsId:'',
                    relativeObjs:["16502", "24831"],
                    isHighLight:true
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }
    setObjsColor(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'setObjsColor',
                data:{
                    layerName:'1ed699701e864e3e9c0b2da1b027f689',
                    ids:["16502", "24831"],
                    color:'#8918c7'
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }
    removeModelColor(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'removeModelColor',
                data:{
                    projectId: '00469fda708f411aafcb7368b3c27cc1',
                    contractId: 'e1c66b9585984be3b0ce8a92ebda138c',
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }
    showOrHideModel(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'showOrHideModel',
                data:{
                    projectId: '00469fda708f411aafcb7368b3c27cc1',
                    contractId: 'e1c66b9585984be3b0ce8a92ebda138c',
                    bool:false
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }
    removeModelHighLight(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'removeModelHighLight',
                data:{
                    projectId: '00469fda708f411aafcb7368b3c27cc1',
                    contractId: 'e1c66b9585984be3b0ce8a92ebda138c',
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }
    openProgressSwitch(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'openProgressSwitch',
                data:{}
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    showComponentByNameAndIds(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'showComponentByNameAndIds',
                data:{
                    layerName:'1ed699701e864e3e9c0b2da1b027f689',
                    ids:["16502", "24831"],
                    bool:false
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    openModelPreview(){
        this.setBimWidth()
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'openModelPreview',
                data:{
                    scene:{
                        "id":"1ed699701e864e3e9c0b2da1b027f689",
                        "tenantId":"39ca61dfcfac43dca8d5cdb0f1cfddf1",
                        "ownerId":"39ca61dfcfac43dca8d5cdb0f1cfddf1",
                        "appId":"fff65187cc5d4d539eb12dd8cda4b511",
                        "projectId":"00469fda708f411aafcb7368b3c27cc1",
                        "contractId":"e1c66b9585984be3b0ce8a92ebda138c",
                        "modelInfoId":null,
                        "name":"tw公路项目-2021自研合同段-V3.2",
                        "description":null,
                        "gmtCreate":"2021-02-07 18:01:23",
                        "gmtModified":"2021-02-24 10:58:53",
                        "status":1,
                        "realFilename":null,
                        "dataUrl":null,
                        "cameraProp":"{}",
                        "appSetUp":"{'calculateFlag':false}",
                        "fileProps":"{'componentFileProps':{'name':'构件信息表.xlsx','size':51396,'type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','uid':'f8fc52ea-b396-4cf6-8334-868924a9f1d1','uploaderId':'e95cf67d5d3c4c20ad81d70c09f54ae0','uploaderName':'公路测试业主','status':'done'}}",
                        "modelType":null,
                        "qxsyUrl":null,
                        "qxsyDataUrl":null,
                        "dixingUrl":null,
                        "dixingDataUrl":null,
                        "cadUrl":null,
                        "cadDataUrl":null,
                        "floatIcon":null,
                        "onceStart":1,
                        "version":"V3.2",
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
                        "id":"b3571bbf0b15443993fe9220e72c239c",
                        "ownerId":null,
                        "tenantId":null,
                        "appId":null,
                        "projectId":"00469fda708f411aafcb7368b3c27cc1",
                        "contractId":"e1c66b9585984be3b0ce8a92ebda138c",
                        "gmtCreate":"2021-02-24 10:58:53",
                        "gmtModified":"2021-02-24 10:58:53",
                        "pid":"1ed699701e864e3e9c0b2da1b027f689",
                        "name":"33333333",
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
                        "link":"0785b6ae4596f",
                        "modelLink":"http://dd-test.gcnao.cn/bim-api/assets/1612262548730/tileset.json"
                        }
                        ]
                        }
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    closeModelPreview(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'closeModelPreview',
                data:{}
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }
    checkEntityTree(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'checkEntityTree',
                data:{
                    wbsIds:'',
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }
    highlightEntityTree(){
        for(let index=0;index<window.frames.length;index++){
            let iframeInfo = {
                isHandleBim:true,
                type:'highlightEntityTree',
                data:{
                    wbsIds:'',
                }
            }
            window.frames[index]&&window.frames[index].postMessage(iframeInfo,'*')
        }
    }

    postIntoBim(){
        let iframeInfo={
            token:'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiI3NDk3MzVmMWVlNTk0ODYyYmI2YjI4YzIwZDljZmY4OSIsImVtYWlsIjoiMTM3NTE0MzAwMDFAcXEuY29tIiwibmFtZSI6IuWFrOi3r-a1i-ivleS4muS4uyIsInVzZXJuYW1lIjoiMTM3NTE0MzAwMDFhIiwicGhvbmVOdW1iZXIiOiIxMzc1MTQzMDAwMSIsImFjY291bnRUeXBlIjoiUEVSU09OQUwiLCJ1c2VySWQiOiJlOTVjZjY3ZDVkM2M0YzIwYWQ4MWQ3MGMwOWY1NGFlMCIsImNvbXBhbnlJZCI6IjM5Y2E2MWRmY2ZhYzQzZGNhOGQ1Y2RiMGYxY2ZkZGYxIiwiY29tcGFueU5hbWUiOiJJVOS4iemDqOS4muS4u-WNleS9jSIsImp0aS11dWlkIjoianRpLWEwMzU4NzdhLTFmZTAtNDA3NS1iNTI0LTkwZTUxYjAwODlkOSIsImV4cCI6MTYxNDg1NzQ4Mn0.3PCb-WOndJCll7At2WJyP-jmSW4TDExvLOZz1-EGtuc',
            userInfo:{"accountId":"749735f1ee594862bb6b28c20d9cff89","email":"13751430001@qq.com","name":"公路测试业主","username":"13751430001a","phoneNumber":"13751430001","accountType":"PERSONAL","userId":"e95cf67d5d3c4c20ad81d70c09f54ae0","companyId":"39ca61dfcfac43dca8d5cdb0f1cfddf1","companyName":"IT三部业主单位","jti-uuid":"jti-736328a2-096d-4ce9-b674-76e50f9157f5","exp":1614623192},
            limitBtns:[
                {
                    "route": "noncontration-adjust-detail-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整详情-删除",
                    "id": "008cd0c595204c62ba2fa5a49c95494d",
                    "category": null,
                    "url": "noncontration-adjust-detail-del"
                },
                {
                    "route": "coordinate-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "逐桩坐标-编辑",
                    "id": "00911d0cd8ef4a89930193d4ed590506",
                    "category": null,
                    "url": "coordinate-edit"
                },
                {
                    "route": "sample-leftAddEdit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品库-左侧新增编辑",
                    "id": "012dffd48d6c49e2a71bffc4e21c242d",
                    "category": null,
                    "url": "/experiment/sampleDepot"
                },
                {
                    "route": "calqty-calcTermSet-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量期设置-编辑",
                    "id": "01b231d4737e4671b553d43ca84220c3",
                    "category": null,
                    "url": "calqty-calcTermSet-edit"
                },
                {
                    "route": "paperReceive-handle",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "收文管理-处理",
                    "id": "01b4bd82e8db4c2393e3a1fde4a730de",
                    "category": null,
                    "url": "paperReceive-handle"
                },
                {
                    "route": "element-downloadTemplate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件模板下载",
                    "id": "023b5de72c2a4dc8a8dfffa1e0058572",
                    "category": null,
                    "url": "element-downloadTemplate"
                },
                {
                    "route": "resumeWorkApply-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工申请-提交",
                    "id": "032768a3e87546378911c1ee89cb7977",
                    "category": null,
                    "url": "resumeWorkApply-submit"
                },
                {
                    "route": "startup-firstitem-check-apply-template",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件验收-验收考核表模板",
                    "id": "0352529f6cdc4fb68ad012a4b07be123",
                    "category": null,
                    "url": "startup-firstitem-check-apply-template"
                },
                {
                    "route": "experiment-ensure-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-质量保证体系-编辑",
                    "id": "03de315b93bb46f090297a0b6425e798",
                    "category": null,
                    "url": "experiment-ensure-edit"
                },
                {
                    "route": "jlCheckUpdate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查监理-编辑",
                    "id": "0412cf83978f49aeb8af2ec2cfe42bd1",
                    "category": null,
                    "url": "jlCheckUpdate"
                },
                {
                    "route": "qp-annex-GXYS",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-影像资料与其它附件按钮",
                    "id": "0586c9769348497181c0018a551434d6",
                    "category": null,
                    "url": "qp-annex-GXYS"
                },
                {
                    "route": "specialConfig",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查配置",
                    "id": "05c54b5b62af4df0872943cf6e04736f",
                    "category": null,
                    "url": "/envprotection/specialConfig"
                },
                {
                    "route": "qp-obsolete-GXYS-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-施工自检-驳回",
                    "id": "06b442e0442c49cda4bf67535685a911",
                    "category": null,
                    "url": "qp-obsolete-GXYS-SG"
                },
                {
                    "route": "menu-calqty-control-revise-error-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账错误数量调整-新增清单",
                    "id": "06b805846a7c4438aee0903df426af73",
                    "category": null,
                    "url": "menu-calqty-control-revise-error-add"
                },
                {
                    "route": "sub-sample-ledger-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "试件台账-编辑",
                    "id": "06ca50db0ee04580accd8c03da6ab1d6",
                    "category": null,
                    "url": "sub-sample-ledger-edit"
                },
                {
                    "route": "experiment-workConnectLedger-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工作联系单台账-编辑",
                    "id": "072f7c6815664a0ea0fbcffa17f34368",
                    "category": null,
                    "url": "experiment-workConnectLedger-edit"
                },
                {
                    "route": "document-menu-law-project-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-项目库文件上传",
                    "id": "07d5272f39a944c4964f9987bee87f49",
                    "category": null,
                    "url": "document-menu-law-project-add"
                },
                {
                    "route": "calqty-project-totalBill",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "总额清单计量-编辑",
                    "id": "08051b7b5ec94da5acbb866d611209e6",
                    "category": null,
                    "url": "calqty-project-totalBill"
                },
                {
                    "route": "video-decrypt",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "摄像头管理-设备解密",
                    "id": "088e24baf920400bafad5c63709fd3ef",
                    "category": null,
                    "url": "video-decrypt"
                },
                {
                    "route": "menu-calc-ledger-divide-copy",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-复制",
                    "id": "088f10bc1f4a492297cddc495617ce91",
                    "category": null,
                    "url": "menu-calc-ledger-divide-copy"
                },
                {
                    "route": "middleCalculateGather",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "中间计量汇总",
                    "id": "08b6c391fc794d36a448ad189736c204",
                    "category": null,
                    "url": "middleCalculateGather"
                },
                {
                    "route": "/attendance/setting/signResult",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "检查公示",
                    "id": "08f6daedcb0f456da670df1f01a7b4b3",
                    "category": null,
                    "url": "/attendance/setting/signResult"
                },
                {
                    "route": "dailyLog-master-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-业主日志-提交",
                    "id": "096f06ba68f549a0a89aa72b4c17b2db",
                    "category": null,
                    "url": "dailyLog-master-submit"
                },
                {
                    "route": "contractManage-ledger-view",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同台账-报表预览",
                    "id": "09d3e65f0a994c6cb022ce3553988622",
                    "category": null,
                    "url": "contractManage-ledger-view"
                },
                {
                    "route": "startup-subitem-standbook",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项开工统计-表单联查",
                    "id": "0a3a4165f2334505b31d8e0ea899d71a",
                    "category": null,
                    "url": "startup-subitem-standbook"
                },
                {
                    "route": "sample-rightDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品库-右侧删除",
                    "id": "0a6d5dc9a5b9464f8987e45bccee7931",
                    "category": null,
                    "url": "/experiment/sampleDepot"
                },
                {
                    "route": "quality-register-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量责任登记-导出",
                    "id": "0ae3c852459b4a418159b06bd21c9682",
                    "category": null,
                    "url": "quality-register-export"
                },
                {
                    "route": "experiment-selfCheck-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "自检-新增编辑删除",
                    "id": "0b20513f579a45cc89ddfed8d09593d3",
                    "category": null,
                    "url": "experiment-selfCheck-add"
                },
                {
                    "route": "glManpower-ready-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤基准照片-删除",
                    "id": "0b3eb57fa2b94dd897e1304f48704c5e",
                    "category": null,
                    "url": "glManpower-ready-delete"
                },
                {
                    "route": "paperReceive-finish",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "收文管理-办结",
                    "id": "0c2fa235645243ed8fbcf6a5c7bffb6d",
                    "category": null,
                    "url": "paperReceive-finish"
                },
                {
                    "route": "menu-calc-ledger-divide-unlock",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-解锁",
                    "id": "0c3d5a39411d4389becfac2d7b0f7788",
                    "category": null,
                    "url": "menu-calc-ledger-divide-unlock"
                },
                {
                    "route": "startup-contract-notice-sign",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工通知-签收",
                    "id": "0c4e0d54e63c4609870252005b2cf947",
                    "category": null,
                    "url": "startup-contract-notice-sign"
                },
                {
                    "route": "qp-st-revoke-ZLPD-0",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工自检-质量评定-恢复预置",
                    "id": "0c6bfeea271f483393a66c2ce00c07cf",
                    "category": null,
                    "url": "qp-st-revoke-ZLPD-0"
                },
                {
                    "route": "menu-safe-risk-source-dynamic-appraise",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "动态评估",
                    "id": "0cb511d240eb422fa96f696bb8a92f31",
                    "category": null,
                    "url": "menu-safe-risk-source-dynamic-appraise"
                },
                {
                    "route": "resume-order-urge",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令-催办",
                    "id": "0d2452cd454446b299e0a906cc02b25a",
                    "category": null,
                    "url": "resume-order-urge"
                },
                {
                    "route": "subItem-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项库-删除",
                    "id": "0d3e9a1b50fb40bdba14ac5289e20491",
                    "category": null,
                    "url": "subItem-del"
                },
                {
                    "route": "glManpower-leave-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "请/销假申请-请假",
                    "id": "0d799b376dbe44b6b93c40e7b3c3b83e",
                    "category": null,
                    "url": "glManpower-leave-add"
                },
                {
                    "route": "Site_Inspection",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工地检查",
                    "id": "0d8cfd32f9164af7aa2878f5cd8cdd0b",
                    "category": null,
                    "url": "/Site_Inspection"
                },
                {
                    "route": "sgPapresCheck",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件施工-审核",
                    "id": "0de6e1cf46cc440da61ae81509ec9519",
                    "category": null,
                    "url": "sgPapresCheck"
                },
                {
                    "route": "projectToEntity-updateScheme",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目实体库-引入项目平台方案",
                    "id": "0e270642fb9145f291cfec92f47ce81e",
                    "category": null,
                    "url": "projectToEntity-updateScheme"
                },
                {
                    "route": "startup-prepare-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理准备-提交",
                    "id": "0e2af12495fc4532a826d55cb891c2f5",
                    "category": null,
                    "url": "startup-prepare-submit"
                },
                {
                    "route": "monthReport-construction-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工月报-新增",
                    "id": "0e30685bb52d4305a7e7658043d868da",
                    "category": null,
                    "url": "monthReport-construction-add"
                },
                {
                    "route": "apparatusRepair-add/edit/del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "设备管理-维修记录增删行",
                    "id": "0e3ae1a5e8a64dad942fe973b0955365",
                    "category": null,
                    "url": "apparatusRepair-add/edit/del"
                },
                {
                    "route": "document-menu-tree-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-通用库树新增",
                    "id": "0e47d5727fda4678bab251f3d7345d24",
                    "category": null,
                    "url": "document-menu-tree-add"
                },
                {
                    "route": "menu-sub-option-calculate-detail-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项完工计量清单-新增清单",
                    "id": "0e4bbaf9e67e422c911aa0aa1ca70d6e",
                    "category": null,
                    "url": "menu-sub-option-calculate-detail-add"
                },
                {
                    "route": "stopWorkOrder-urging",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令-催办",
                    "id": "0ead6c0944dc4646b163320f45300286",
                    "category": null,
                    "url": "stopWorkOrder-urging"
                },
                {
                    "route": "sgCheckCreate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查-施工-新增",
                    "id": "0eae8f061dc5401580423d567cc9908b",
                    "category": null,
                    "url": "sgCheckCreate"
                },
                {
                    "route": "materialLedger_addEdit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "材料台账-新增编辑",
                    "id": "0ebdf5dbe02d46e797c699fd0f672f13",
                    "category": null,
                    "url": "/experiment/materialLedger"
                },
                {
                    "route": "btn-claimDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "延期索赔管理-删除",
                    "id": "0eec1add9bf64bdabd8b9e16c696f96b",
                    "category": null,
                    "url": "/btn-claimDelete"
                },
                {
                    "route": "calqtycontrol",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "控制计量",
                    "id": "0f090277566c4146bb780cddfb9060f8",
                    "category": null,
                    "url": "calqtycontrol"
                },
                {
                    "route": "menu-calqty-control-revise-list-error-revise",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账错误数量调整列表-数据调整",
                    "id": "0f354416f6f64007ad314cb861f4aeaa",
                    "category": null,
                    "url": "menu-calqty-control-revise-list-error-revise"
                },
                {
                    "route": "menu-calc-ledger-divide-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-提交",
                    "id": "0f4f9d4978ab4f09b5822bd969cd814e",
                    "category": null,
                    "url": "menu-calc-ledger-divide-submit"
                },
                {
                    "route": "day-work-addOrEdit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计日工台账-新增编辑",
                    "id": "0fba581eb41149218af34a7f40835fb9",
                    "category": null,
                    "url": "day-work-addOrEdit"
                },
                {
                    "route": "bim-videoMonitor",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实景-功能-视频监控",
                    "id": "10175a8f1ab34b128858bb5b8266ead8",
                    "category": null,
                    "url": "bim-videoMonitor"
                },
                {
                    "route": "calqty-payment-fsg-term-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "非施工支付—删除",
                    "id": "101833468d814a3e92f65f2f678d915b",
                    "category": null,
                    "url": "calqty-payment-fsg-term-delete"
                },
                {
                    "route": "AdjustSummary",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单汇总",
                    "id": "10483f1c07664fdf9816b1abcfe3063d",
                    "category": null,
                    "url": "/projectPayment/noncontration/AdjustSummary"
                },
                {
                    "route": "calqty-payment-fsg-term-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "非施工支付—新增编辑",
                    "id": "1068a5ac3fc94afc95189858b57cdf7c",
                    "category": null,
                    "url": "calqty-payment-fsg-term-operate"
                },
                {
                    "route": "staff-submit-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员报审-提交",
                    "id": "1092733f650d4ba8b2d9cb9130569312",
                    "category": null,
                    "url": "staff-submit-submit"
                },
                {
                    "route": "noncontration-totalPayment-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "总额支付设置-编辑",
                    "id": "10f3710d92d54383a79d0f54dc39c454",
                    "category": null,
                    "url": "noncontration-totalPayment-edit"
                },
                {
                    "route": "monthReport-management-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "管理处月报-删除",
                    "id": "10fd3d01cddf475a95cd13af63203a38",
                    "category": null,
                    "url": "monthReport-management-delete"
                },
                {
                    "route": "contractManage-ContractTypeRoute-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同类型配置首页-标准费用设置",
                    "id": "118840314ae348b4a6155804caa9aa87",
                    "category": null,
                    "url": "contractManage-ContractTypeRoute-edit"
                },
                {
                    "route": "btn-claimAdd",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "延期索赔管理-新增",
                    "id": "11ca26511b3140718ffba6b3e95cf6c7",
                    "category": null,
                    "url": "/btn-claimAdd"
                },
                {
                    "route": "/balance/handoverPayList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "交工结算",
                    "id": "13dca2d6c4d241d888f37d3add7a17f4",
                    "category": null,
                    "url": "/balance/handoverPayList"
                },
                {
                    "route": "scheme-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库列表-删除",
                    "id": "144e4572b41843e79067a54decabc411",
                    "category": null,
                    "url": "scheme-del"
                },
                {
                    "route": "staff-submit-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员报审-删除",
                    "id": "147fc8c173884aaaaeb133ceddd9ff45",
                    "category": null,
                    "url": "staff-submit-delete"
                },
                {
                    "route": "startup-firstitem-command-signIn",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件开工令-签收",
                    "id": "14f323e830784d60960e4eda28cdde8d",
                    "category": null,
                    "url": "startup-firstitem-command-signIn"
                },
                {
                    "route": "startup-subitem-command-signOut",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项开工令-签发",
                    "id": "152282b6996c49de9a5d58bc5275d67b",
                    "category": null,
                    "url": "startup-subitem-command-signOut"
                },
                {
                    "route": "qp-GXYS-SG-write",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-施工自检-表格库",
                    "id": "16189ac0281543f88aa5d2421eccec18",
                    "category": null,
                    "url": "qp-GXYS-SG-write"
                },
                {
                    "route": "calqty-audit-menu-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "控制计量报审-提交",
                    "id": "17a4a1829dc7414d941b6f4fc945d7d4",
                    "category": null,
                    "url": "calqty-audit-menu-submit"
                },
                {
                    "route": "startup-firstitem-check-apply-resolve",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件验收—撤回",
                    "id": "17aea4c3db0742a799f40f909bc3c76d",
                    "category": null,
                    "url": "startup-firstitem-check-apply-resolve"
                },
                {
                    "route": "openAllBoqTemp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单维护-展开",
                    "id": "17c32051acc9407ba2172e5c53a8a20d",
                    "category": null,
                    "url": "openAllBoqTemp"
                },
                {
                    "route": "menu-calqty-control-revise-list-change-adjust",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "变更联测数据调整-工程量调整",
                    "id": "17d532896ccf484d8520da9e70f7db1f",
                    "category": null,
                    "url": "menu-calqty-control-revise-list-change-adjust"
                },
                {
                    "route": "questionJldwUrge",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理单位隐患台账-催办",
                    "id": "181713d9b324470eb45a990816d1c576",
                    "category": null,
                    "url": "questionJldwUrge"
                },
                {
                    "route": "menu-calc-ledger-divide-add-entity",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-新增实体单元",
                    "id": "184b8aeb97df464b83796a4ceb5d9cf6",
                    "category": null,
                    "url": "menu-calc-ledger-divide-add-entity"
                },
                {
                    "route": "experiment-spotCheck-cancelled",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "抽检-作废",
                    "id": "1864c75665134b319c0c66db71bb8a58",
                    "category": null,
                    "url": "experiment-spotCheck-cancelled"
                },
                {
                    "route": "xmj-import-table-subitem",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目节-引入平台标准项目节(分表分项)库",
                    "id": "1890a4776fdc4bac9d4ee45957df37ae",
                    "category": null,
                    "url": "xmj-import-table-subitem"
                },
                {
                    "route": "qp-st-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-删除节段",
                    "id": "18fcdf68a45148de97416282b0cdc50e",
                    "category": null,
                    "url": "qp-st-delete"
                },
                {
                    "route": "sgCheckDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查施工-删除",
                    "id": "191973b1bc5645bf97e02a61de4d3eb3",
                    "category": null,
                    "url": "sgCheckDelete"
                },
                {
                    "route": "entity-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-编辑",
                    "id": "19b714ae93304b09a93115f4aaeea781",
                    "category": null,
                    "url": "entity-edit"
                },
                {
                    "route": "middle-calculate-gather-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "中间计量汇总-审核",
                    "id": "1a5bc1dd32154f8fb3334ff54ec3c26c",
                    "category": null,
                    "url": "middle-calculate-gather-audit"
                },
                {
                    "route": "question",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日常巡查",
                    "id": "1aad88be9f204ebea49f6bfab790b765",
                    "category": null,
                    "url": "/question"
                },
                {
                    "route": "glManpower-check-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤人员管理-添加",
                    "id": "1b8d1863dd784df4878eac0e2f6b8296",
                    "category": null,
                    "url": "glManpower-check-add"
                },
                {
                    "route": "m-calc-sub",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "中间计量汇总-提交",
                    "id": "1c529ab0e0784a299d8139155719eed0",
                    "category": null,
                    "url": "m-calc-sub"
                },
                {
                    "route": "menu-sub-option-calculate-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项完工计量列表-删除",
                    "id": "1c87af240ccc487682f332c8e0c840e7",
                    "category": null,
                    "url": "menu-sub-option-calculate-delete"
                },
                {
                    "route": "safety-technology-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项施工方案管理-新增",
                    "id": "1c9fa41797f543aa9181d7e1ac2fd71f",
                    "category": null,
                    "url": "safety-technology-add"
                },
                {
                    "route": "xmj-import-scheme",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目节-引入项目平台方案",
                    "id": "1cc2c07c23534788b594eaf6fbaf1bb5",
                    "category": null,
                    "url": "xmj-import-scheme"
                },
                {
                    "route": "stopWorkOrder-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令-审核",
                    "id": "1d256d957d2e4ab7840c3bb42b180172",
                    "category": null,
                    "url": "stopWorkOrder-audit"
                },
                {
                    "route": "glManpower-attendance-setup",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤段设定-设定",
                    "id": "1d2df310420d43a5b80b75685a270dc5",
                    "category": null,
                    "url": "glManpower-attendance-setup"
                },
                {
                    "route": "monthReport-management-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "管理处月报-提交",
                    "id": "1d312e012b7641f9a0c5e32a20998847",
                    "category": null,
                    "url": "monthReport-management-export"
                },
                {
                    "route": "calRelatedList-menu-spread",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量范围库-展开",
                    "id": "1d61fa2bafe14850a66323ee337598d4",
                    "category": null,
                    "url": "calRelatedList-menu-spread"
                },
                {
                    "route": "yzCheckUpdate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查业主-编辑",
                    "id": "1da913c332d64efdba055ed8f7461e45",
                    "category": null,
                    "url": "yzCheckUpdate"
                },
                {
                    "route": "subFinishedCalculate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "已完工分项计量",
                    "id": "1e8032756be3479a8589882a0930c8ec",
                    "category": null,
                    "url": "/projectCalc/subFinishedCalculate"
                },
                {
                    "route": "menu-calc-ledger-divide-lock",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-锁定",
                    "id": "1edb6a916dcf46398d2984d09ebdb5f6",
                    "category": null,
                    "url": "menu-calc-ledger-divide-lock"
                },
                {
                    "route": "glManpower-attendance-start",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤段设定-启用",
                    "id": "1f30495c3c094046b9b4bdf73b9aa72b",
                    "category": null,
                    "url": "glManpower-attendance-start"
                },
                {
                    "route": "entity-copys",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-复制",
                    "id": "1f6629217acf43d3a6978c4e5a774f92",
                    "category": null,
                    "url": "entity-copys"
                },
                {
                    "route": "document-menu-tree-project-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-项目库树删除",
                    "id": "1f715d7b21d14029bd5a7995619ce904",
                    "category": null,
                    "url": "document-menu-tree-project-delete"
                },
                {
                    "route": "rquisition-ledger-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-征拆记录-编辑",
                    "id": "201efe51a8ec48b1ab7e62fea65311b3",
                    "category": null,
                    "url": "rquisition-ledger-edit"
                },
                {
                    "route": "video-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "摄像头管理-删除",
                    "id": "207fd8a58e6e4390aae454457965af18",
                    "category": null,
                    "url": "video-delete"
                },
                {
                    "route": "wbs",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "单元划分",
                    "id": "20a1acf2e048466e80a72c0101332a61",
                    "category": null,
                    "url": "wbs"
                },
                {
                    "route": "menu-ledger-introduce-project",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-引入项目节",
                    "id": "20cb7df90b924e8ba1f7880b7023f2cd",
                    "category": null,
                    "url": "menu-ledger-introduce-project"
                },
                {
                    "route": "calqtycontractList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同工程量清单",
                    "id": "217ae46ab87f4eca8ce39bd43ed39968",
                    "category": null,
                    "url": "/calqty/contractList"
                },
                {
                    "route": "rquisition-expenses-preview",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆费用台账-报表预览",
                    "id": "22dafe045c654654b429a7d5fdcdeb0e",
                    "category": null,
                    "url": "rquisition-expenses-preview"
                },
                {
                    "route": "qp-audit-ZLPD-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-施工自检-审核",
                    "id": "231850e6dc84440fbb2d2ed8f938d39a",
                    "category": null,
                    "url": "qp-audit-ZLPD-SG"
                },
                {
                    "route": "projectToEntity-deleteEntitytype",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目实体库-删除",
                    "id": "237cf05311af49ef9feb587e3d45aa9e",
                    "category": null,
                    "url": "projectToEntity-deleteEntitytype"
                },
                {
                    "route": "menu-calc-ledger-divide-update-entity",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-更新实体单元",
                    "id": "23c0ca8b1b214180be2e3e38d0ab699a",
                    "category": null,
                    "url": "menu-calc-ledger-divide-update-entity"
                },
                {
                    "route": "paperSend-issue",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "发文管理-签发",
                    "id": "23cf4c705c324eb2ac43b528aa16c0f6",
                    "category": null,
                    "url": "paperSend-issue"
                },
                {
                    "route": "element-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件新增",
                    "id": "2438619686104b7ab09b2606484be26c",
                    "category": null,
                    "url": "element-add"
                },
                {
                    "route": "sample-ledger-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-删除",
                    "id": "24563e9109d64898b5551852cbb2261f",
                    "category": null,
                    "url": "sample-ledger-delete"
                },
                {
                    "route": "progress-plan-downTemplate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计划管理-下载project模板",
                    "id": "25d8608e71134570b6859d255b98013c",
                    "category": null,
                    "url": "progress-plan-downTemplate"
                },
                {
                    "route": "rquisition-check-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-清点台账记录-编辑",
                    "id": "26670a63255545e688e0674309e7280d",
                    "category": null,
                    "url": "rquisition-check-edit"
                },
                {
                    "route": "progress-plan-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计划管理-编辑",
                    "id": "26af7a074d284593882c579b6d6cd3a6",
                    "category": null,
                    "url": "progress-plan-edit"
                },
                {
                    "route": "noncontraction-contractList-unlock",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同清单-解锁",
                    "id": "279f5570246f432d9c1828e078209d20",
                    "category": null,
                    "url": "noncontraction-contractList-unlock"
                },
                {
                    "route": "qp-export-GXYS-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-施工自检-导出",
                    "id": "27d7019a50a144808d8e430f394ffb97",
                    "category": null,
                    "url": "qp-export-GXYS-SG"
                },
                {
                    "route": "experiment-materialLedger-selfCheck",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "材料台账-自检",
                    "id": "27ea6e7e2f144e2287665909d66670bb",
                    "category": null,
                    "url": "experiment-materialLedger-selfCheck"
                },
                {
                    "route": "monthReport-supervision-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理月报-提交",
                    "id": "27fcc40064e84bf38e98e6601f2ff5aa",
                    "category": null,
                    "url": "monthReport-supervision-submit"
                },
                {
                    "route": "startup-firstitem-apply-resolve",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件开工—撤回",
                    "id": "28ba1e2fef2b4cfa9a8d1815cbba4565",
                    "category": null,
                    "url": "startup-firstitem-apply-resolve"
                },
                {
                    "route": "agreement-tender-view",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "招标台账-报表预览",
                    "id": "28db399b6cc2468b8fe97bf2175185fa",
                    "category": null,
                    "url": "agreement-tender-view"
                },
                {
                    "route": "paperSend-check",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "发文管理-核稿",
                    "id": "295591e9b0ee4c7da4e168a405dc2698",
                    "category": null,
                    "url": "paperSend-check"
                },
                {
                    "route": "sitsupervisor",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "现场监理日志",
                    "id": "2993a1b5e99440bb88dca23101c7ae19",
                    "category": null,
                    "url": "/sitsupervisor"
                },
                {
                    "route": "qp-move-GXYS-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-监理抽检-移动",
                    "id": "2a79f40ddb5a45359fc93d2ed456811a",
                    "category": null,
                    "url": "qp-move-GXYS-JL"
                },
                {
                    "route": "standard-move",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-标准库-移动",
                    "id": "2ae6f696bfd140b2aa87ad16bd28d50d",
                    "category": null,
                    "url": "standard-move"
                },
                {
                    "route": "video-start",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "摄像头管理-启用",
                    "id": "2b34cf504a244ca4af47630097f3ad6c",
                    "category": null,
                    "url": "video-start"
                },
                {
                    "route": "sample-ledger-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-新增",
                    "id": "2b3a24b104874d63908c2930a7045025",
                    "category": null,
                    "url": "sample-ledger-add"
                },
                {
                    "route": "safety-technology-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项施工方案管理-编辑",
                    "id": "2babe38a11d7477f847833960cbcb70e",
                    "category": null,
                    "url": "safety-technology-edit"
                },
                {
                    "route": "noncontration-adjust-summary-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单汇总-导出",
                    "id": "2c0c2afe69c64b8195e7f633f5b3e9d1",
                    "category": null,
                    "url": "noncontration-adjust-summary-export"
                },
                {
                    "route": "document-menu-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-删除通用库",
                    "id": "2c1a376905054dba8c7e68911c135566",
                    "category": null,
                    "url": "document-menu-delete"
                },
                {
                    "route": "element-editSave",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件保存",
                    "id": "2c4666e2a5eb49c085e79e701b1ad6d7",
                    "category": null,
                    "url": "element-editSave"
                },
                {
                    "route": "calRangeLib-menu-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量范围库-新增",
                    "id": "2cc06c449e8c4894b1ba8b03439d3e2c",
                    "category": null,
                    "url": "calRangeLib-menu-add"
                },
                {
                    "route": "quality-register-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量责任登记-编辑",
                    "id": "2ccbb74b00c14e83a7c5c5a3efc12337",
                    "category": null,
                    "url": "quality-register-edit"
                },
                {
                    "route": "dailyLog-constructor-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-施工日志-提交",
                    "id": "2ccf044ef68f426c9f4f6c6be8891c1b",
                    "category": null,
                    "url": "dailyLog-constructor-submit"
                },
                {
                    "route": "calqty-payment-fsg-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "非施工支付—提交",
                    "id": "2d759744aa2b4c2db2c2bf5486e92892",
                    "category": null,
                    "url": "calqty-payment-fsg-operate"
                },
                {
                    "route": "stopWorkOrder-recall",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令-撤回 ",
                    "id": "2db63b58aae04b20b2575323c08fa669",
                    "category": null,
                    "url": "stopWorkOrder-recall"
                },
                {
                    "route": "PersonApproval",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员报审",
                    "id": "2ddfaf90296646868e011c131517a114",
                    "category": null,
                    "url": "/safe/staffSubmit"
                },
                {
                    "route": "schemeToEntity-linkMeasurementRange",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库-计量范围",
                    "id": "2f09f79153d94e12b67c015146f33d08",
                    "category": null,
                    "url": "schemeToEntity-linkMeasurementRange"
                },
                {
                    "route": "pullInBoqTemp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单维护-引入",
                    "id": "2f5fddf423634e02aa9a2be756d679ae",
                    "category": null,
                    "url": "pullInBoqTemp"
                },
                {
                    "route": "startup-firstitem-check-apply-query",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件验收-表单联查",
                    "id": "2f773a9c53314092a7280092211e4aff",
                    "category": null,
                    "url": "startup-firstitem-check-apply-query"
                },
                {
                    "route": "batchUploadPicture",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公式库-批量上传简图",
                    "id": "2fe34389d6714faf971a028c4eb53d6b",
                    "category": null,
                    "url": "batchUploadPicture"
                },
                {
                    "route": "document-article-statistics",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "通知公告-统计",
                    "id": "2ff74195e763414c8b8ccaa3d2967c4c",
                    "category": null,
                    "url": "document-article-statistics"
                },
                {
                    "route": "video-stop",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "摄像头管理-停用",
                    "id": "3070de15655f47a08014b06aa7020e9f",
                    "category": null,
                    "url": "video-stop"
                },
                {
                    "route": "glManpower-daily-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "打卡检查-导出",
                    "id": "30dc0544b23e4c0d8a56a89e2653fbeb",
                    "category": null,
                    "url": "glManpower-daily-export"
                },
                {
                    "route": "List",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单管理",
                    "id": "30e9745e834b4c709c7d820e1e88836c",
                    "category": null,
                    "url": "List"
                },
                {
                    "route": "xmj-modify",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目节-编辑",
                    "id": "30f9444cb1ee46508d354f8e381b2ce8",
                    "category": null,
                    "url": "xmj-modify"
                },
                {
                    "route": "startup-contract-notice-resolve",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工通知-撤回",
                    "id": "31df21eb25864318a24a82cad4b47215",
                    "category": null,
                    "url": "startup-contract-notice-resolve"
                },
                {
                    "route": "monthReport-management-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "管理处月报-批量导出 ",
                    "id": "326ac9680e8d4c2f9ca248bbf0278e80",
                    "category": null,
                    "url": "monthReport-management-export"
                },
                {
                    "route": "Check_the_announcement",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "检查公示",
                    "id": "330afb3a34054f90b89bad1c30e8bb8b",
                    "category": null,
                    "url": "Check_the_announcement"
                },
                {
                    "route": "questionAdd",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "隐患排查- 隐患录入",
                    "id": "334773badedb4ee3bf69e9a27e463601",
                    "category": null,
                    "url": "questionAdd"
                },
                {
                    "route": "dailyLog-setting-stop",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-日志填报设置-停用",
                    "id": "3351e79259f047e28ce98ed3aac3eacc",
                    "category": null,
                    "url": "dailyLog-setting-stop"
                },
                {
                    "route": "menu-calc-ledger-divide-data-record-introduce-entity",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "数据录入-引入实体单元",
                    "id": "33bdf0f86e1e44b3b97309ced1ebaa59",
                    "category": null,
                    "url": "menu-calc-ledger-divide-data-record-introduce-entity"
                },
                {
                    "route": "document-menu-law-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-通用库文件删除",
                    "id": "34ade4f25a6e4e778887245aecb5b3c0",
                    "category": null,
                    "url": "document-menu-law-delete"
                },
                {
                    "route": "resumeWorkApply-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工申请-编辑",
                    "id": "35659e608e6b4e0f8deeff65e84640b2",
                    "category": null,
                    "url": "resumeWorkApply-edit"
                },
                {
                    "route": "projectToEntity-linkMeasurementRange",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目实体库-计量范围",
                    "id": "3685cc8131ca4d2d9ec5e04c5867af78",
                    "category": null,
                    "url": "projectToEntity-linkMeasurementRange"
                },
                {
                    "route": "scheme-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库列表-新增",
                    "id": "37984bd99f98441fbf522d15ef14a818",
                    "category": null,
                    "url": "scheme-add"
                },
                {
                    "route": "dailyLog-supervisor-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-监理工程师日志-提交",
                    "id": "37b30ced3509471da692480874cda572",
                    "category": null,
                    "url": "dailyLog-supervisor-submit"
                },
                {
                    "route": "/attendance/personal/leave",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "请/销假台账",
                    "id": "392dde5b159f4ab087a672fa74b5ef6a",
                    "category": null,
                    "url": "/attendance/personal/leave"
                },
                {
                    "route": "resume-order-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令-新增",
                    "id": "392f3804f0bd4e22b7ff649e3478d18c",
                    "category": null,
                    "url": "resume-order-add"
                },
                {
                    "route": "subItem-copys",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项库-复制",
                    "id": "3931a9dc2fb444329f6da2603e0888c4",
                    "category": null,
                    "url": "subItem-copys"
                },
                {
                    "route": "element-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件删除",
                    "id": "39c8c061626f483f88f181b3bfb73826",
                    "category": null,
                    "url": "element-delete"
                },
                {
                    "route": "calqty-project-safety-modify",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "安全生产费计量-审核修改情况",
                    "id": "3a3a19042440497a8fa48246fcd666e6",
                    "category": null,
                    "url": "calqty-project-safety-modify"
                },
                {
                    "route": "resume-order-sign",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令-签收",
                    "id": "3a61f0e62a2c4b5897dd324128641861",
                    "category": null,
                    "url": "resume-order-sign"
                },
                {
                    "route": "staff-ledger-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员台账-删除",
                    "id": "3af63df021d041cd8889d2db797bf810",
                    "category": null,
                    "url": "staff-ledger-delete"
                },
                {
                    "route": "calqty-audit-menu-refresh",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "控制计量报审-刷新单价及金额",
                    "id": "3b93f452acd04687bf0bc741ae4f8df1",
                    "category": null,
                    "url": "calqty-audit-menu-refresh"
                },
                {
                    "route": "business-code-rule-consult-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "业务编码规则管理-删除",
                    "id": "3bd199edfbb54770ae6db6e1fe1c4007",
                    "category": null,
                    "url": "business-code-rule-consult-del"
                },
                {
                    "route": "apparatus-add/edit/del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "设备管理-新增编辑删除",
                    "id": "3c0e9bccb4304275952f92bf39be1c59",
                    "category": null,
                    "url": "apparatus-add/edit/del"
                },
                {
                    "route": "calqty-calcTermSet-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量期设置-删除",
                    "id": "3c0f95d4605f46878074c9522c7b1a76",
                    "category": null,
                    "url": "calqty-calcTermSet-delete"
                },
                {
                    "route": "question/ledger/jldw",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理单位隐患台账",
                    "id": "3c3d7fea1342492da89bc7cfcfaa0f88",
                    "category": null,
                    "url": "/question/ledger/jldw"
                },
                {
                    "route": "btn-claimFormConnect",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "延期索赔管理-表单联查",
                    "id": "3c47f4510e4f49cf97ad4426172d60b4",
                    "category": null,
                    "url": "/btn-claimFormConnect"
                },
                {
                    "route": "glManpower-daily-examine",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "打卡检查-抽查",
                    "id": "3caebc6e2ad049288d2cf5d66354bb54",
                    "category": null,
                    "url": "glManpower-daily-examine"
                },
                {
                    "route": "calqty-controlList-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "动态工程量清单-设置计量比例",
                    "id": "3e2885a8754047318ddc2babe3baa324",
                    "category": null,
                    "url": "calqty-controlList-add"
                },
                {
                    "route": "sgCheckUpdate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查施工-编辑",
                    "id": "3e36160f960a48108e1958d8adbad986",
                    "category": null,
                    "url": "sgCheckUpdate"
                },
                {
                    "route": "document-menu-law-project-statistics",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-项目库文件统计",
                    "id": "3e6c0bc59b924d3a90fee3075db49f8a",
                    "category": null,
                    "url": "document-menu-law-project-statistics"
                },
                {
                    "route": "glManpower-auditor-update",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "请/销假台账-审核",
                    "id": "3e7aa79170474c00bf9efebccc1a9c19",
                    "category": null,
                    "url": "glManpower-auditor-update"
                },
                {
                    "route": "question-Sgdw-Invalid",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工单位隐患台账-作废",
                    "id": "3ec4ce4922704edf8e53c032d463a693",
                    "category": null,
                    "url": "question-Sgdw-Invalid"
                },
                {
                    "route": "element-update",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件编辑",
                    "id": "3ee8a06731844549a9ee717361b09183",
                    "category": null,
                    "url": "element-update"
                },
                {
                    "route": "calRangeLib-menu-refer",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量范围库-复制",
                    "id": "3ff8e7f4fe6947ad976ab9dcee92bbfd",
                    "category": null,
                    "url": "calRangeLib-menu-refer"
                },
                {
                    "route": "btn-assist",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "帮助与支持-操作权限",
                    "id": "400fc5957b4d46869f2894f05bdb1d6e",
                    "category": null,
                    "url": "btn-assist"
                },
                {
                    "route": "coordinate-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "逐桩坐标-新增",
                    "id": "401db7ee6eb246fcaec87c72b4ff9da2",
                    "category": null,
                    "url": "coordinate-add"
                },
                {
                    "route": "menu-sub-option-calculate-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项完工计量-引入台账",
                    "id": "407621e4b30540a195cb9d55df3ada00",
                    "category": null,
                    "url": "menu-sub-option-calculate-import"
                },
                {
                    "route": "calqty",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量支付",
                    "id": "4080017e42dd402ab9454fd54aa6644f",
                    "category": null,
                    "url": "calqty"
                },
                {
                    "route": "projectToEntity-linkSubItem",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目实体库-关联分项",
                    "id": "40b70de343cd41898685c3162b1e570c",
                    "category": null,
                    "url": "projectToEntity-linkSubItem"
                },
                {
                    "route": "home-worktab-dp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "左侧汇报按钮",
                    "id": "40bd8d60027042b59a091d2a8045baed",
                    "category": null,
                    "url": "home-worktab-dp"
                },
                {
                    "route": "glManpower-attendance-stop",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤段设定-停止",
                    "id": "40e072ce772b4b51926f1ae710bb24fc",
                    "category": null,
                    "url": "glManpower-attendance-stop"
                },
                {
                    "route": "jhgla",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计划管理",
                    "id": "40f0a72571a848b38da68521813cbecc",
                    "category": null,
                    "url": "jhgl"
                },
                {
                    "route": "element-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件导入",
                    "id": "4189be2029e14a049153d2c5d8614b5a",
                    "category": null,
                    "url": "element-import"
                },
                {
                    "route": "sample-ledger-add-material",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-新增-材料类",
                    "id": "42430c9f43fe474a985371fddf1baeb6",
                    "category": null,
                    "url": "sample-ledger-add-material"
                },
                {
                    "route": "resume-order-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令-删除",
                    "id": "42928b1737a143fb87759f62c8885a89",
                    "category": null,
                    "url": "resume-order-del"
                },
                {
                    "route": "downgradeBoqTemp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单维护-降级",
                    "id": "42d765285e734faa82389662eb8970ca",
                    "category": null,
                    "url": "downgradeBoqTemp"
                },
                {
                    "route": "calRangeLib-menu-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量范围库-删除",
                    "id": "42fb61fdfb324a448356234d6c7dbfee",
                    "category": null,
                    "url": "calRangeLib-menu-delete"
                },
                {
                    "route": "calqty-project-hundred",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "100章清单计量-编辑",
                    "id": "433b2c9515a847e0873f66b79ced6e64",
                    "category": null,
                    "url": "calqty-project-hundred"
                },
                {
                    "route": "question-Yzdw-Invalid",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "业主单位隐患台账-作废",
                    "id": "43827f12d2dd418e8a8337dcc4d67e51",
                    "category": null,
                    "url": "question-Yzdw-Invalid"
                },
                {
                    "route": "document-menu-law-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-通用库文件上传",
                    "id": "438f3de9472844b182e0fcf750b68d70",
                    "category": null,
                    "url": "document-menu-law-add"
                },
                {
                    "route": "qp-export-ZLPD-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-施工自检-导出",
                    "id": "445f1b7266dd49a8bf5b0841d03f91ae",
                    "category": null,
                    "url": "qp-export-ZLPD-SG"
                },
                {
                    "route": "stopWorkOrder-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令-编辑",
                    "id": "4479e0e11ce54d9ba528876e194738d8",
                    "category": null,
                    "url": "stopWorkOrder-edit"
                },
                {
                    "route": "resume-order-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令-审核",
                    "id": "448d66c1c7a24b66bff1ed66b581168c",
                    "category": null,
                    "url": "resume-order-audit"
                },
                {
                    "route": "qp-st-revoke-GXYS-1",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-监理抽检-恢复预置",
                    "id": "44ac67f4ab9c40848d8b2c4b9ab8efcc",
                    "category": null,
                    "url": "qp-st-revoke-GXYS-1"
                },
                {
                    "route": "calqty-calcTermSet-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量期设置-新增",
                    "id": "45d52a3f58fc440fb94b9b2c8413c433",
                    "category": null,
                    "url": "calqty-calcTermSet-add"
                },
                {
                    "route": "glManpower-daily-video",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "打卡检查-视频点名",
                    "id": "45d9ba0fdf5945848e422a1c0a7dec37",
                    "category": null,
                    "url": "glManpower-daily-video"
                },
                {
                    "route": "menu-safe-risk-source-check-plan",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "巡查计划",
                    "id": "45dbf3a9c96447bdacd731b30bbb105c",
                    "category": null,
                    "url": "menu-safe-risk-source-check-plan"
                },
                {
                    "route": "qp-delete-GXYS-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-施工自检-删除",
                    "id": "4608b085a11a4d74b8a6a3515b22bcc2",
                    "category": null,
                    "url": "qp-delete-GXYS-SG"
                },
                {
                    "route": "listAdjust-menu-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "新增清单及总额清单调整-提交",
                    "id": "46c129c20d054c48838e3d5ef3e5f55a",
                    "category": null,
                    "url": "listAdjust-menu-submit"
                },
                {
                    "route": "menu-calc-ledger-divide-data-record-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "数据录入-删除",
                    "id": "470113d30a644c54a444a305733a5f69",
                    "category": null,
                    "url": "menu-calc-ledger-divide-data-record-delete"
                },
                {
                    "route": "experiment-ensure-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-质量保证体系-删除",
                    "id": "475afbcf843e4ebf89a2aa9679bc75e1",
                    "category": null,
                    "url": "experiment-ensure-del"
                },
                {
                    "route": "agreement-tender-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "招标台账-新增",
                    "id": "48473ac9dd9f43d696af73353a4814a2",
                    "category": null,
                    "url": "agreement-tender-add"
                },
                {
                    "route": "xmj-import-subitem",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目节-引入平台标准项目节(分项)库",
                    "id": "4895d02be0fc4154b99af87ad3b645ec",
                    "category": null,
                    "url": "xmj-import-subitem"
                },
                {
                    "route": "startup-contract-notice-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工通知-编辑",
                    "id": "48c65ddeda374277b9611c95a2bf1fbb",
                    "category": null,
                    "url": "startup-contract-notice-edit"
                },
                {
                    "route": "material-people-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "试验人员-新增编辑删除",
                    "id": "4964b9ddd9644b76af0516d8449534d9",
                    "category": null,
                    "url": "material-people-operate"
                },
                {
                    "route": "projectToEntity-linkStandardList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目实体库-映射清单",
                    "id": "49668ab2eb6f4e0b90827f1af059258b",
                    "category": null,
                    "url": "projectToEntity-linkStandardList"
                },
                {
                    "route": "calqty-audit-menu-controlBook",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "控制计量报审-审核修改情况",
                    "id": "49670bbf81bc4c1999db0c214ee78fc9",
                    "category": null,
                    "url": "calqty-audit-menu-controlBook"
                },
                {
                    "route": "questionSgdwUrge",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工单位隐患台账-催办",
                    "id": "49ad2328e9fb452eb63ebd4d51b85e0c",
                    "category": null,
                    "url": "questionSgdwUrge"
                },
                {
                    "route": "calqty-subitem-unlock",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量分项设置-解锁",
                    "id": "49dc05ddf22a4ba3bccb95b6ed9dacac",
                    "category": null,
                    "url": "calqty-subitem-unlock"
                },
                {
                    "route": "qp-obsolete-ZLPD-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-施工自检-驳回",
                    "id": "4a9401c999f74f4382f8b55e7602952a",
                    "category": null,
                    "url": "qp-obsolete-ZLPD-SG"
                },
                {
                    "route": "document-article-retract",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "通知公告-撤回",
                    "id": "4b2a6f47fec745b791500528d020c396",
                    "category": null,
                    "url": "document-article-retract"
                },
                {
                    "route": "element-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件导出",
                    "id": "4b484a1ad3214bfbb5b30b25238400c9",
                    "category": null,
                    "url": "element-export"
                },
                {
                    "route": "menu-calc-ledger-divide-expand",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-展开",
                    "id": "4cd905e7815849ce9ac1613cb9aea69b",
                    "category": null,
                    "url": "menu-calc-ledger-divide-expand"
                },
                {
                    "route": "questionRevert",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "隐患排查- 撤回",
                    "id": "4e1cadc3fc9a4b719d6dc338e3737224",
                    "category": null,
                    "url": "questionRevert"
                },
                {
                    "route": "listAdjust-menu-adjust",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "新增清单及总额清单调整-调整申请",
                    "id": "4e83c367d6aa4778ad00206c8e152bfb",
                    "category": null,
                    "url": "listAdjust-menu-adjust"
                },
                {
                    "route": "realName-management-work",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实名台账-在职",
                    "id": "4eaa1ffbed654a65b261be3367334d9f",
                    "category": null,
                    "url": "realName-management-work"
                },
                {
                    "route": "calqty-payment-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量支付-工程支付-操作权限",
                    "id": "4f13cc6e26c9415a86e7376ad3d8705e",
                    "category": null,
                    "url": "calqty-payment-operate"
                },
                {
                    "route": "experiment-contractLib-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "试验合同段参数库-操作按钮",
                    "id": "4f93d9aea6fb41409bdc4887806fdf2f",
                    "category": null,
                    "url": "experiment-contractLib-operate"
                },
                {
                    "route": "startup-firstitem-check-apply-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件验收—新增",
                    "id": "4fb74f3f825844218412d5401ed3ccf1",
                    "category": null,
                    "url": "startup-firstitem-check-apply-add"
                },
                {
                    "route": "contractManage-ContractTypeEdit-update",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同类型配置-保存",
                    "id": "50aa99c624da494aa40f1791471a0543",
                    "category": null,
                    "url": "contractManage-ContractTypeEdit-update"
                },
                {
                    "route": "quality-ensure-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-审核",
                    "id": "51126b6bc4984e79bd80a8282538a901",
                    "category": null,
                    "url": "quality-ensure-audit"
                },
                {
                    "route": "dailyLog-master-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-业主日志-新增",
                    "id": "517c5d906e9b49519ce86f98362ceaea",
                    "category": null,
                    "url": "dailyLog-master-add"
                },
                {
                    "route": "qp-st-revoke-GXYS-0",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-施工自检-恢复预置",
                    "id": "517f707b5f1543acb439c891320238e4",
                    "category": null,
                    "url": "qp-st-revoke-GXYS-0"
                },
                {
                    "route": "special-calculate-report",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "中间计量汇总-超计量情况",
                    "id": "51f6a110d43f4deda31d766e56186d77",
                    "category": null,
                    "url": "special-calculate-report"
                },
                {
                    "route": "rquisition-check-set",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-清点台账记录-清点类型设置",
                    "id": "52501a743bef48799f50ceb2800b2101",
                    "category": null,
                    "url": "rquisition-check-set"
                },
                {
                    "route": "startup-subitem-command-resolve",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项开工令-撤回",
                    "id": "52b151f678ab4fd6a24616f1edf19e41",
                    "category": null,
                    "url": "startup-subitem-command-resolve"
                },
                {
                    "route": "table-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "表格库-导入表格",
                    "id": "536b1654d5b342ddb434edd389e5f498",
                    "category": null,
                    "url": "table-import"
                },
                {
                    "route": "/qualityManage/qualityEnsureTable",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系",
                    "id": "53859a2a3ad54c27bd312fcaa67d4bce",
                    "category": null,
                    "url": "/qualityManage/qualityEnsureTable"
                },
                {
                    "route": "papresDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件监理-删除",
                    "id": "5386ac95316944d6ad2744347ce3ab01",
                    "category": null,
                    "url": "papresDelete"
                },
                {
                    "route": "menu-ledger-import-project",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-导入项目节",
                    "id": "5409b2b010ba48759ba73538c2ae23ae",
                    "category": null,
                    "url": "menu-ledger-import-project"
                },
                {
                    "route": "noncontraction-contractList-exp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同清单-导出",
                    "id": "5434cb7c714548f7bc0be6b0aa9c513a",
                    "category": null,
                    "url": "noncontraction-contractList-exp"
                },
                {
                    "route": "startup-contract-apply-resolve",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工申请-撤回",
                    "id": "54ae3d77d0d846d19469e22a4b45909c",
                    "category": null,
                    "url": "startup-contract-apply-resolve"
                },
                {
                    "route": "document-article-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "通知公告-编辑",
                    "id": "54bddf90cbc94a6baabc6cea82b5a2c0",
                    "category": null,
                    "url": "document-article-edit"
                },
                {
                    "route": "addBoqTemp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单维护-新增",
                    "id": "555bab8251f34ef391339836f9d20044",
                    "category": null,
                    "url": "addBoqTemp"
                },
                {
                    "route": "jdgll",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "进度管理",
                    "id": "55c7ad6c08d243dc83ce3eda79300bf7",
                    "category": null,
                    "url": "jdgll"
                },
                {
                    "route": "entity-link",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-关联分项",
                    "id": "560c9f585d4b4953a72284ec904deef4",
                    "category": null,
                    "url": "entity-link"
                },
                {
                    "route": "experiment-record-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "记录表台账-删除",
                    "id": "56c6a1bb3c6a4b31a93a5e2275afb996",
                    "category": null,
                    "url": "experiment-record-delete"
                },
                {
                    "route": "qp-delete-GXYS-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-监理抽检-删除",
                    "id": "56d68470a6fc4dc0bb25a748af68b16f",
                    "category": null,
                    "url": "qp-delete-GXYS-JL"
                },
                {
                    "route": "exp-standard-lib-tree-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-标准库-目录树新增",
                    "id": "5799ac11acf1478e86c6276761146679",
                    "category": null,
                    "url": "exp-standard-lib-tree-add"
                },
                {
                    "route": "Personal_attendance",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "个人考勤",
                    "id": "57d9b9a177974a54b3ed79fe8ae88185",
                    "category": null,
                    "url": "Personal_attendance"
                },
                {
                    "route": "standard-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-标准库-编辑",
                    "id": "581e2ceee2bf436ab8b7d9f1b77c5809",
                    "category": null,
                    "url": "standard-edit"
                },
                {
                    "route": "sub-sample-ledger-confirm",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "试件台账-确认",
                    "id": "586b331b4e0c480db896151f6c60fda2",
                    "category": null,
                    "url": "sub-sample-ledger-confirm"
                },
                {
                    "route": "question-Yzdw-BatchExport",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "业主单位隐患台账-批量导出报表",
                    "id": "5973c5c375534301938abeea3af6b178",
                    "category": null,
                    "url": "question-Yzdw-BatchExport"
                },
                {
                    "route": "addBoqTempLib",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单范本库-新增",
                    "id": "5a4ae18bad0a4d198f6583c578e90e6a",
                    "category": null,
                    "url": "addBoqTempLib"
                },
                {
                    "route": "paper-ledger-update",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公文台账-归档调整",
                    "id": "5a557f0eda014dc3a39199be3e685567",
                    "category": null,
                    "url": "paper-ledger-update"
                },
                {
                    "route": "entity-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-导出",
                    "id": "5aa7ca1819d1467b8f4b5bf7d06ab892",
                    "category": null,
                    "url": "entity-export"
                },
                {
                    "route": "calqty-subitem-lock",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量分项设置-锁定",
                    "id": "5ab1508c72f64e0fbc2d4b479775edbe",
                    "category": null,
                    "url": "calqty-subitem-lock"
                },
                {
                    "route": "dailyLog-constructor-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-施工日志-新增",
                    "id": "5b2b655424014c36852899d70b2485a6",
                    "category": null,
                    "url": "dailyLog-constructor-add"
                },
                {
                    "route": "yzCheckDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查业主-删除",
                    "id": "5b36f4ebd625486f9a455ad5aba147ff",
                    "category": null,
                    "url": "yzCheckDelete"
                },
                {
                    "route": "progress-plan-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计划管理-计划报审",
                    "id": "5bf89212b63e4963b792e0918b68835a",
                    "category": null,
                    "url": "progress-plan-add"
                },
                {
                    "route": "dailyLog-siteSupervisor-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-现场监理日志-批量导出",
                    "id": "5c147852c5164d12b5b862b0dca0388f",
                    "category": null,
                    "url": "dailyLog-siteSupervisor-export"
                },
                {
                    "route": "menu-calc-ledger-divide-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-编辑",
                    "id": "5c36cc658c834ba582771fedaf5e0ff3",
                    "category": null,
                    "url": "menu-calc-ledger-divide-edit"
                },
                {
                    "route": "staff-submit-addPerson",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员报审-选择人员",
                    "id": "5c506095a8d74d8bb5dfe5139bc764fb",
                    "category": null,
                    "url": "staff-submit-addPerson"
                },
                {
                    "route": "apparatusUsage-add/edit/del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "设备管理-使用记录增删行",
                    "id": "5c6234fcffa54441b5290c12982e9585",
                    "category": null,
                    "url": "apparatusUsage-add/edit/del"
                },
                {
                    "route": "contractManage-ContractTypeRoute-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同类型配置首页-编辑",
                    "id": "5d776dee6e7d4dde91cac32090108454",
                    "category": null,
                    "url": "contractManage-ContractTypeRoute-add"
                },
                {
                    "route": "sample-retain-deal",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "留样台账-留样处置",
                    "id": "5dd7b4ec620b48aab90b1d069c75e274",
                    "category": null,
                    "url": "sample-retain-deal"
                },
                {
                    "route": "startup-firstitem-apply-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件开工—编辑",
                    "id": "5ebef444831d45d184e72c331b2eae51",
                    "category": null,
                    "url": "startup-firstitem-apply-edit"
                },
                {
                    "route": "rquisition-ledger-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-征拆记录-新增",
                    "id": "5effa5e695334e788f9cfa038516d918",
                    "category": null,
                    "url": "rquisition-ledger-add"
                },
                {
                    "route": "document-menu-project-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-删除项目库",
                    "id": "5f33795d734c4794b4887e341dc3977e",
                    "category": null,
                    "url": "document-menu-project-delete"
                },
                {
                    "route": "menu-calc-ledger-divide-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-导出",
                    "id": "5f68140b05bf4d298f36f697f5aa6988",
                    "category": null,
                    "url": "menu-calc-ledger-divide-export"
                },
                {
                    "route": "bim-riskSource",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实景-安全",
                    "id": "5f8cc7de72e048cc9b85d968da6a30c3",
                    "category": null,
                    "url": "bim-riskSource"
                },
                {
                    "route": "sgPapresUpdate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件施工-编辑",
                    "id": "6086f36b733c4964967eb74ad6d75513",
                    "category": null,
                    "url": "sgPapresUpdate"
                },
                {
                    "route": "monthReport-management-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "管理处月报-新增",
                    "id": "60a9f832abbb4cf491909f41b45450d5",
                    "category": null,
                    "url": "monthReport-management-add"
                },
                {
                    "route": "paper-ledger-tree-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公文台账-公文树编辑",
                    "id": "60b124819ac24cf0b3985c15099b5d72",
                    "category": null,
                    "url": "paper-ledger-tree-edit"
                },
                {
                    "route": "menu-sub-option-calculate-calculate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项完工计量按钮",
                    "id": "6165d70a2de04f7f8f1cd0b52a26c4f7",
                    "category": null,
                    "url": "menu-sub-option-calculate-calculate"
                },
                {
                    "route": "qp-st-revoke-ZLPD-1",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理抽检-质量评定-恢复预置",
                    "id": "61fbf08df4664a34a769a8d46b5f6bff",
                    "category": null,
                    "url": "qp-st-revoke-ZLPD-1"
                },
                {
                    "route": "menu-calqty-control-revise-change-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "变更联测数据调整-引入台账",
                    "id": "62f3865ec46d4624a4a2e72a1e1fe8a7",
                    "category": null,
                    "url": "menu-calqty-control-revise-change-import"
                },
                {
                    "route": "startup-subitem-apply-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项开工申请-审核",
                    "id": "631084f523644dd881fdf4bfd6e20eea",
                    "category": null,
                    "url": "startup-subitem-apply-audit"
                },
                {
                    "route": "quality-ensure-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-新增",
                    "id": "63974f1f486e47bd9716fb9ede3ae314",
                    "category": null,
                    "url": "quality-ensure-add"
                },
                {
                    "route": "checkLedger_sendCheck",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "检定校准台账-送检",
                    "id": "63c295d7e3af4e6b8aae35f2834f18e1",
                    "category": null,
                    "url": "checkLedger_sendCheck"
                },
                {
                    "route": "experiment-selfCheck-cancelled",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "自检-作废",
                    "id": "63eb0f7663174f5194ee58f0c81f9c32",
                    "category": null,
                    "url": "experiment-selfCheck-cancelled"
                },
                {
                    "route": "qp-check-ZLPD-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-监理抽检-相关质量表格",
                    "id": "6493a272d5334b4abdc6d67502ad9d5c",
                    "category": null,
                    "url": "qp-check-ZLPD-JL"
                },
                {
                    "route": "importFormulaLib",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公式库-导入",
                    "id": "64b4cc5c82ee4502a1daebda11e3ea87",
                    "category": null,
                    "url": "importFormulaLib"
                },
                {
                    "route": "video-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "摄像头管理-编辑",
                    "id": "64c19f73824e4ab1b52ac2483b4bf31e",
                    "category": null,
                    "url": "video-edit"
                },
                {
                    "route": "startup-firstitem-check-apply-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件验收—提交",
                    "id": "66491769c9fb4fa39efa1339a4e2f110",
                    "category": null,
                    "url": "startup-firstitem-check-apply-submit"
                },
                {
                    "route": "qp-GXYS-JL-write",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-监理抽检-表格库",
                    "id": "66cd244a72294a41924c55dda2f1e54d",
                    "category": null,
                    "url": "qp-GXYS-JL-write"
                },
                {
                    "route": "resume-order-void",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令-作废",
                    "id": "679d783fd30e47e6b0fe1b88e748d194",
                    "category": null,
                    "url": "resume-order-void"
                },
                {
                    "route": "handoverPayList-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "交工-删除",
                    "id": "67c057f788b44be881723f69a579b1ce",
                    "category": null,
                    "url": "handoverPayList-delete"
                },
                {
                    "route": "schemeToEntity-importEntitytype",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库-新增",
                    "id": "680f46f4382e48d8b282be5348d0d532",
                    "category": null,
                    "url": "schemeToEntity-importEntitytype"
                },
                {
                    "route": "handoverPayList-invalidate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "交工-废除",
                    "id": "69f92191c0584b19b59d31a9e4e9a8aa",
                    "category": null,
                    "url": "handoverPayList-invalidate"
                },
                {
                    "route": "document-menu-law-statistics",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-通用库文件统计",
                    "id": "6a17d2990f21467f9de242fe73cc5c11",
                    "category": null,
                    "url": "document-menu-law-statistics"
                },
                {
                    "route": "startup-contract-notice-issue",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工通知-签发",
                    "id": "6a3a9ee6d4f549a6bb75efb959dfeffd",
                    "category": null,
                    "url": "startup-contract-notice-issue"
                },
                {
                    "route": "monthReport-supervision-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理月报-删除",
                    "id": "6a90d0d2225142ab951e4290908757a7",
                    "category": null,
                    "url": "monthReport-supervision-delete"
                },
                {
                    "route": "contractManage-StandardCost-reset",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "标准费用设置-重置",
                    "id": "6a969fc431254afeb7c43caaafd0d9e0",
                    "category": null,
                    "url": "contractManage-StandardCost-reset"
                },
                {
                    "route": "subItem-link",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项库-关联表格",
                    "id": "6a9f171e92ce440fbc35cba403d24137",
                    "category": null,
                    "url": "subItem-link"
                },
                {
                    "route": "quality-register-down",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量责任登记-登记表模板下载",
                    "id": "6aa6b888bc08446cac46fff8b6ae6ab7",
                    "category": null,
                    "url": "quality-register-down"
                },
                {
                    "route": "calqty-control-menu-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "控制计量报审-删除",
                    "id": "6ae5d349476f4e33a8ec889f1f1bace1",
                    "category": null,
                    "url": "calqty-control-menu-delete"
                },
                {
                    "route": "/document/database",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "资料库-页面查看",
                    "id": "6bb4b0f8951e4112aa0f28fdbdc31925",
                    "category": null,
                    "url": "/document/database"
                },
                {
                    "route": "subItem-mobile",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项库-移动",
                    "id": "6bc86cd538d94a29adb6f168b8fc8913",
                    "category": null,
                    "url": "subItem-mobile"
                },
                {
                    "route": "experiment-workConnectLedger-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工作联系单台账-新增",
                    "id": "6bda755042334494ac0d9b5adedb077c",
                    "category": null,
                    "url": "experiment-workConnectLedger-add"
                },
                {
                    "route": "startup-firstitem-check-apply-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件验收—审核",
                    "id": "6bfc1e54a60a4be790c08f1003d0a012",
                    "category": null,
                    "url": "startup-firstitem-check-apply-audit"
                },
                {
                    "route": "a_wxy_fd",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "移动端危险源发单",
                    "id": "6c563959aacd48b29ae45f3240f651fc",
                    "category": null,
                    "url": "a_wxy_fd"
                },
                {
                    "route": "listAdjust",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "新增清单及总额清单调整",
                    "id": "6c666cdf3efb449fac7a0a2e75109a7c",
                    "category": null,
                    "url": "listAdjust"
                },
                {
                    "route": "schemeToEntity-linkStandardList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库-映射清单",
                    "id": "6cb8bf9ee228454bac6dd7f92a1e3dd0",
                    "category": null,
                    "url": "schemeToEntity-linkStandardList"
                },
                {
                    "route": "noncontration-adjust-detail-report",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整详情-提交",
                    "id": "6cc5eaab56734fa79c0ce0c7fd9e41a0",
                    "category": null,
                    "url": "noncontration-adjust-detail-report"
                },
                {
                    "route": "self_realScene_add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "自研实景数据管理操作按钮",
                    "id": "6d011e92da4c42aeb2b61af61096a434",
                    "category": null,
                    "url": "self_realScene_add"
                },
                {
                    "route": "btn-claimReAudit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "延期索赔管理-重新审批",
                    "id": "6d6ea1870f4241f6bfe55b7b7c0dd075",
                    "category": null,
                    "url": "/btn-claimReAudit"
                },
                {
                    "route": "gctfg",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程停复工",
                    "id": "6dc797a24d7343b3bb1f7c6d8128d6d6",
                    "category": null,
                    "url": "gctfg"
                },
                {
                    "route": "checkLedger_sendVerify",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "检定校准台账-送检报审台账",
                    "id": "6dfd90db579d406793496f71db7c8f2c",
                    "category": null,
                    "url": "checkLedger_sendVerify"
                },
                {
                    "route": "noncontraction-contractList-check",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同清单-校验",
                    "id": "6e65f5870148476b8dc2e3ca4544c8cb",
                    "category": null,
                    "url": "noncontraction-contractList-check"
                },
                {
                    "route": "menu-safe-risk-source-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "重大危险源管理-导入",
                    "id": "6ee806cf1ab849d0a2bb2bf8ef483cb6",
                    "category": null,
                    "url": "menu-safe-risk-source-import"
                },
                {
                    "route": "resume-order-issue",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令-签发",
                    "id": "6f40a8990ec346d9ad460ae79f47e7e8",
                    "category": null,
                    "url": "resume-order-issue"
                },
                {
                    "route": "menu-safe-risk-source-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "重大危险源管理-新增",
                    "id": "6f89e3eee13a4e878271296ea94048b3",
                    "category": null,
                    "url": "menu-safe-risk-source-add"
                },
                {
                    "route": "document-menu-tree-project-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-项目库树编辑",
                    "id": "706fc307199d485dbca5520972856e33",
                    "category": null,
                    "url": "document-menu-tree-project-edit"
                },
                {
                    "route": "balance_submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "交工-提交",
                    "id": "7081207bb424470b9ba44d6bc900dae2",
                    "category": null,
                    "url": "balance_submit"
                },
                {
                    "route": "rquisition-check-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-清点台账记录-审核",
                    "id": "70af9379e20b4614844a0cae6f8c62ac",
                    "category": null,
                    "url": "rquisition-check-audit"
                },
                {
                    "route": "menu-calqty-control-revise-list-change-unlock",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "变更联测数据调整-申请解锁",
                    "id": "7144acbe471848f285504b69c4e8e768",
                    "category": null,
                    "url": "menu-calqty-control-revise-list-change-unlock"
                },
                {
                    "route": "contractManage-ContractTypeEdit-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同类型配置-删除",
                    "id": "71c7e84b2d994feca912e69a0455c121",
                    "category": null,
                    "url": "contractManage-ContractTypeEdit-delete"
                },
                {
                    "route": "projectToEntity-importEntitytype",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目实体库-引入平台标准库",
                    "id": "722140f037d34dcc8aaba070c0dcc002",
                    "category": null,
                    "url": "projectToEntity-importEntitytype"
                },
                {
                    "route": "startup-firstitem-command-signOut",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件开工令-签发",
                    "id": "72666b9e332944689351e382b9ca3422",
                    "category": null,
                    "url": "startup-firstitem-command-signOut"
                },
                {
                    "route": "CL-controlList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "控制点信息页面",
                    "id": "72962ab7db164d7182f2d5de814fb7f4",
                    "category": null,
                    "url": "/controlMeasures/controlList"
                },
                {
                    "route": "calqty-project-safety-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "安全生产费计量-提交",
                    "id": "7408694f2b5049c7b5dfd9edd1bf8afc",
                    "category": null,
                    "url": "calqty-project-safety-submit"
                },
                {
                    "route": "materialLedger_delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "材料台账-删除",
                    "id": "744f8330e19949388eb0771372b6aa53",
                    "category": null,
                    "url": "/experiment/materialLedger"
                },
                {
                    "route": "document-menu-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-编辑通用库",
                    "id": "74c4e91575344f5782ab0c36874a2c98",
                    "category": null,
                    "url": "document-menu-edit"
                },
                {
                    "route": "entity-param",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-关联实体参数",
                    "id": "74ece0f6e5b043f08db5cc902bb7211e",
                    "category": null,
                    "url": "entity-param"
                },
                {
                    "route": "setting",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志填报设置",
                    "id": "7502ca36d20342ed9e22851ad873dd72",
                    "category": null,
                    "url": "/setting"
                },
                {
                    "route": "noncontration-adjust-summary-set",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单汇总-清单比例设置",
                    "id": "757e619731674dea8064ff7f63a780dd",
                    "category": null,
                    "url": "noncontration-adjust-summary-set"
                },
                {
                    "route": "startup-subitem-command-signIn",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项开工令-签收",
                    "id": "75b1cbe277654f8c9300b05d9f0fb7cb",
                    "category": null,
                    "url": "startup-subitem-command-signIn"
                },
                {
                    "route": "rquisition-expenses-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆费用台账-编辑",
                    "id": "762c995b0c114c7b9f74026bde6fec4a",
                    "category": null,
                    "url": "rquisition-expenses-edit"
                },
                {
                    "route": "riskPlan-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "巡查计划管理-删除",
                    "id": "76356648e3ac4da28d1b302b351ccb4b",
                    "category": null,
                    "url": "riskPlan-delete"
                },
                {
                    "route": "/agreement/resumeWorkApply",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工申请",
                    "id": "766d6a380e56495896385be0aa467df6",
                    "category": null,
                    "url": "/agreement/resumeWorkApply"
                },
                {
                    "route": "calcProductionSafety",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "安全生产费计量",
                    "id": "767f8ab988874a4aa88d20a0eb2204e6",
                    "category": null,
                    "url": "calcProductionSafety"
                },
                {
                    "route": "table-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "表格库-删除",
                    "id": "76d2ef6929ee487ba5f75c2d4ff79dc9",
                    "category": null,
                    "url": "table-delete"
                },
                {
                    "route": "sample-retain-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "留样台账-编辑",
                    "id": "770db0ac854842cbb2e703df33ae7d75",
                    "category": null,
                    "url": "sample-retain-edit"
                },
                {
                    "route": "menu-calqty-control-revise-list-error-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账错误数量调整列表-删除",
                    "id": "772a66645c81457a8611c8a8e1477bae",
                    "category": null,
                    "url": "menu-calqty-control-revise-list-error-delete"
                },
                {
                    "route": "staff-ledger-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员台账-编辑",
                    "id": "776be86794374aca888592e281a19fd9",
                    "category": null,
                    "url": "staff-ledger-edit"
                },
                {
                    "route": "sub-sample-ledger-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "试件台账-导出",
                    "id": "77bce8afc46b4447ad2a8372f7c0c47c",
                    "category": null,
                    "url": "sub-sample-ledger-export"
                },
                {
                    "route": "monthReport-construction-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工月报-编辑",
                    "id": "781bc4ec7c6d43aca7b27ecf9c9f3f5f",
                    "category": null,
                    "url": "monthReport-construction-edit"
                },
                {
                    "route": "riskEvaluate-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "危险源评估报告-提交",
                    "id": "78598bb51fe54e8e840d538f58084039",
                    "category": null,
                    "url": "riskEvaluate-submit"
                },
                {
                    "route": "videoAlarm-handle",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "摄像头管理-处理",
                    "id": "78dab27a269544e7838df215761fab0f",
                    "category": null,
                    "url": "videoAlarm-handle"
                },
                {
                    "route": "panorama",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "全景",
                    "id": "7952ba6c52d64be588d0413c9f5d6a53",
                    "category": null,
                    "url": "panorama"
                },
                {
                    "route": "document-article-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "通知公告-新增",
                    "id": "79be3b4df6604d3ca01b48d6472cc62c",
                    "category": null,
                    "url": "document-article-add"
                },
                {
                    "route": "experiment-selfCheck-dispose",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "自检-处理",
                    "id": "7b27556f699b4b7d93229caf30739d15",
                    "category": null,
                    "url": "experiment-selfCheck-dispose"
                },
                {
                    "route": "riskPlan-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "巡查计划管理-新增",
                    "id": "7b276263e86c4c42a2579e52c24a0629",
                    "category": null,
                    "url": "riskPlan-add"
                },
                {
                    "route": "resume-order-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令-编辑",
                    "id": "7b46388b18004ad9bf62f712d0282c00",
                    "category": null,
                    "url": "resume-order-edit"
                },
                {
                    "route": "delBoqTemp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单维护-删除",
                    "id": "7b8ab541e0f549ffa9662bc2107ae82a",
                    "category": null,
                    "url": "delBoqTemp"
                },
                {
                    "route": "question-Yzdw-Urge",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "业主单位隐患台账-催办",
                    "id": "7bd6d12523ce4b648d8f2a6c1f94cb84",
                    "category": null,
                    "url": "question-Yzdw-Urge"
                },
                {
                    "route": "monthReport-construction-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工月报-删除",
                    "id": "7c1bd91561d04aa88e0ab72f9a55365d",
                    "category": null,
                    "url": "monthReport-construction-delete"
                },
                {
                    "route": "material-rightAddEdit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "材料库-右侧新增编辑",
                    "id": "7ca195c760d14051a3f6be13c9246a57",
                    "category": null,
                    "url": "/experiment/materialDepot"
                },
                {
                    "route": "papresCreate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件监理-新增",
                    "id": "7ce29df1c1b84240a90369fcb5fdb29b",
                    "category": null,
                    "url": "papresCreate"
                },
                {
                    "route": "progress-actual-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实际进度管理-审核",
                    "id": "7d87b2a8828f4d2491b637ec1acae2fd",
                    "category": null,
                    "url": "progress-actual-audit"
                },
                {
                    "route": "paperReceive-flowConfig",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "收文管理-流程配置",
                    "id": "7df7afc15b9246c99242558946211d38",
                    "category": null,
                    "url": "paperReceive-flowConfig"
                },
                {
                    "route": "business-code-rule-consult-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "业务编码规则管理-编辑",
                    "id": "7e85248803f04ce7952568e2a9fc37ea",
                    "category": null,
                    "url": "business-code-rule-consult-edit"
                },
                {
                    "route": "materialUsageAddEdit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "材料使用台账-新增编辑",
                    "id": "7ecf31a32f4245b3867038f36dec4f8e",
                    "category": null,
                    "url": "/experiment/materialUsage"
                },
                {
                    "route": "quality-ensure-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-删除",
                    "id": "7f3d79401cf64278b9983683fd6ff4bc",
                    "category": null,
                    "url": "quality-ensure-del"
                },
                {
                    "route": "rquisition-expenses-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆费用台账-导入",
                    "id": "7f3e1b0e30ac4a4184f05d34082264a1",
                    "category": null,
                    "url": "rquisition-expenses-import"
                },
                {
                    "route": "sgPapresSave",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件施工-提交",
                    "id": "801efb1638e64111831ef2a20473ebf9",
                    "category": null,
                    "url": "sgPapresSave"
                },
                {
                    "route": "resumeWorkApply-recall",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工申请-撤回",
                    "id": "8052edfb9ea14c3a8efb2de27d2e1ab5",
                    "category": null,
                    "url": "resumeWorkApply-recall"
                },
                {
                    "route": "calqty-payment-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "期中支付-提交",
                    "id": "80875094b2b74942aa336c647f1371d0",
                    "category": null,
                    "url": "calqty-payment-operate"
                },
                {
                    "route": "norUser-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "非平台用户菜单-导入",
                    "id": "81799b84f48b4690a8feb1980c21aebc",
                    "category": null,
                    "url": "norUser-import"
                },
                {
                    "route": "startup-subitem-apply-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项开工申请-编辑",
                    "id": "81871309bd2f467a992933950e227563",
                    "category": null,
                    "url": "startup-subitem-apply-edit"
                },
                {
                    "route": "wbs-wbsManage-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "单元划分-启用",
                    "id": "8272c1240bc44bf8a10629befd46a1c1",
                    "category": null,
                    "url": "wbs-wbsManage-operate"
                },
                {
                    "route": "noncontraction-listAdjust-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整-删除",
                    "id": "82ad6f09034a45f1ad88f40483ff3c92",
                    "category": null,
                    "url": "noncontraction-listAdjust-del"
                },
                {
                    "route": "btn-assist-company-info",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "帮助与支持-单位信息变更",
                    "id": "8315b68476494a59b4e6b4328965a58c",
                    "category": null,
                    "url": "btn-assist-company-info"
                },
                {
                    "route": "menu-safe-risk-source-update-status",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "状态更新",
                    "id": "8348ad81e32943a0bca2f5cfdcc30f5e",
                    "category": null,
                    "url": "menu-safe-risk-source-update-status"
                },
                {
                    "route": "riskPlan-Abort",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "巡查计划管理-终止",
                    "id": "836d9f11157d42caae0122ff96474984",
                    "category": null,
                    "url": "riskPlan-Abort"
                },
                {
                    "route": "auditing-modify-report",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "中间计量汇总-审核修改情况",
                    "id": "83b9a981843d491a9e20694530518344",
                    "category": null,
                    "url": "auditing-modify-report"
                },
                {
                    "route": "menu-calc-ledger-divide-data-record-expand",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "数据录入-展开",
                    "id": "83e1f7d3b58c4787b7538d2d7279672c",
                    "category": null,
                    "url": "menu-calc-ledger-divide-data-record-expand"
                },
                {
                    "route": "questionSgdwExport",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工单位隐患台账- 导出列表",
                    "id": "867b2f120b5e4dbfa079ca30a493736d",
                    "category": null,
                    "url": "questionSgdwExport"
                },
                {
                    "route": "hundredCalcList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "100章清单计量",
                    "id": "86a82e0e91b74811801b962db37e974a",
                    "category": null,
                    "url": "hundredCalcList"
                },
                {
                    "route": "btn-claimIssue",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "延期索赔管理-签发",
                    "id": "870d1b2d7e5845a3b58a3743fa5d3d73",
                    "category": null,
                    "url": "/btn-claimIssue"
                },
                {
                    "route": "sample-rightAddEdit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品库-右侧新增编辑",
                    "id": "877ce1a5fa944595a4ebbab8317284fd",
                    "category": null,
                    "url": "/experiment/sampleDepot"
                },
                {
                    "route": "menu-safe-risk-source-check-record",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "巡查记录",
                    "id": "882209b9b9d5499e9aade41633b179a1",
                    "category": null,
                    "url": "menu-safe-risk-source-check-record"
                },
                {
                    "route": "progress-actual-report",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实际进度管理-进度上报",
                    "id": "882734edc3eb46d09667be7f1c541c34",
                    "category": null,
                    "url": "progress-actual-report"
                },
                {
                    "route": "glManpower-attendance-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤段设定-新增",
                    "id": "8891e43071f9475988fad5519da52013",
                    "category": null,
                    "url": "glManpower-attendance-add"
                },
                {
                    "route": "qp-obsolete-GXYS-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-监理抽检-驳回",
                    "id": "88ee4a45ac8f4fd49c0f9e49dd177031",
                    "category": null,
                    "url": "qp-obsolete-GXYS-JL"
                },
                {
                    "route": "standard-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-标准库-新增",
                    "id": "89155905d8124358b89dbac8ffc1aa6a",
                    "category": null,
                    "url": "standard-add"
                },
                {
                    "route": "/agreement/engineering/resumeWorkOrder",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令",
                    "id": "892b6c0662304ce0aa3f63d93833e0ef",
                    "category": null,
                    "url": "/agreement/engineering/resumeWorkOrder"
                },
                {
                    "route": "projectCalc",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程计量",
                    "id": "897af4f5a38e47ae8554139bf70d1782",
                    "category": null,
                    "url": "projectCalc"
                },
                {
                    "route": "schemeToEntity-onExport",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库-导出",
                    "id": "89d5e57aca20478da278bf126000d8b1",
                    "category": null,
                    "url": "schemeToEntity-onExport"
                },
                {
                    "route": "balance_recordDetail",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "交工-审核详情",
                    "id": "89d8aa2e73d94448b60834919e4f5cbf",
                    "category": null,
                    "url": "balance_recordDetail"
                },
                {
                    "route": "dailyCalculate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计日工计量",
                    "id": "8a2fcaad5c894b4e901649c7503de135",
                    "category": null,
                    "url": "/projectCalc/dailyCalculate"
                },
                {
                    "route": "adjust-detail-auditRecord",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整详情-审核修改记录",
                    "id": "8a6cf760e958498f9240983fa6c7d74c",
                    "category": null,
                    "url": "adjust-detail-auditRecord"
                },
                {
                    "route": "circulation-ledger-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "流转台账-导出",
                    "id": "8a8d975174a747f4a666978200129abe",
                    "category": null,
                    "url": "circulation-ledger-export"
                },
                {
                    "route": "sample-retain-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "留样台账-导出",
                    "id": "8ad02b27465a4496b7adec233f8e1080",
                    "category": null,
                    "url": "sample-retain-export"
                },
                {
                    "route": "paperSend-finish",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "发文管理-办结",
                    "id": "8bb52009240741fe85862a8786daa010",
                    "category": null,
                    "url": "paperSend-finish"
                },
                {
                    "route": "document-menu-law-project-move",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-项目库移库",
                    "id": "8d1e721569f44a7b9535d2eb845668d3",
                    "category": null,
                    "url": "document-menu-law-project-move"
                },
                {
                    "route": "paperReceive-check",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "收文管理-签收",
                    "id": "8d491882454a488cb749848a423b4f7e",
                    "category": null,
                    "url": "paperReceive-check"
                },
                {
                    "route": "wbsCost-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "造价扩展单元维护-操作按钮",
                    "id": "8d80b995542a45d986ffe7f69dd0cf52",
                    "category": null,
                    "url": "wbsCost-operate"
                },
                {
                    "route": "consult-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "延期索赔参数设置-编辑",
                    "id": "8d83aa6e48a1486a9de43ff0502aa5fb",
                    "category": null,
                    "url": "/consult-edit"
                },
                {
                    "route": "sample-ledger-part",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-留样",
                    "id": "8e98d9fa958f49fb89a24175596e1f1a",
                    "category": null,
                    "url": "sample-ledger-part"
                },
                {
                    "route": "noncontration-adjust-detail-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整详情-审核",
                    "id": "8ec5e6be98eb48aba1a0fad31e24e9c9",
                    "category": null,
                    "url": "noncontration-adjust-detail-audit"
                },
                {
                    "route": "staff-ledger-back",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员台账-撤回",
                    "id": "8ed3045c5d954f67a403f1077736d322",
                    "category": null,
                    "url": "staff-ledger-back"
                },
                {
                    "route": "subItem-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项库-编辑",
                    "id": "8edd55c657f643b8ad2b27a628a43a21",
                    "category": null,
                    "url": "subItem-edit"
                },
                {
                    "route": "projectToEntity-modify",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体类型-编辑",
                    "id": "8ef61ebf71da45fc8a141e530ab79849",
                    "category": null,
                    "url": "projectToEntity-modify"
                },
                {
                    "route": "experiment-spotCheck-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "抽检-新增编辑删除",
                    "id": "8f8eb6b7f470444a951034d7fb70b623",
                    "category": null,
                    "url": "experiment-spotCheck-add"
                },
                {
                    "route": "document-menu-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-创建通用库",
                    "id": "8fd2a8a648ed4b7aa8849183d05cc0bd",
                    "category": null,
                    "url": "document-menu-add"
                },
                {
                    "route": "startup-contract-apply-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工申请-删除",
                    "id": "9020062e67e1444faa568aa13a7c7ad9",
                    "category": null,
                    "url": "startup-contract-apply-delete"
                },
                {
                    "route": "rquisition-check-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-清点台账记录-新增",
                    "id": "904b15c4acb741c896c22d2a13af8104",
                    "category": null,
                    "url": "rquisition-check-add"
                },
                {
                    "route": "resumeWorkApply-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工申请-审核",
                    "id": "90cce7a77c194aa4bcc81155022f7099",
                    "category": null,
                    "url": "resumeWorkApply-audit"
                },
                {
                    "route": "entity-range",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-计量范围",
                    "id": "9161026af9a74a63a4b90e8cb8ab753e",
                    "category": null,
                    "url": "entity-range"
                },
                {
                    "route": "importBoqTemp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单维护-导入",
                    "id": "9205190c16b449a2bbd4201b8f9a90b1",
                    "category": null,
                    "url": "importBoqTemp"
                },
                {
                    "route": "quality-ensure-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-提交",
                    "id": "92127066c85e4291b8985c6718c4d8c9",
                    "category": null,
                    "url": "quality-ensure-submit"
                },
                {
                    "route": "exportBoqTemp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单维护-导出",
                    "id": "9220587796cc41e3900296019900f7bc",
                    "category": null,
                    "url": "exportBoqTemp"
                },
                {
                    "route": "agreement-tender-cateory",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "招标台账-招标工程类别设置",
                    "id": "934f34a8f32a4a728b33a6c90309d5b8",
                    "category": null,
                    "url": "agreement-tender-cateory"
                },
                {
                    "route": "startup-contract-standbook",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段统计-表单联查",
                    "id": "955157dadc6f41b4b0cdc2de15064775",
                    "category": null,
                    "url": "startup-contract-standbook"
                },
                {
                    "route": "quality",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "隐患排查",
                    "id": "97875ce54163464f8823281ce9823d75",
                    "category": null,
                    "url": "quality"
                },
                {
                    "route": "stopWorkOrder-issue",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令-签发",
                    "id": "98086f59c2e94c10b4187a006e3dbc57",
                    "category": null,
                    "url": "stopWorkOrder-issue"
                },
                {
                    "route": "riskPlan-update",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "巡查计划管理-编辑",
                    "id": "9838c1f83cb441d0a2551ce0a2673fbb",
                    "category": null,
                    "url": "riskPlan-update"
                },
                {
                    "route": "material-leftAddEdit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "材料库-左侧新增编辑",
                    "id": "9852649c4f354c68aaf99afc5c475676",
                    "category": null,
                    "url": "/experiment/materialDepot"
                },
                {
                    "route": "sgPapresDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件施工-删除",
                    "id": "98b850b9ab9d4eed9314fe3ed17faa3c",
                    "category": null,
                    "url": "sgPapresDelete"
                },
                {
                    "route": "resumeWorkApply-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工申请-删除",
                    "id": "98d98f25ed3443d0b81f171ec8f8a48e",
                    "category": null,
                    "url": "resumeWorkApply-del"
                },
                {
                    "route": "/attendance/personal/ready",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤基准照片",
                    "id": "9939dd22be0e455895bee04fc2a94ed4",
                    "category": null,
                    "url": "/attendance/personal/ready"
                },
                {
                    "route": "dailyLog-master-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-业主日志-编辑",
                    "id": "998cde89fa2441a19f48ac2d1c3372c2",
                    "category": null,
                    "url": "dailyLog-master-edit"
                },
                {
                    "route": "coordinate-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "逐桩坐标-删除",
                    "id": "99c01182f949447cacd681fe80bed1ea",
                    "category": null,
                    "url": "coordinate-del"
                },
                {
                    "route": "menu-ledger-divide-data-record-add-project",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "数据录入-新增项目节",
                    "id": "99c6c0e8155c4bf5a7a74a3d29ce9865",
                    "category": null,
                    "url": "menu-ledger-divide-data-record-add-project"
                },
                {
                    "route": "resume-order-withdraw",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工指令-撤回",
                    "id": "9a979015bfce4dc88acbee93b3fe473e",
                    "category": null,
                    "url": "resume-order-withdraw"
                },
                {
                    "route": "noncontraction-listAdjust-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整-提交",
                    "id": "9b5e711de0e745c7b8acd428e6af96d9",
                    "category": null,
                    "url": "noncontraction-listAdjust-submit"
                },
                {
                    "route": "staff-ledger-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员台账-新增",
                    "id": "9bb9b02aea9e4a1e8404b3aad91efb1a",
                    "category": null,
                    "url": "staff-ledger-add"
                },
                {
                    "route": "bim-progress",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实景-功能-进度管理",
                    "id": "9bd77a5fa05740e180e52799384658f2",
                    "category": null,
                    "url": "bim-progress"
                },
                {
                    "route": "menu-ledger-add-project",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-新增项目节",
                    "id": "9c344295d61b4a90956a1b99cae7971d",
                    "category": null,
                    "url": "menu-ledger-add-project"
                },
                {
                    "route": "papresUpdate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件监理-编辑",
                    "id": "9c7f4f3f11e9487c8a61d7d8464361e2",
                    "category": null,
                    "url": "papresUpdate"
                },
                {
                    "route": "noncontration-totalPayment-unLock",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "总额支付设置-解锁",
                    "id": "9c9b5a72fb524a0d8a690b47cf9faef9",
                    "category": null,
                    "url": "noncontration-totalPayment-unLock"
                },
                {
                    "route": "menu-calqty-control-revise-list-error-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账错误数量调整列表-编辑",
                    "id": "9d9def27e1b04ecb808a0c100ad96282",
                    "category": null,
                    "url": "menu-calqty-control-revise-list-error-edit"
                },
                {
                    "route": "subItem-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项库-导出",
                    "id": "9deda6671f4044d297d2c0dc15c41860",
                    "category": null,
                    "url": "subItem-export"
                },
                {
                    "route": "day-work-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计日工台账-删除",
                    "id": "9e4880bbf6394eeeb44344a729dd2ebe",
                    "category": null,
                    "url": "day-work-delete"
                },
                {
                    "route": "checkLedger_checkConfirm",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "检定校准台账-检定校准确认",
                    "id": "9e8d9254f6d148779fe7bfc1356c462c",
                    "category": null,
                    "url": "checkLedger_checkConfirm"
                },
                {
                    "route": "startup-firstitem-check-apply-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件验收—编辑",
                    "id": "9ec625e28c364a6281115fa9fb97a463",
                    "category": null,
                    "url": "startup-firstitem-check-apply-edit"
                },
                {
                    "route": "question-Jldw-Invalid",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理单位隐患台账-作废",
                    "id": "9ecceca6c89c4a7c8a5b4287853fa6d2",
                    "category": null,
                    "url": "question-Jldw-Invalid"
                },
                {
                    "route": "menu-safe-risk-source-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "重大危险源管理-导出",
                    "id": "9ed59cc1b6f64cd493b1b855f869297f",
                    "category": null,
                    "url": "menu-safe-risk-source-export"
                },
                {
                    "route": "areaMark",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "区域标识",
                    "id": "9efe53b884b04770bcd2156e369cc9e2",
                    "category": null,
                    "url": "areaMark"
                },
                {
                    "route": "jlCheckCreate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查监理-新增",
                    "id": "a075b66438bd48d2972ff5e22ad8ff1c",
                    "category": null,
                    "url": "jlCheckCreate"
                },
                {
                    "route": "PersonStanderdBook",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员台账",
                    "id": "a13b8268746c41408f069ce5a7e3d951",
                    "category": null,
                    "url": "/safe/staffLedger/staffLedger"
                },
                {
                    "route": "experiment-ensure-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-质量保证体系-新增",
                    "id": "a1919e847ebb44f7b5da66089759a80a",
                    "category": null,
                    "url": "experiment-ensure-add"
                },
                {
                    "route": "qp-audit-ZLPD-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-监理抽检-审核",
                    "id": "a193e9e149654e83a2c68b26c13ff5c8",
                    "category": null,
                    "url": "qp-audit-ZLPD-JL"
                },
                {
                    "route": "startup-contract-command-signIn",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工令-签收",
                    "id": "a1da5b572c5040c7aafcb54b73817509",
                    "category": null,
                    "url": "startup-contract-command-signIn"
                },
                {
                    "route": "material-rightDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "材料库-右侧删除",
                    "id": "a1e318d3687a4debbc1604d59e8ee332",
                    "category": null,
                    "url": "/experiment/materialDepot"
                },
                {
                    "route": "menu-calqty-control-revise-error-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账错误数量调整-引入台账",
                    "id": "a21793f2c91446f4a118dea19577ce4b",
                    "category": null,
                    "url": "menu-calqty-control-revise-error-import"
                },
                {
                    "route": "experiment-ensure-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-质量保证体系-导出",
                    "id": "a2ae726fa5d94fcf9c30e604dc3dc307",
                    "category": null,
                    "url": "experiment-ensure-export"
                },
                {
                    "route": "menu-calc-ledger-divide-introduce-entity",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-引入实体单元",
                    "id": "a2c6ece31ece47c3bea7d13d6187e3b0",
                    "category": null,
                    "url": "menu-calc-ledger-divide-introduce-entity"
                },
                {
                    "route": "experiment-workConnectLedger-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工作联系单台账-删除",
                    "id": "a2ebcfe8cd824532b265b8f67f9227a2",
                    "category": null,
                    "url": "experiment-workConnectLedger-del"
                },
                {
                    "route": "norUser-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "非平台用户菜单-导出",
                    "id": "a34203c6418644bebf4b3a377af78618",
                    "category": null,
                    "url": "norUser-export"
                },
                {
                    "route": "entity-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-删除",
                    "id": "a485e2e74ed446a891012ec43e25ee66",
                    "category": null,
                    "url": "entity-del"
                },
                {
                    "route": "question-Yzdw-Export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "业主单位隐患台账-导出列表",
                    "id": "a4dd3e6b65b242b6958171cee07591c6",
                    "category": null,
                    "url": "question-Yzdw-Export"
                },
                {
                    "route": "sample-ledger-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-编辑",
                    "id": "a5b4c39612d54be1b70faed14404aa18",
                    "category": null,
                    "url": "sample-ledger-edit"
                },
                {
                    "route": "calRangeLib-menu-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量范围库-导出",
                    "id": "a5b98851ad59479abf3c67ead31ae1c1",
                    "category": null,
                    "url": "calRangeLib-menu-export"
                },
                {
                    "route": "xmj-import-contract",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目节-引入其他合同段项目节库",
                    "id": "a5e23e28961a441da1c1cb3a0f6885e0",
                    "category": null,
                    "url": "xmj-import-contract"
                },
                {
                    "route": "menu-safe-risk-source-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "重大危险源管理-删除",
                    "id": "a5f149e7c75e49e8876344db7995bf16",
                    "category": null,
                    "url": "menu-safe-risk-source-delete"
                },
                {
                    "route": "exp-standard-lib-tree-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-标准库-目录树删除",
                    "id": "a612c9f3c162401e9876bf86b7b04471",
                    "category": null,
                    "url": "exp-standard-lib-tree-del"
                },
                {
                    "route": "menu-sub-option-calculate-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项完工计量-提交",
                    "id": "a61f17ec1d834b36b23f3020c3a2f1b4",
                    "category": null,
                    "url": "menu-sub-option-calculate-submit"
                },
                {
                    "route": "calRangeLib-menu-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量范围库-导入",
                    "id": "a65e6366b5bc4b81bd604bf72302203a",
                    "category": null,
                    "url": "calRangeLib-menu-import"
                },
                {
                    "route": "noncontration-totalPayment-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "总额支付设置-删除",
                    "id": "a66a29a51ee64364a02c29959763b561",
                    "category": null,
                    "url": "noncontration-totalPayment-del"
                },
                {
                    "route": "qp-annex-ZLPD",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-其它附件按钮",
                    "id": "a6bb27afe22d4b69910593054db302b7",
                    "category": null,
                    "url": "qp-annex-ZLPD"
                },
                {
                    "route": "document-menu-project-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-创建项目库",
                    "id": "a7418d0952da4988ab9fc395824e0aed",
                    "category": null,
                    "url": "document-menu-project-add"
                },
                {
                    "route": "startup-contract-command-signOut",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工令-签发",
                    "id": "a74446582f99465ca9c8b3f1fc810d2a",
                    "category": null,
                    "url": "startup-contract-command-signOut"
                },
                {
                    "route": "apparatus-authority",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "设备管理-授权",
                    "id": "a755df4cf9ca4679952ab4f18f92fc11",
                    "category": null,
                    "url": "apparatus-authority"
                },
                {
                    "route": "qp-export-GXYS-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-监理抽检-导出",
                    "id": "a7bacd9900884420ae231b76326f6e03",
                    "category": null,
                    "url": "qp-export-GXYS-JL"
                },
                {
                    "route": "listAdjust-menu-auditHistory",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "新增清单及总额清单调整-审批记录",
                    "id": "a80fbb8f9f444eb8afe95b1a45a42a2d",
                    "category": null,
                    "url": "listAdjust-menu-auditHistory"
                },
                {
                    "route": "calqty-contractList-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同工程量清单-导入",
                    "id": "a8c7281631834d3c8489c9c9bd7fa39e",
                    "category": null,
                    "url": "calqty-contractList-import"
                },
                {
                    "route": "progress-plan-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计划管理-删除",
                    "id": "a8c972893d6943d881a22e97a95804ab",
                    "category": null,
                    "url": "progress-plan-del"
                },
                {
                    "route": "agreement-tender-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "招标台账-编辑",
                    "id": "a8f3e0d0fab54f9d9a6e0bd55812414b",
                    "category": null,
                    "url": "agreement-tender-edit"
                },
                {
                    "route": "noncontraction-listAdjust-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整-新增",
                    "id": "aa0069e7e04d4112a7788d184307183f",
                    "category": null,
                    "url": "noncontraction-listAdjust-add"
                },
                {
                    "route": "rquisition-ledger-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-征拆记录-删除",
                    "id": "aa0124714dbe44328ed3ce6c93591d59",
                    "category": null,
                    "url": "rquisition-ledger-delete"
                },
                {
                    "route": "qp-st-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-编辑节段",
                    "id": "aa285bcda6954e28b3c85f01e5f1079a",
                    "category": null,
                    "url": "qp-st-edit"
                },
                {
                    "route": "quality-register-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量责任登记-删除",
                    "id": "aa94d766307f4edcae11ccab8eda2470",
                    "category": null,
                    "url": "quality-register-del"
                },
                {
                    "route": "noncontration-totalPayment-lock",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "总额支付设置-锁定",
                    "id": "aafeab6fa74a49959d7100b6e0ed5339",
                    "category": null,
                    "url": "noncontration-totalPayment-lock"
                },
                {
                    "route": "stopWorkOrder-nullify",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令-作废",
                    "id": "ab409f3f0e534872bb343873d3c64855",
                    "category": null,
                    "url": "stopWorkOrder-nullify"
                },
                {
                    "route": "dailyLog-constructor-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-施工日志-编辑",
                    "id": "ac0466620ed14b3b99fd3a3d675410b6",
                    "category": null,
                    "url": "dailyLog-constructor-edit"
                },
                {
                    "route": "calqty-payment-term-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "支付期设置-删除",
                    "id": "ac8846f4306b44b69761c0337a86c632",
                    "category": null,
                    "url": "calqty-payment-term-delete"
                },
                {
                    "route": "startup-contract-apply-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工申请-审核",
                    "id": "acc6f0f968c54bb7a7032f15839cac9f",
                    "category": null,
                    "url": "startup-contract-apply-audit"
                },
                {
                    "route": "sample-leftDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品库-左侧删除",
                    "id": "acc76d8befe1445c8a2f5eedd8e94db5",
                    "category": null,
                    "url": "/experiment/sampleDepot"
                },
                {
                    "route": "contractManage-ContractTypeEdit-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同类型配置-新增",
                    "id": "ae0329cd7f0a4b1abe4058c141d8fc57",
                    "category": null,
                    "url": "contractManage-ContractTypeEdit-add"
                },
                {
                    "route": "menu-calc-ledger-divide-data-record-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "数据录入-导出",
                    "id": "ae43b46fd6e44d16b09a23a9c3f607d2",
                    "category": null,
                    "url": "menu-calc-ledger-divide-data-record-export"
                },
                {
                    "route": "calqty-payment-term-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "支付期设置-新增编辑",
                    "id": "ae43fb58c1304d2480676c175a5b515d",
                    "category": null,
                    "url": "calqty-payment-term-operate"
                },
                {
                    "route": "startup-firstitem-apply-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件开工—删除",
                    "id": "ae6c03c914424f5ab9b8bd8443aad6d6",
                    "category": null,
                    "url": "startup-firstitem-apply-delete"
                },
                {
                    "route": "specialCheck",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查",
                    "id": "aeb4bf8bea8e4c08935fcbd902a16ced",
                    "category": null,
                    "url": "/envprotection/specialCheck"
                },
                {
                    "route": "/agreement/tender/viewTender",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "招标台账-查看",
                    "id": "aed6d71865e1449696d3acdff3600ded",
                    "category": null,
                    "url": "/agreement/tender/viewTender"
                },
                {
                    "route": "calcTermSet",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量期设置",
                    "id": "aee9c519bb974d33b66c88f890d7bc61",
                    "category": null,
                    "url": "/projectCalc/calcTermSet/calcTermSet"
                },
                {
                    "route": "startup-contract-apply-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工申请-提交",
                    "id": "af283786d83f4cec88a0a6bef651de78",
                    "category": null,
                    "url": "startup-contract-apply-submit"
                },
                {
                    "route": "schemeToEntity-linkSubItem",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库-关联分项",
                    "id": "af40d9a36cf24c4e9c298b222314ba84",
                    "category": null,
                    "url": "schemeToEntity-linkSubItem"
                },
                {
                    "route": "home-worktab-bim",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "左侧实景按钮",
                    "id": "afbdeeedf21c47d1bbbddc8edecc4d4e",
                    "category": null,
                    "url": "home-worktab-bim"
                },
                {
                    "route": "bim-quality",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实景-质量管理",
                    "id": "afd890f13e574235abeb8977e26bd198",
                    "category": null,
                    "url": "bim-quality"
                },
                {
                    "route": "experiment-report-invalid",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "报告台账-作废",
                    "id": "afddecf2f40c419abfdfcec7d1d41a99",
                    "category": null,
                    "url": "experiment-report-invalid"
                },
                {
                    "route": "quality-ensure-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-导出",
                    "id": "b01f85b5efdf4e55a2223f5ae80ee2c3",
                    "category": null,
                    "url": "quality-ensure-export"
                },
                {
                    "route": "document-menu-tree-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-通用库树删除",
                    "id": "b026aedac93342918a2fa5f5e99d4f49",
                    "category": null,
                    "url": "document-menu-tree-delete"
                },
                {
                    "route": "experiment-report-grant",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "报告台账-发放",
                    "id": "b0354127548045b3aba208c8ec15d254",
                    "category": null,
                    "url": "experiment-report-grant"
                },
                {
                    "route": "standard-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-标准库-删除",
                    "id": "b080c7b7b39d42d0a94963bda1fc881a",
                    "category": null,
                    "url": "standard-del"
                },
                {
                    "route": "questionHandle",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "隐患排查- 待办事项-处理",
                    "id": "b09b4638bc774e04ba9d8884df4e8187",
                    "category": null,
                    "url": "questionHandle"
                },
                {
                    "route": "qp-ZLPD-JL-write",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-监理抽检-表格库",
                    "id": "b0a0e5c97ec446499af90320e0f085ba",
                    "category": null,
                    "url": "qp-ZLPD-JL-write"
                },
                {
                    "route": "exp-standard-lib-tree-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-标准库-目录树编辑",
                    "id": "b0fb24b1b127456c9bbb3fafc811747a",
                    "category": null,
                    "url": "exp-standard-lib-tree-edit"
                },
                {
                    "route": "dailyLog-siteSupervisor-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-现场监理日志-提交",
                    "id": "b16f40ac47274e4e89d1c1011589d43b",
                    "category": null,
                    "url": "dailyLog-siteSupervisor-submit"
                },
                {
                    "route": "qp-st-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-新增节段",
                    "id": "b1edda3bc69d4c09ad847b3d582007a7",
                    "category": null,
                    "url": "qp-st-add"
                },
                {
                    "route": "questionDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "隐患排查- 删除",
                    "id": "b325252ce033433d8096195193c14fd3",
                    "category": null,
                    "url": "questionDelete"
                },
                {
                    "route": "exportFormulaLib",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公式库-导出",
                    "id": "b3513c3810674ce6bf2e744a69786e54",
                    "category": null,
                    "url": "exportFormulaLib"
                },
                {
                    "route": "contractManage-ledger-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同台账-新增",
                    "id": "b3613418eac2401bb8f69727aa15ee9d",
                    "category": null,
                    "url": "contractManage-ledger-add"
                },
                {
                    "route": "contractManage-StandardCost-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "标准费用设置-保存",
                    "id": "b4146308777a4ecb9fb76a398bde2424",
                    "category": null,
                    "url": "contractManage-StandardCost-add"
                },
                {
                    "route": "/qualityManage/qualityRegisterTable",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量责任登记",
                    "id": "b4d4fb992b91429cae6262fe2889442e",
                    "category": null,
                    "url": "/qualityManage/qualityRegisterTable"
                },
                {
                    "route": "btn-claimAbolish",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "延期索赔管理-废弃意见书",
                    "id": "b571b0e4fa51489886e0f00b00a19742",
                    "category": null,
                    "url": "/btn-claimAbolish"
                },
                {
                    "route": "projectToEntity-importScheme",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目实体库-引入其他合同段实体类型库",
                    "id": "b5cf42b16831470eb6c4219edd1c3995",
                    "category": null,
                    "url": "projectToEntity-importScheme"
                },
                {
                    "route": "entity-mobile",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-移动",
                    "id": "b63c42f2d6a84b1ba284cdde0e59d936",
                    "category": null,
                    "url": "entity-mobile"
                },
                {
                    "route": "safe-risk-questionAdd",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "web危险源-发单",
                    "id": "b67571cd06064b4bb060300a8b416659",
                    "category": null,
                    "url": "safe-risk-questionAdd"
                },
                {
                    "route": "menu-calc-ledger-divide-data-record-add-entity",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "数据录入-新增实体单元",
                    "id": "b849a155d7dc4cee9fc64935f37f4b0d",
                    "category": null,
                    "url": "menu-calc-ledger-divide-data-record-add-entity"
                },
                {
                    "route": "staff-ledger-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员台账-导入",
                    "id": "b893a103f4424b7fbcee503c6edb86ca",
                    "category": null,
                    "url": "staff-ledger-import"
                },
                {
                    "route": "material-leftDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "材料库-左侧删除",
                    "id": "b8ce834b86a64302bc47e72e22628d6d",
                    "category": null,
                    "url": "/experiment/materialDepot"
                },
                {
                    "route": "calqty-subitem-set",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量分项设置-设置计量分项",
                    "id": "b8e56ef669c2425c814c74375b0e3e3a",
                    "category": null,
                    "url": "calqty-subitem-set"
                },
                {
                    "route": "xmj-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目节-删除",
                    "id": "b94acf5f052f4314ba11d2bf68f5456d",
                    "category": null,
                    "url": "xmj-delete"
                },
                {
                    "route": "document-menu-law-move",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-通用库移库",
                    "id": "b9544a342fc042d9b7c254087113eb1a",
                    "category": null,
                    "url": "document-menu-law-move"
                },
                {
                    "route": "riskEvaluate-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "危险源评估报告-删除",
                    "id": "ba0fbecc6b4f4609a5e9eb4eff9983c9",
                    "category": null,
                    "url": "riskEvaluate-delete"
                },
                {
                    "route": "xmj-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目节-新增",
                    "id": "ba22a4c3461a442687a3291bd52b9200",
                    "category": null,
                    "url": "xmj-add"
                },
                {
                    "route": "menu-calc-ledger-divide-data-record-copy",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "数据录入-复制",
                    "id": "bad74ca506d14d40be8911b28a60f5cf",
                    "category": null,
                    "url": "menu-calc-ledger-divide-data-record-copy"
                },
                {
                    "route": "element-exportAllQRCode",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件全部二维码",
                    "id": "bad88e6ecd3c45b086f2eba1e9651877",
                    "category": null,
                    "url": "element-exportAllQRCode"
                },
                {
                    "route": "experiment-selfCheck-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "自检-提交",
                    "id": "baea2e67324340018d0fd9fb2f960af5",
                    "category": null,
                    "url": "experiment-selfCheck-submit"
                },
                {
                    "route": "menu-calc-detail-list-gather-expand",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-清单汇总格式展开",
                    "id": "bb3cf3a16e2c486c91140d1bb8655f6e",
                    "category": null,
                    "url": "menu-calc-detail-list-gather-expand"
                },
                {
                    "route": "experiment-parameter-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "试验参数库-操作按钮",
                    "id": "bb44f7c75ec34530ab69958eb592d5ab",
                    "category": null,
                    "url": "experiment-parameter-operate"
                },
                {
                    "route": "menu-calc-detail-list-chapter-gather-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-清单章节汇总导出",
                    "id": "bbe5cb37db394d08bb8cc97a6ee4db44",
                    "category": null,
                    "url": "menu-calc-detail-list-chapter-gather-export"
                },
                {
                    "route": "qp-ZLPD-SG-write",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-施工自检-表格库",
                    "id": "bc014e0e49134958a213675310dbe3be",
                    "category": null,
                    "url": "qp-ZLPD-SG-write"
                },
                {
                    "route": "delFormulaLib",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公式库-删除",
                    "id": "bc12ccaaf8614691b1fc5d7679f8858c",
                    "category": null,
                    "url": "delFormulaLib"
                },
                {
                    "route": "startup-firstitem-apply-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件开工—审核",
                    "id": "bcbcb8f755794897953b43d66328fa86",
                    "category": null,
                    "url": "startup-firstitem-apply-audit"
                },
                {
                    "route": "sjjda",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实际进度",
                    "id": "bec265bf073c4d558e24e800b2ae5495",
                    "category": null,
                    "url": "sjjda"
                },
                {
                    "route": "entity-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-导入",
                    "id": "bfe77e219d76463ba1ebf551f716127a",
                    "category": null,
                    "url": "entity-import"
                },
                {
                    "route": "qp-audit-GXYS-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-监理抽检-审核",
                    "id": "c00ef840c2eb4b06968a81c45ef0c46a",
                    "category": null,
                    "url": "qp-audit-GXYS-JL"
                },
                {
                    "route": "question/ledger/sgdw",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工单位隐患台账",
                    "id": "c04212ebe49e4af3b969f737329f8ed9",
                    "category": null,
                    "url": "question/ledger/sgdw"
                },
                {
                    "route": "experiment-record-invalid",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "记录表台账-作废",
                    "id": "c10f20b427c54f5192912bfb1cb49066",
                    "category": null,
                    "url": "experiment-record-invalid"
                },
                {
                    "route": "startup-firstitem-command-resolve",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件开工令-撤回",
                    "id": "c11e089c44ba4112b1f6cbae390eb47a",
                    "category": null,
                    "url": "startup-firstitem-command-resolve"
                },
                {
                    "route": "upgradeBoqTemp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单维护-升级",
                    "id": "c264d8d0fc984a7496ae45fea6f03c99",
                    "category": null,
                    "url": "upgradeBoqTemp"
                },
                {
                    "route": "safety-technology-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项施工方案管理-删除",
                    "id": "c354c5ebb0c649718d41ce2c847ee33f",
                    "category": null,
                    "url": "safety-technology-delete"
                },
                {
                    "route": "element-exportQRCode",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件导出二维码",
                    "id": "c4e6bd6917784627b4a5fd35eb97006c",
                    "category": null,
                    "url": "element-exportQRCode"
                },
                {
                    "route": "experiment-workConnectLedger-cancelled",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工作联系单台账-作废",
                    "id": "c50452b332df4981a1bf4f4f5337af32",
                    "category": null,
                    "url": "experiment-workConnectLedger-cancelled"
                },
                {
                    "route": "menu-calc-ledger-divide-assign-task",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-分配任务",
                    "id": "c541566e538f4f2c8d5d4cc8014107cd",
                    "category": null,
                    "url": "menu-calc-ledger-divide-assign-task"
                },
                {
                    "route": "sgPapresCreate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件施工-新增",
                    "id": "c54a2cf809db4862a8bc2bdbd6c3c7e7",
                    "category": null,
                    "url": "sgPapresCreate"
                },
                {
                    "route": "commonListCalc",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "普通清单计量",
                    "id": "c57ee711070f4353bc1c2e46cc6c396e",
                    "category": null,
                    "url": "/projectCalc/commonListCalc"
                },
                {
                    "route": "riskEvaluate-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "危险源评估报告-审核",
                    "id": "c71b7d90d0024f3396a4a2a79b6e590c",
                    "category": null,
                    "url": "riskEvaluate-audit"
                },
                {
                    "route": "papers",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件",
                    "id": "c75d7878a3c64e72ac7b37968e6a14aa",
                    "category": null,
                    "url": "/envprotection/papers"
                },
                {
                    "route": "paper-ledger-tree-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公文台账-公文树删除",
                    "id": "c894d9c6d4744547b4f4309defd9e224",
                    "category": null,
                    "url": "paper-ledger-tree-delete"
                },
                {
                    "route": "startup-contract-notice-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工通知-删除",
                    "id": "c8c88c40fbb84c79991b418be2bffc81",
                    "category": null,
                    "url": "startup-contract-notice-delete"
                },
                {
                    "route": "scheme-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库列表-编辑",
                    "id": "c8ff7cf10b8942f99d0fe9189ee29c47",
                    "category": null,
                    "url": "scheme-edit"
                },
                {
                    "route": "sample-ledger-add-specimen",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-新增-试件类",
                    "id": "c940aff303274cd882a95da2350aca16",
                    "category": null,
                    "url": "sample-ledger-add-specimen"
                },
                {
                    "route": "firstControlCalculate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首期控制计量",
                    "id": "c96d82497e5b43ebb95048b9c33ac19e",
                    "category": null,
                    "url": "/calqty/firstControlCalculate"
                },
                {
                    "route": "bim-calculate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实景-计量支付",
                    "id": "c98eca01d4ac4719bf9dcea5b6be591a",
                    "category": null,
                    "url": "bim-calculate"
                },
                {
                    "route": "questionEdit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "隐患排查- 编辑",
                    "id": "c9a1d9b9e77f46a39bcf3abb845d131e",
                    "category": null,
                    "url": "questionEdit"
                },
                {
                    "route": "calqty-control-menu-revise",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "控制计量报审-申报计量",
                    "id": "c9b0993ac09b41a998758a78cf9963ea",
                    "category": null,
                    "url": "calqty-control-menu-revise"
                },
                {
                    "route": "dailyLog-master-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-业主日志-批量导出",
                    "id": "c9b5375e2f4b4f3da42a041a3cd457a8",
                    "category": null,
                    "url": "dailyLog-master-export"
                },
                {
                    "route": "questionJldwExport",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理单位隐患台账- 导出列表",
                    "id": "c9b6cecdb43b41ab93eb787ce69d7231",
                    "category": null,
                    "url": "questionJldwExport"
                },
                {
                    "route": "realScene_add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实景数据管理操作按钮",
                    "id": "ca06267affeb4ab3acc3e498f0c98df6",
                    "category": null,
                    "url": "realScene_add"
                },
                {
                    "route": "experiment-report-dispose",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "报告台账-处理",
                    "id": "ca08fbd07be341a5b0a31f83888449e5",
                    "category": null,
                    "url": "experiment-report-dispose"
                },
                {
                    "route": "questionSgdwBatchExport",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工单位隐患台账- 批量导出报表",
                    "id": "ca59d7ed801145ec9f3e0fadae3360e8",
                    "category": null,
                    "url": "questionSgdwBatchExport"
                },
                {
                    "route": "startup-subitem-apply-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项开工申请-删除",
                    "id": "ca5d7aa533fe4556abdebcdc45fcdc1d",
                    "category": null,
                    "url": "startup-subitem-apply-delete"
                },
                {
                    "route": "startup-subitem-apply-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项开工申请-提交",
                    "id": "cb101ffe86a847888f2667d836e22411",
                    "category": null,
                    "url": "startup-subitem-apply-submit"
                },
                {
                    "route": "glManpower-check-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤人员管理-删除",
                    "id": "cb17015d36b84651896e8119888d8ca6",
                    "category": null,
                    "url": "glManpower-check-delete"
                },
                {
                    "route": "experiment-report-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "报告台账-删除",
                    "id": "cb46740e79374c2db352967f79eb253e",
                    "category": null,
                    "url": "experiment-report-delete"
                },
                {
                    "route": "rquisition-ledger-preview",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-征拆记录-报表预览",
                    "id": "cbe7cbc16c44402683bef1b5ee81ed5f",
                    "category": null,
                    "url": "rquisition-ledger-preview"
                },
                {
                    "route": "startup-firstitem-apply-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件开工—新增",
                    "id": "cbf0a8e5d12e45349d7e0f3e5ac40198",
                    "category": null,
                    "url": "startup-firstitem-apply-add"
                },
                {
                    "route": "menu-calc-ledger-divide-data-record-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "数据录入-编辑",
                    "id": "cbfc17ef892048ac94e1c653ded40b43",
                    "category": null,
                    "url": "menu-calc-ledger-divide-data-record-edit"
                },
                {
                    "route": "startup-subitem-apply-resolve",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项开工申请-撤回",
                    "id": "cc54dabecb2448aeb7951772be51d2c0",
                    "category": null,
                    "url": "startup-subitem-apply-resolve"
                },
                {
                    "route": "questionSubmitData",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "隐患排查- 提交",
                    "id": "cd5a6996936e40dfbb039e7dfa75b64b",
                    "category": null,
                    "url": "questionSubmitData"
                },
                {
                    "route": "CL-StakeCoordinateList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "逐桩坐标页面",
                    "id": "cd5e6505ecca46bc8e02852c256ff9c5",
                    "category": null,
                    "url": "/controlMeasures/StakeCoordinateList"
                },
                {
                    "route": "monthReport-management-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "管理处月报-编辑",
                    "id": "ce81306e9ba54faeb6cfa517b75c82f1",
                    "category": null,
                    "url": "monthReport-management-edit"
                },
                {
                    "route": "glManpower-daily-check",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "打卡检查-审核",
                    "id": "ce83879827ab436f965e8f72134cd055",
                    "category": null,
                    "url": "glManpower-daily-check"
                },
                {
                    "route": "designFile",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首页-设计文件上传",
                    "id": "cebd6a2745254db4ad274b017f8f2d4a",
                    "category": null,
                    "url": "designFile"
                },
                {
                    "route": "stopWorkOrder-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令-新增",
                    "id": "cf0931cea9384a5a83a23acf0973d529",
                    "category": null,
                    "url": "stopWorkOrder-add"
                },
                {
                    "route": "startup-firstitem-check-apply-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件验收—删除",
                    "id": "cf2d33dba9224e0589c374bd3353196f",
                    "category": null,
                    "url": "startup-firstitem-check-apply-delete"
                },
                {
                    "route": "menu-calc-fcc-sync",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首期控制计量-同步",
                    "id": "cf81b206e42c4d519017fb4441348806",
                    "category": null,
                    "url": "menu-calc-fcc-sync"
                },
                {
                    "route": "subItem-import",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项库-导入",
                    "id": "cf945ff4038441a5aed040305f913036",
                    "category": null,
                    "url": "subItem-import"
                },
                {
                    "route": "resumeWorkApply-urging",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工申请-催办",
                    "id": "cf97fa3562f6418b9dac3631c9951175",
                    "category": null,
                    "url": "resumeWorkApply-urging"
                },
                {
                    "route": "staff-submit-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员报审-批量下载",
                    "id": "cfdfb3a6497442ae8426c85dc5543709",
                    "category": null,
                    "url": "staff-submit-export"
                },
                {
                    "route": "qp-move-GXYS-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-施工自检-移动",
                    "id": "d01c2098995b4fc7b9c69fee49b475d7",
                    "category": null,
                    "url": "qp-move-GXYS-SG"
                },
                {
                    "route": "question-Jldw-BatchExport",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理单位隐患台账-批量导出报表",
                    "id": "d069bc467b634561bc1c15267d74b208",
                    "category": null,
                    "url": "question-Jldw-BatchExport"
                },
                {
                    "route": "paperSend-flowConfig",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "发文管理-流程配置",
                    "id": "d0863071737348f3be1eee0c4cf839e6",
                    "category": null,
                    "url": "paperSend-flowConfig"
                },
                {
                    "route": "calqty-contractList-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同工程量清单-新增",
                    "id": "d0e2cbb2fa7946a39fb5736734ef716d",
                    "category": null,
                    "url": "calqty-contractList-add"
                },
                {
                    "route": "controlList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "动态工程量清单",
                    "id": "d10bc92a9d3f40cba8633843788202d1",
                    "category": null,
                    "url": "controlList"
                },
                {
                    "route": "entity-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体库-新增",
                    "id": "d169ca45abdf4d4e9a582a71ff9b7f7b",
                    "category": null,
                    "url": "entity-add"
                },
                {
                    "route": "noncontraction-listAdjust-auditing",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整-审核",
                    "id": "d17d789100204b45aa0dcf6ed9892336",
                    "category": null,
                    "url": "noncontraction-listAdjust-auditing"
                },
                {
                    "route": "video-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "摄像头管理-新增",
                    "id": "d1b2c82faf8f42e389a2c4717caf69f0",
                    "category": null,
                    "url": "video-add"
                },
                {
                    "route": "startup-prepare-attach",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理准备-附件",
                    "id": "d1dfe4afef1e489cbd8f1a4b3c10285c",
                    "category": null,
                    "url": "startup-prepare-attach"
                },
                {
                    "route": "experiment-spotCheck-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "抽检-提交",
                    "id": "d271300543a54e84bf04a7699e4ea772",
                    "category": null,
                    "url": "experiment-spotCheck-submit"
                },
                {
                    "route": "addFormulaLib",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公式库-增加",
                    "id": "d27309b35b0347e3949c5261f77ef722",
                    "category": null,
                    "url": "addFormulaLib"
                },
                {
                    "route": "stopWorkOrder-sign",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令-签收",
                    "id": "d3350d7c1d394dca93304e7ade1f23c5",
                    "category": null,
                    "url": "stopWorkOrder-sign"
                },
                {
                    "route": "apparatus-authorityApproval",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "设备管理-授权审批台账",
                    "id": "d33be0a880324a808a7d7acbd2740734",
                    "category": null,
                    "url": "apparatus-authorityApproval"
                },
                {
                    "route": "table-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "表格库-编辑",
                    "id": "d36c25f85f86442399440cb8d6db28d9",
                    "category": null,
                    "url": "table-edit"
                },
                {
                    "route": "quality-ensure-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-编辑",
                    "id": "d3c485e44af9433f9ad05b6b04d5d4ea",
                    "category": null,
                    "url": "quality-ensure-edit"
                },
                {
                    "route": "experiment-schemeLib-operate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "试验方案库-操作按钮",
                    "id": "d3c79cd89ad34244b41052f1be948db0",
                    "category": null,
                    "url": "experiment-schemeLib-operate"
                },
                {
                    "route": "sub_Finished_edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "已完工计量-是否计量按钮",
                    "id": "d429acb7e9ea42e9980d085ed123e7c0",
                    "category": null,
                    "url": "sub_Finished_edit"
                },
                {
                    "route": "projectToEntity-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实体类型-新增",
                    "id": "d50661156ca5435fa9e11bec4f66c4d9",
                    "category": null,
                    "url": "projectToEntity-add"
                },
                {
                    "route": "rquisition-ledger-set",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-征拆记录-征拆类型设置",
                    "id": "d5af3d20d0024d89826ec3c645317296",
                    "category": null,
                    "url": "rquisition-ledger-set"
                },
                {
                    "route": "monthReport-construction-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工月报-提交",
                    "id": "d5af979a5e7c42a6bdd199bd45713c8f",
                    "category": null,
                    "url": "monthReport-construction-submit"
                },
                {
                    "route": "startup-prepare-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理准备-审核",
                    "id": "d65326ed6ac744a3901cf1ce608c6bad",
                    "category": null,
                    "url": "startup-prepare-audit"
                },
                {
                    "route": "menu-ledger-move-project",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-移动",
                    "id": "d70c5714f849405d8c3d36249e300a27",
                    "category": null,
                    "url": "menu-ledger-move-project"
                },
                {
                    "route": "self_model_add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "自研Bim模型发布操作按钮",
                    "id": "d723396e6fb34c62a89c5ce27c7a78e6",
                    "category": null,
                    "url": "self_model_add"
                },
                {
                    "route": "dailyLog-setting-start",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-日志填报设置-启用",
                    "id": "d8b46f520517497a8a01955b0691702a",
                    "category": null,
                    "url": "dailyLog-setting-start"
                },
                {
                    "route": "menu-calqty-control-revise-change-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "变更联测数据调整-新增清单",
                    "id": "d8b51dcd22d24f5087034937102e64c3",
                    "category": null,
                    "url": "menu-calqty-control-revise-change-add"
                },
                {
                    "route": "qp-audit-GXYS-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-施工自检-审核",
                    "id": "d8b76ea664b841cfbee69337eb28aa7b",
                    "category": null,
                    "url": "qp-audit-GXYS-SG"
                },
                {
                    "route": "contractManage-ledger-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同台账-审核",
                    "id": "d8ecf6cc6a604d7ca8a188d7582c23fb",
                    "category": null,
                    "url": "contractManage-ledger-audit"
                },
                {
                    "route": "papresCheck",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件监理-审核",
                    "id": "da1e56313cff4b8a9e06acefced9addf",
                    "category": null,
                    "url": "papresCheck"
                },
                {
                    "route": "/attendance/setting/check",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤人员管理",
                    "id": "da5d692bb13c4aed85ae7137439bdd43",
                    "category": null,
                    "url": "/attendance/setting/check"
                },
                {
                    "route": "/agreement/stopWorkOrder",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令",
                    "id": "da99842c2dd942a79998006dc30816ec",
                    "category": null,
                    "url": "/agreement/stopWorkOrder"
                },
                {
                    "route": "dailyLog-constructor-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-施工日志-删除",
                    "id": "db5fa38d550e465bbddd156fe4e42540",
                    "category": null,
                    "url": "dailyLog-constructor-delete"
                },
                {
                    "route": "papresSave",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "环水保文件监理-提交",
                    "id": "db75ee292bca4aafa4553dbdfde9ffc8",
                    "category": null,
                    "url": "papresSave"
                },
                {
                    "route": "noncontraction-contractList-imp",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同清单-导入",
                    "id": "dc1ab00d48fa44059005f2cf80271efb",
                    "category": null,
                    "url": "noncontraction-contractList-imp"
                },
                {
                    "route": "sample-ledger-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-导出",
                    "id": "dc822aeeab9b483e94f19a50d3d18613",
                    "category": null,
                    "url": "sample-ledger-export"
                },
                {
                    "route": "quality-ensure-revise",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-修订",
                    "id": "dd04436e58474250a1490e23b3dbe2a8",
                    "category": null,
                    "url": "quality-ensure-revise"
                },
                {
                    "route": "qp-delete-ZLPD-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-施工自检-删除",
                    "id": "dd6863369b1a449282520f7c2f8a37e7",
                    "category": null,
                    "url": "qp-delete-ZLPD-SG"
                },
                {
                    "route": "monthReport-supervision-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理月报-编辑",
                    "id": "dd899b45b3834fb5b8c9bce3c2bf1ccb",
                    "category": null,
                    "url": "monthReport-supervision-edit"
                },
                {
                    "route": "document-menu-law-project-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-项目库文件删除",
                    "id": "de4809db286c44498873bc0a57326939",
                    "category": null,
                    "url": "document-menu-law-project-delete"
                },
                {
                    "route": "schemeToEntity-deleteEntitytype",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库-删除",
                    "id": "deb2955ccad043d981018f268266afca",
                    "category": null,
                    "url": "schemeToEntity-deleteEntitytype"
                },
                {
                    "route": "sample-ledger-collarSample",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-领样",
                    "id": "dec92ac958a14fc7a7022d7ff39415a9",
                    "category": null,
                    "url": "sample-ledger-collarSample"
                },
                {
                    "route": "editBoqTempLib",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单范本库-编辑",
                    "id": "defbd90726714dce9867cae7b9fa7216",
                    "category": null,
                    "url": "editBoqTempLib"
                },
                {
                    "route": "riskEvaluate-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "危险源评估报告-新增",
                    "id": "df7828b8bf7442568f80d101a5916cd0",
                    "category": null,
                    "url": "riskEvaluate-add"
                },
                {
                    "route": "qp-check-ZLPD-SG",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工序验收-施工自检-相关质量表格",
                    "id": "df8912a71c9d42379dfc857654496101",
                    "category": null,
                    "url": "qp-check-ZLPD-SG"
                },
                {
                    "route": "staff-submit-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员报审-新增",
                    "id": "e063f96e87fc4d60857a7272ae51c585",
                    "category": null,
                    "url": "staff-submit-add"
                },
                {
                    "route": "copyFormulaLib",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公式库-复制",
                    "id": "e09e20104589404f84b4eb160c83959a",
                    "category": null,
                    "url": "copyFormulaLib"
                },
                {
                    "route": "material-people-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "试验人员-提交",
                    "id": "e0e394cc84644c3e88e0d646ebb6c15c",
                    "category": null,
                    "url": "material-people-submit"
                },
                {
                    "route": "glManpower-daily-judgment",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "打卡检查-直接判定",
                    "id": "e120808e1b8749fc8fa53e20d1e048cf",
                    "category": null,
                    "url": "glManpower-daily-judgment"
                },
                {
                    "route": "dailyLog-siteSupervisor-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-现场监理日志-删除",
                    "id": "e120e661326646278fb618c67dd1da28",
                    "category": null,
                    "url": "dailyLog-siteSupervisor-delete"
                },
                {
                    "route": "qp-delete-ZLPD-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-监理抽检-删除",
                    "id": "e1358c289a3c4934822f31a02de899f0",
                    "category": null,
                    "url": "qp-delete-ZLPD-JL"
                },
                {
                    "route": "resumeWorkApply-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工申请-新增",
                    "id": "e1527216aa5c4fe692d4e755f8312f29",
                    "category": null,
                    "url": "resumeWorkApply-add"
                },
                {
                    "route": "ListAdjust",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整",
                    "id": "e21cf490a42343119d3d590b01daa1c6",
                    "category": null,
                    "url": "/projectPayment/noncontration/listAdjust"
                },
                {
                    "route": "experiment-workConnectLedger-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工作联系单台账-提交",
                    "id": "e253a1ab8f2a4d86a21a360720cfc8a9",
                    "category": null,
                    "url": "experiment-workConnectLedger-submit"
                },
                {
                    "route": "riskEvaluate-update",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "危险源评估报告-编辑",
                    "id": "e315e2073cae4b56a5f634f01ae5cd4b",
                    "category": null,
                    "url": "riskEvaluate-update"
                },
                {
                    "route": "qp-obsolete-ZLPD-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-监理抽检-驳回",
                    "id": "e3693a0d1b6749e4a0b73afed055b977",
                    "category": null,
                    "url": "qp-obsolete-ZLPD-JL"
                },
                {
                    "route": "apparatusFucCheck-add/edit/del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "设备管理-功能核查增删行",
                    "id": "e3b08a58b9af46b1885a8dd3bc19c109",
                    "category": null,
                    "url": "apparatusFucCheck-add/edit/del"
                },
                {
                    "route": "noncontraction-contractList-lock",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同清单-锁定",
                    "id": "e3bd170d715644718dfd2887e14b30b3",
                    "category": null,
                    "url": "noncontraction-contractList-lock"
                },
                {
                    "route": "progress-plan-audit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计划管理-审核",
                    "id": "e3f37d0bdbc64631b7b54c280b9de654",
                    "category": null,
                    "url": "progress-plan-audit"
                },
                {
                    "route": "scheme-copy",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库列表-复制",
                    "id": "e4018a08a78b4be58dbae126bbb1c0ea",
                    "category": null,
                    "url": "scheme-copy"
                },
                {
                    "route": "a_xcjl_add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "移动端巡查记录",
                    "id": "e4c453ff2e684f149d8f05daa9a84d1c",
                    "category": null,
                    "url": "a_xcjl_add"
                },
                {
                    "route": "model_add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "Bim模型发布操作按钮",
                    "id": "e521523ce4854c3c93cb050eacca46fd",
                    "category": null,
                    "url": "model_add"
                },
                {
                    "route": "reviseChange",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "变更联测数据调整",
                    "id": "e5e15899f71449e49cc4573777009beb",
                    "category": null,
                    "url": "reviseChange"
                },
                {
                    "route": "contractManage-ledger-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同台账-删除",
                    "id": "e647c97450374b37b0775d845db32689",
                    "category": null,
                    "url": "contractManage-ledger-del"
                },
                {
                    "route": "staff-submit-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "特种作业人员报审-编辑",
                    "id": "e6549b572a1d45289dd3f7290fe0fcb5",
                    "category": null,
                    "url": "staff-submit-edit"
                },
                {
                    "route": "calqty_projectCal_commmonList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "普通清单计量-编辑",
                    "id": "e767c2933ef344d0a2dd982f986af07a",
                    "category": null,
                    "url": "calqty_projectCal_commmonList"
                },
                {
                    "route": "stopWorkOrder-del",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "工程暂时停工指令-删除",
                    "id": "e8718cdc5a354b298265111cb57b3891",
                    "category": null,
                    "url": "stopWorkOrder-del"
                },
                {
                    "route": "glManpower-salesLeave-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "请/销假申请-销假",
                    "id": "e97180a492ad41fb9f333a5af018034d",
                    "category": null,
                    "url": "glManpower-salesLeave-add"
                },
                {
                    "route": "jlCheckDelete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查监理-删除",
                    "id": "e974d311c3784e1c9df5052d465e19b3",
                    "category": null,
                    "url": "jlCheckDelete"
                },
                {
                    "route": "monthReport-construction-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "施工月报-批量导出",
                    "id": "e98fe8451dc64a7eb882e2116cd3867d",
                    "category": null,
                    "url": "monthReport-construction-export"
                },
                {
                    "route": "realName-management-leave",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实名台账-离职",
                    "id": "e9d39f2fdb74417e864c4d46220d3fda",
                    "category": null,
                    "url": "realName-management-leave"
                },
                {
                    "route": "glManpower-inspection-check",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "检查公示-复核",
                    "id": "ea7e6723966b445891a92d991134e8f4",
                    "category": null,
                    "url": "glManpower-inspection-check"
                },
                {
                    "route": "menu-ledger-divide-data-record-introduce-project",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "数据录入-引入项目节",
                    "id": "eb2830e7dbba40488c3279133b6d891a",
                    "category": null,
                    "url": "menu-ledger-divide-data-record-introduce-project"
                },
                {
                    "route": "glManpower-attendance-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "考勤段设定-删除",
                    "id": "eb8495fc6b134f759757731b8d273786",
                    "category": null,
                    "url": "glManpower-attendance-delete"
                },
                {
                    "route": "menu-safe-risk-source-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "重大危险源管理-编辑",
                    "id": "eb862a3d3b554ba2bf6cdedd1779cb47",
                    "category": null,
                    "url": "menu-safe-risk-source-edit"
                },
                {
                    "route": "experiment-record-modify-report",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "记录表台账-编制报告",
                    "id": "eb86bbc6d9ca45c7aefbf8296bbf7dc4",
                    "category": null,
                    "url": "experiment-record-modify-report"
                },
                {
                    "route": "materialUsageExport",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "材料使用台账-导出",
                    "id": "ec72804085c94f7fb41f7d956d008281",
                    "category": null,
                    "url": "/experiment/materialUsage"
                },
                {
                    "route": "dayLedger",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计日工台账",
                    "id": "ecd87712835e4890a97df61b928cdd5c",
                    "category": null,
                    "url": "/calqty/dayLedger"
                },
                {
                    "route": "noncontration-adjust-detail-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单调整详情-新增",
                    "id": "ed4b893c10664090ac639370ee06a826",
                    "category": null,
                    "url": "noncontration-adjust-detail-add"
                },
                {
                    "route": "qp-export-ZLPD-JL",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量评定-监理抽检-导出",
                    "id": "edbc2a73f80640619c459cd284d80652",
                    "category": null,
                    "url": "qp-export-ZLPD-JL"
                },
                {
                    "route": "contractManage-basicType-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "基础分类表模板-编辑",
                    "id": "edd256cd6c3743489dcbbcc604ee06b2",
                    "category": null,
                    "url": "contractManage-basicType-edit"
                },
                {
                    "route": "contractManage-ContractTypeEdit-reset",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同类型配置-重置",
                    "id": "ee2349e7e8754c3fb020f470899c0af1",
                    "category": null,
                    "url": "contractManage-ContractTypeEdit-reset"
                },
                {
                    "route": "document-menu-tree-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-通用库树编辑",
                    "id": "ee31efdf66bc43f0819d1bad04f5d760",
                    "category": null,
                    "url": "document-menu-tree-edit"
                },
                {
                    "route": "menu-calc-detail-list-gather-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-清单汇总格式导出",
                    "id": "ee37df1f71d1468b96087105d97e50df",
                    "category": null,
                    "url": "menu-calc-detail-list-gather-export"
                },
                {
                    "route": "calTotalBill",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "总额清单计量",
                    "id": "ee477d271fe04e21b67c61151d4551a3",
                    "category": null,
                    "url": "calTotalBill"
                },
                {
                    "route": "menu-calc-ledger-divide-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "台账分解及算量-删除",
                    "id": "ef2eccd2eced4e0982494e1d12be224b",
                    "category": null,
                    "url": "menu-calc-ledger-divide-delete"
                },
                {
                    "route": "special-config-modify",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查配置-编辑",
                    "id": "ef519aa5ccba42c0831455a670af1660",
                    "category": null,
                    "url": "special-config-modify"
                },
                {
                    "route": "contractManage-ledger-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同台账-编辑",
                    "id": "efaed328dc3548ef902c3638be5ddc45",
                    "category": null,
                    "url": "contractManage-ledger-edit"
                },
                {
                    "route": "document-article-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "通知公告-删除",
                    "id": "f00401e4f657413d862b4017ee35b020",
                    "category": null,
                    "url": "document-article-delete"
                },
                {
                    "route": "delBoqTempLib",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "清单范本库-删除",
                    "id": "f0055375eded4328bb33cb45e600826d",
                    "category": null,
                    "url": "delBoqTempLib"
                },
                {
                    "route": "sample-ledger-keepSample",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-制件",
                    "id": "f00b4e69aa0741d98598d8e3bffe8438",
                    "category": null,
                    "url": "sample-ledger-keepSample"
                },
                {
                    "route": "rquisition-check-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆台账-清点台账记录-删除",
                    "id": "f0306d03fe8f4522b8084af4a699261d",
                    "category": null,
                    "url": "rquisition-check-delete "
                },
                {
                    "route": "resumeWorkApply-nullify",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "复工申请-作废",
                    "id": "f08e5d44ea2948a594dabfb11d889243",
                    "category": null,
                    "url": "resumeWorkApply-nullify"
                },
                {
                    "route": "quality-register-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量责任登记-新增",
                    "id": "f149589c083b4286acfe2e7129ec2ade",
                    "category": null,
                    "url": "quality-register-add"
                },
                {
                    "route": "projectToEntity-linkEntityParam",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "项目实体库-实体类型参数",
                    "id": "f1ec8eefb76342599967546ca9c017ad",
                    "category": null,
                    "url": "projectToEntity-linkEntityParam"
                },
                {
                    "route": "business-code-rule-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "业务编码规则管理-新增",
                    "id": "f2f9d265b4ba454aae6ee8c89be7bd16",
                    "category": null,
                    "url": "business-code-rule-add"
                },
                {
                    "route": "calRelatedList-menu-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计量范围库-确定关联",
                    "id": "f32389bac0ba4372b7add38fea6c81f6",
                    "category": null,
                    "url": "calRelatedList-menu-add"
                },
                {
                    "route": "dailyLog-siteSupervisor-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-现场监理日志-编辑",
                    "id": "f386325f308c4a3d88ab893269ab1e96",
                    "category": null,
                    "url": "dailyLog-siteSupervisor-edit"
                },
                {
                    "route": "sample-ledger-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "样品台账-提交",
                    "id": "f3f6bee47b46475f926710578af4722f",
                    "category": null,
                    "url": "sample-ledger-submit"
                },
                {
                    "route": "startup-contract-command-resolve",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "合同段开工令-撤回",
                    "id": "f3f909de1e594a1a8858d5571da901a6",
                    "category": null,
                    "url": "startup-contract-command-resolve"
                },
                {
                    "route": "table-copy",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "表格库-复制",
                    "id": "f4985e4eb0144575be643b0becc17054",
                    "category": null,
                    "url": "table-copy"
                },
                {
                    "route": "roam_add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "漫游数据管理操作按钮",
                    "id": "f49c295d640447c19834a5e1994e2627",
                    "category": null,
                    "url": "roam_add"
                },
                {
                    "route": "schemeToEntity-linkEntityParam",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "方案库-实体类型参数",
                    "id": "f4ff962ee8c54adb81d282b0a0966321",
                    "category": null,
                    "url": "schemeToEntity-linkEntityParam"
                },
                {
                    "route": "/attendance/personal/leaveList",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "请/销假申请",
                    "id": "f57941d9ced0408d831ca5916999599c",
                    "category": null,
                    "url": "/attendance/personal/leaveList"
                },
                {
                    "route": "document-menu-tree-project-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-项目库树新增",
                    "id": "f5dbc7f6ebf94db6bab496674129d811",
                    "category": null,
                    "url": "document-menu-tree-project-add"
                },
                {
                    "route": "standard-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "质量保证体系-标准库-导出",
                    "id": "f5ddcf3ff22d4c8f8590ad825e09788b",
                    "category": null,
                    "url": "standard-export"
                },
                {
                    "route": "yzCheckCreate",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "专项检查业主-新增",
                    "id": "f5eb3f3721564fcd9be747f5796c53d2",
                    "category": null,
                    "url": "yzCheckCreate"
                },
                {
                    "route": "paper-ledger-tree-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "公文台账-公文树新增",
                    "id": "f6afe1c3138143d4a40d3909905a656f",
                    "category": null,
                    "url": "paper-ledger-tree-add"
                },
                {
                    "route": "calqty-project-daily",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "计日工计量-编辑",
                    "id": "f795c88a88314cc5a4cf7331d8642e3f",
                    "category": null,
                    "url": "calqty-project-daily"
                },
                {
                    "route": "realName-management-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "实名台账-编辑",
                    "id": "f7ac35c38e1f42a5aba95a5b0f46410f",
                    "category": null,
                    "url": "realName-management-edit"
                },
                {
                    "route": "video-set",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "摄像头管理-AI设置",
                    "id": "f847e1fa61e941cda92913f6a83c630d",
                    "category": null,
                    "url": "video-set"
                },
                {
                    "route": "monthReport-supervision-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "监理月报-批量导出",
                    "id": "f90a94c9a03e48f4bec9265a31286da2",
                    "category": null,
                    "url": "monthReport-supervision-export"
                },
                {
                    "route": "rquisition-expenses-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "征拆费用台账-导出",
                    "id": "f9bf56f0283b477cbe5b69ca4804d737",
                    "category": null,
                    "url": "rquisition-expenses-export"
                },
                {
                    "route": "agreement-tender-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "招标台账-删除",
                    "id": "f9cea44d40304b4d9eef00c8ec983066",
                    "category": null,
                    "url": "agreement-tender-delete"
                },
                {
                    "route": "subItem-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "分项库-新增",
                    "id": "fa0bad87ebd04b178f086c96dccae37b",
                    "category": null,
                    "url": "subItem-add"
                },
                {
                    "route": "dailyLog-constructor-export",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-施工日志-批量导出",
                    "id": "faf6956e42e44564a842be126416328d",
                    "category": null,
                    "url": "dailyLog-constructor-export"
                },
                {
                    "route": "noncontration-totalPayment-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "总额支付设置-新增",
                    "id": "fb851c6784a84158869ce9c4e4861693",
                    "category": null,
                    "url": "noncontration-totalPayment-add"
                },
                {
                    "route": "experiment-record-write",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "记录表台账-填写",
                    "id": "fd95542e37b64c44bc9f320b369fa1e8",
                    "category": null,
                    "url": "experiment-record-write"
                },
                {
                    "route": "experiment-report-approval",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "报告台账-审批",
                    "id": "fe0347eb4f3c4d5694088fe6f7df6af6",
                    "category": null,
                    "url": "experiment-report-approval"
                },
                {
                    "route": "norUser-add",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "非平台用户菜单-新增",
                    "id": "fe7878a301834c67bbb2031048196f35",
                    "category": null,
                    "url": "norUser-add"
                },
                {
                    "route": "question/ledger/yzdw",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "业主单位隐患台账",
                    "id": "feceec0d25084778aa95669edbf1fe5e",
                    "category": null,
                    "url": "/question/ledger/yzdw"
                },
                {
                    "route": "dailyLog-master-delete",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "日志管理-业主日志-删除",
                    "id": "fee832bccc4a4c1eb7713e8efe4ccf56",
                    "category": null,
                    "url": "dailyLog-master-delete"
                },
                {
                    "route": "element-editCancel",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "构配件取消",
                    "id": "ff0e70dd54bb4d8b9d6e3d652ef51fce",
                    "category": null,
                    "url": "element-editCancel"
                },
                {
                    "route": "document-menu-project-edit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "知识库-编辑项目库",
                    "id": "ff2b99f3f4494c2396c3cf0598ff3b29",
                    "category": null,
                    "url": "document-menu-project-edit"
                },
                {
                    "route": "startup-firstitem-apply-submit",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "首件开工—提交",
                    "id": "ff7e2b95dfee4bd3ab6f307bd1065758",
                    "category": null,
                    "url": "startup-firstitem-apply-submit"
                },
                {
                    "route": "norUser",
                    "appId": "fff65187cc5d4d539eb12dd8cda4b511",
                    "name": "非平台用户管理",
                    "id": "ffdc5cdba70d4d22b69b46111bd77efe",
                    "category": null,
                    "url": "/system/norUser"
                }
            ],
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
            <div style={{width:'100%',height:'100%',background:'#f1f1f1'}} className={styles.page1_main}>
                <div style={{width:'20%',height:'100%',background:'pink'}}>
                    <Button onClick={this.showBimWindow.bind(this)}>实景</Button>
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
                </div>
                <div style={{width:'80%',height:'100%',display:isVisibleBim?'block':'none'}} id='bimBox'>
                    <iframe 
                    src = 'http://localhost:9988/bim'  
                    style={{width:'100%',height:'100%',border:'none'}}
                    onLoad={this.postIntoBim.bind(this)}
                    ></iframe>
                </div>
                
            </div>
        )
    }
}

export default IframePage;
