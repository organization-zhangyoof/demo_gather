import React, { Component } from 'react'
import { Icon } from 'antd';
import 'cesium/Source/Widgets/widgets.css';
import $ from 'jquery';
import styles from './bimStyle.less'

class BimPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switchOpen:false
        }
    }

    componentDidMount() {
        // this.initBim()
    }
    async initBim() {
        let viewer = new window.Cesium.Viewer(this.refs.bimContainer);
        this.viewer = viewer;
        this.setState({
            viewer: viewer,
        })
        let scene = viewer.scene
        let widget = viewer.cesiumWidget;
        //添加天地图影像底图
        // var imageryLayers = new window.Cesium.TiandituImageryProvider({
        //     credit : new window.Cesium.Credit(''),
        //     token: '72f2b9d3be4dde9ae012ee075bfa7bc0'
        // })
        // viewer.imageryLayers.addImageryProvider(imageryLayers);
        // //添加天地图全球中文标记
        // let labelImagery = new window.Cesium.TiandituImageryProvider({
        //     mapStyle: window.Cesium.TiandituMapsStyle.CIA_C,//天地图全球中文注记服务
        //     token: '72f2b9d3be4dde9ae012ee075bfa7bc0' //由天地图官网申请的密钥
        // });
        // viewer.imageryLayers.addImageryProvider(labelImagery);
        let address = 'http://39.108.163.220/iserver/services/3D-SZS-XY-201811302/rest/realspace'
        // let address = 'http://www.supermapol.com/realspace/services/3D-OlympicGreen20200416/rest/realspace'
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
                // $("#custom").on("click", function () {
                //     var promise = scene.outputSceneToFile();
                //     window.Cesium.when(promise, function (base64data) {
                //         download(base64data);
                //     })
                // })
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
    render() {
        const switchClick = () => {
            let {switchOpen} = this.state
            this.setState({switchOpen:!switchOpen},()=>{
                console.log('this.state.switchOpen===',this.state.switchOpen)
            })
        }
        return (
            <div className = {styles._bim_modal_}>
                <div className={styles.btn_box}>
                    <div className = {this.state.switchOpen?styles.btn_other_on:styles.btn_other_off}>
                        <div className={styles.btn_item}>
                            功能
                        </div>
                        <div className={styles.btn_item}>
                            功能
                        </div>
                        <div className={styles.btn_item}>
                            功能
                        </div>
                    </div>
                    <div className={this.state.switchOpen?styles.btn_switch_on:styles.btn_switch_off} onClick={switchClick}>
                        <Icon type="plus" style={{fontSize:30,color:'#fff'}}/>
                    </div>
                </div>
                <div  ref='bimContainer' id='bimContainer' ></div>
            </div>
        )
    }
}

export default BimPage;