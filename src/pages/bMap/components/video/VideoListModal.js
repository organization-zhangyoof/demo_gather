import React, { Component } from 'react';
import { Modal, Button, Icon  } from 'antd';
import './video.less'
import styles from'./video.less'
import picture from '../../../../assets/dingwei.png'
class VideoListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        H :window.innerHeight>600?600:window.innerHeight*0.8,
        W :window.innerWidth>700?700:window.innerWidth*0.8,
    };
    window.addEventListener('resize', () => this.changeSzie())
  }
  changeSzie(){
    let H = window.innerHeight>600?600:window.innerHeight*0.8;
    let W = window.innerWidth>700?700:window.innerWidth*0.8;

    this.setState({
        H,W
    })
  }

  render() {
    const { videoListVisible, closeVideoList,videoList, playVideo} = this.props;
    const {W,H} = this.state
    return (
      <Modal
        visible={videoListVisible}
        width={W}
        height={H}
        title="监控视频"
        onCancel={closeVideoList}
        bodyStyle={{ padding: '0px' }}
        centered={true}
        maskClosable = {false}
        footer = {null}
        wrapClassName={'__bmap_video_list_modal__'}
      >
          <div className={styles.video_container}>
            {/* <div className = {styles.video_item}>
                <img src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302491320&di=5c42b404b28deeb55035b06a7cd841ec&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F55%2F22%2F20300000929429130630222900050.jpg'/>
                <div className={styles.video_name}>dhsajkhdjhaskhdsakj</div>
                <div className={styles.full_box}>
                    <img src = {picture} />
                </div>
            </div> */}
            {
                videoList.map((item,index)=>{
                    return (<div className = {styles.video_item}>
                                <img src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302491320&di=5c42b404b28deeb55035b06a7cd841ec&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F55%2F22%2F20300000929429130630222900050.jpg'/>
                                <div className={styles.video_name}>{item.name}</div>
                                <div className={styles.full_box} onClick = {()=>{playVideo(index,item.name)}}>
                                    <img src = {picture} />
                                </div>
                            </div>)
                })
            }
          </div>

      </Modal>
    );
  }
}

export default VideoListModal;
