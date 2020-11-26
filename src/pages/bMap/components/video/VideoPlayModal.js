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
    const { videoList,closeVideoPlay,videoPlayVisible,currentIndex,playTitle,changeVideo } = this.props;
    const {W,H} = this.state
    const changePlaySource = (type) => {
        let index = currentIndex
        let len = videoList.length
        if(type === 'right'){
            if(index == len - 1){
                index = 0
            }else{
                index ++
            }
        }
        if(type === 'left'){
            if(index == 0){
                index = len - 1
            }else{
                index --
            }
        }
        changeVideo(index)
    }
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
          <div className = {styles.play_container}>
            <div className = {styles.to_left} onClick = {()=>{changePlaySource('left')}}>
                <Icon type={'left'} style={{fontSize:30}}/>
            </div>
            {videoList && videoList.length && 
                <video autoplay ='autoplay'  src={(videoList[currentIndex]).url} style={{width:'100%',height:'100%'}}></video>
            }
            <div className = {styles.to_right} onClick = {()=>{changePlaySource('right')}}>
                <Icon type={'right'} style={{fontSize:30}}/>
            </div>
          </div>

      </Modal>
    );
  }
}

export default VideoPlayModal;
