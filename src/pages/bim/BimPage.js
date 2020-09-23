import React, { Component } from 'react'
import { Icon, Switch } from 'antd';
import 'cesium/Source/Widgets/widgets.css';
import $ from 'jquery';
import styles from './bimStyle.less'

class BimPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switchOpen:false,
            bimAddress:'http://www.supermapol.com/realspace/services/3D-OlympicGreen20200416/rest/realspace',
            openChangeBim: false,
            openLayerControl: false,
            openOperate:false,
            openMeasure:false,
            showMapMark:false,
            showTianDiMap:false
        }
    }

    componentDidMount() {
        this.initBim()
    }
    async initBim() {
        let viewer = new window.Cesium.Viewer(this.refs.bimContainer);
        this.viewer = viewer;
        this.setState({
            viewer: viewer,
        })
        // let scene = viewer.scene
        // let widget = viewer.cesiumWidget;
        // 添加天地图影像底图
        var imageryLayers = new window.Cesium.TiandituImageryProvider({
            credit : new window.Cesium.Credit(''),
            token: '72f2b9d3be4dde9ae012ee075bfa7bc0'
        })
        viewer.imageryLayers.addImageryProvider(imageryLayers);
        //添加天地图全球中文标记
        let labelImagery = new window.Cesium.TiandituImageryProvider({
            mapStyle: window.Cesium.TiandituMapsStyle.CIA_C,//天地图全球中文注记服务
            token: '72f2b9d3be4dde9ae012ee075bfa7bc0' //由天地图官网申请的密钥
        });
        viewer.imageryLayers.addImageryProvider(labelImagery);
        // // let address = 'http://39.108.163.220/iserver/services/3D-SZS-XY-201811302/rest/realspace'
        // // let address = 'http://www.supermapol.com/realspace/services/3D-OlympicGreen20200416/rest/realspace'
        // let address = this.state.bimAddress
        // try {
        //     var promise = scene.open(address);
        //     window.Cesium.when(promise, function (layers) {
        //         // scene.camera.setView({
        //         //     destination: new window.Cesium.Cartesian3.fromDegrees(116.38621009526075, 39.98468016277832, 3313.2286367219722),
        //         //     orientation: {
        //         //         heading: 6.116051,
        //         //         pitch: -0.275007,
        //         //         roll: 6.283185
        //         //     }
        //         // });
        //         for (var i = 0; i < layers.length; i++) {
        //             // layers[i].selectEnabled = false;
        //             console.log(layers);

        //         }
        //         viewer.flyTo(layers[0])
        //     }, 
        //     function (e) {
        //         var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
        //         widget.showErrorPanel(title, undefined, e);
        //     });
        // }catch (e) {
        //     if (widget._showRenderLoopErrors) {
        //         var title = '渲染时发生错误，已停止渲染。';
        //         widget.showErrorPanel(title, undefined, e);
        //     }
        // }
    }
    
    render() {
        let { viewer, openChangeBim, openLayerControl,openMeasure,openOperate, showMapMark, showTianDiMap } = this.state
        const showSences = (viewer) =>{
            let scene = viewer.scene
            let widget = viewer.cesiumWidget;
            let address = this.state.bimAddress
            console.log("address=====",address)
            try {
                var promise = scene.open(address);
                window.Cesium.when(promise, function (layers) {
                    // scene.camera.setView({
                    //     destination: new window.Cesium.Cartesian3.fromDegrees(116.38621009526075, 39.98468016277832, 3313.2286367219722),
                    //     orientation: {
                    //         heading: 6.116051,
                    //         pitch: -0.275007,
                    //         roll: 6.283185
                    //     }
                    // });
                    for (var i = 0; i < layers.length; i++) {
                        // layers[i].selectEnabled = false;
                        console.log(layers);

                    }
                    viewer.flyTo(layers[0])
                }, 
                function (e) {
                    var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
                    widget.showErrorPanel(title, undefined, e);
                });
            }catch (e) {
                if (widget._showRenderLoopErrors) {
                    var title = '渲染时发生错误，已停止渲染。';
                    widget.showErrorPanel(title, undefined, e);
                }
            }
        }
        //展开或收缩功能按钮
        const switchClick = () => {
            let {switchOpen} = this.state
            this.setState({
                switchOpen:!switchOpen,
                openChangeBim:false,
                openLayerControl:false,
                openOperate:false,
                openMeasure:false,
            })
        }
        
        
        /***************************************量算功能************************************************/
        //打开或收缩量算扩展按钮取
        const switchMeasure = () => {
            let tmp = this.state.openMeasure
            this.setState({openMeasure:!tmp})
        }

         /**************************************地图操作******************************************************/
        //打开或收缩操作扩展按钮取
        const switchOperate = () => {
            let tmp = this.state.openOperate
            this.setState({openOperate:!tmp})
        }
        //拾取坐标
        const pickPosition = () => {

        }


        /**************************************图层控制**************************************************************/
        //图层控制开关
        const switchLayerControl = () => {
            let tmp = this.state.openLayerControl
            this.setState({openLayerControl:!tmp})
        }
        //显示或关闭底图注记
        const showMapMarkClcik = (checked,viewer) => {
            console.log("showMapMark===",checked)
            this.setState({showMapMark:checked})
        }
        //显示或取消天地底图
        const shouTianDiMapClick = (checked,viewer) => {
            console.log("shouTianDiMap===",checked)
            this.setState({showTianDiMap:checked})
        }

         /***************************************模型切换*******************************************************/
        //打开或收缩模型切换扩展按钮取
        const switchChangBim = () => {
            let tmp = this.state.openChangeBim
            this.setState({openChangeBim:!tmp})
        }
        //显示自有模型
        const changeSelfBim = (viewer) => {
            this.setState({ bimAddress: 'http://39.108.163.220/iserver/services/3D-SZS-XY-201811302/rest/realspace' }, () => { showSences(viewer)})
        }
        //显示超图模型
        const changeSuperBim = () => {
            this.setState({bimAddress:'http://www.supermapol.com/realspace/services/3D-OlympicGreen20200416/rest/realspace'},() => { showSences(viewer)})
        }
        //清除模型
        const clearLayers = () => {

        }

        return (
            <div className = {styles._bim_modal_}>
                <div className={styles.btn_box}>
                    <div className = {this.state.switchOpen?styles.btn_other_on:styles.btn_other_off}>
                        <div className={styles.btn_item} onClick = {switchMeasure}>
                            量算
                            <div className = {openMeasure?styles.expand_measuer_on:styles.expand_measuer_off}>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();changeSelfBim(viewer)}}>测距</span>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();changeSuperBim(viewer)}}>测面</span>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();changeSuperBim(viewer)}}>测高</span>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();changeSuperBim(viewer)}}>清除</span>
                            </div>
                        </div>

                        <div className={styles.btn_item} onClick = {switchOperate}>
                            地图<br/>操作
                             <div className = {openOperate?styles.expand_operate_on:styles.expand_operate_off}>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();pickPosition(viewer)}}>拾取坐标</span>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();}}>绘制标示</span>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();}}>测量</span>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();}}>剖切</span>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();}}>压平</span>
                            </div>
                        </div>

                        <div className={styles.btn_item} onClick = {()=>switchLayerControl(viewer)}>
                            图层<br/>控制
                            <div className = {openLayerControl?styles.expand_layer_control_on:styles.expand_layer_control_off}>
                                <Switch 
                                    checkedChildren="底图注记" 
                                    unCheckedChildren="底图注记"
                                    className = {showMapMark?styles.sub_switch_on:styles.sub_switch_off} 
                                    onClick = {(checked,e)=>{e.stopPropagation();showMapMarkClcik(checked,viewer)}}
                                />
                                <Switch 
                                    checkedChildren="天地图" 
                                    unCheckedChildren="天地图"
                                    className = {showTianDiMap?styles.sub_switch_on:styles.sub_switch_off} 
                                    onClick = {(checked,e)=>{e.stopPropagation();shouTianDiMapClick(checked,viewer)}}
                                />
                                
                            </div>
                        </div>

                        <div className={styles.btn_item} onClick = {switchChangBim}>
                            模型<br/>切换
                            <div className = {openChangeBim?styles.expand_change_bim_on:styles.expand_change_bim_off}>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();changeSelfBim(viewer)}}>自有模型</span>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();changeSuperBim(viewer)}}>超图模型</span>
                                <span className = {styles.expand_item} onClick = {(e)=>{e.stopPropagation();clearLayers(viewer)}}>清除模型</span>
                            </div>
                        </div>
                        <div className={styles.btn_item}>
                            功能
                        </div>
                    </div>
                    <div className={this.state.switchOpen?styles.btn_switch_on:styles.btn_switch_off} onClick={switchClick}>
                        <Icon type="plus" style={{fontSize:40,color:'#fff'}}/>
                    </div>
                </div>
                <div  ref='bimContainer' id='bimContainer' ></div>
            </div>
        )
    }
}

export default BimPage;