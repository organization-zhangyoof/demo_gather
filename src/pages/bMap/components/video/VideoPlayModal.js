import React, { Component } from 'react';
import { Modal, Button, Icon  } from 'antd';
import './video.less'
import styles from'./video.less'
import picture from '../../../../assets/dingwei.png'
class VideoPlayModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        H :window.innerHeight>700?700:window.innerHeight*0.9,
        W :window.innerWidth>800?800:window.innerWidth*0.9,
    };
    window.addEventListener('resize', () => this.changeSzie())
  }
  changeSzie(){
    let H = window.innerHeight>600?600:window.innerHeight*0.9;
    let W = window.innerWidth>800?800:window.innerWidth*0.9;

    this.setState({
        H,W
    })
  }

  render() {
    const { videoList,closeVideoPlay,videoPlayVisible,currentIndex,playTitle } = this.props;
    const {W,H} = this.state
    return (
      <Modal
        visible={videoPlayVisible}
        width={W}
        height={H}
        title={playTitle}
        onCancel={closeVideoPlay}
        bodyStyle={{ padding: '0px' }}
        centered={true}
        maskClosable = {false}
        footer = {null}
        zIndex ={1100}
        wrapClassName={'__bmap_video_list_modal__'}
      >
          <div style={{width:'100%',height:'100%'}}>
          {videoList && videoList.length && <video autoplay ='autoplay' controls="controls" src={(videoList[currentIndex]).url} style={{width:'100%',height:'100%'}}></video>}
          </div>

      </Modal>
    );
  }
}

export default VideoPlayModal;
