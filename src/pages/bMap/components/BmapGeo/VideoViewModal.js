import React, { Component } from 'react';
import { Modal, Button, Icon  } from 'antd';
import './video.less'
import styles from'./video.less'
import picture from '../../../../assets/dingwei.png'
class VideoViewModal extends Component {
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
    const { videoVisible, closeVideoModal,videoList } = this.props;
    const {W,H} = this.state
    let tmpVideoList = [
        {id:'',name:'视频1',url:'http://video.sina.com.cn/p/news/2019-11-27/detail-iihnzahi3687377.d.html?hasPlayedTime=1.254174'}
        ,{id:'',name:'视频2',url:'http://video.sina.com.cn/p/news/2020-10-31/detail-iiznezxr9187358.d.html?cre=videopagepc&mod=r&loc=2&r=9&rfunc=13&tj=none?hasPlayedTime=0.975'}
        ,{id:'',name:'视频3',url:'http://video.sina.com.cn/p/news/2020-10-11/detail-iivhvpwz1456173.d.html?cre=videopagepc&mod=r&loc=1&r=9&rfunc=13&tj=none?hasPlayedTime=0.570313'}
        ,{id:'',name:'视频3',url:'http://video.sina.com.cn/p/news/2020-10-31/detail-iiznezxr9187358.d.html?cre=videopagepc&mod=r&loc=6&r=9&rfunc=13&tj=none?hasPlayedTime=9.292851'}
        ,{id:'',name:'视频2',url:'http://video.sina.com.cn/p/news/2020-10-31/detail-iiznezxr9187358.d.html?cre=videopagepc&mod=r&loc=2&r=9&rfunc=13&tj=none?hasPlayedTime=0.975'}
        ,{id:'',name:'视频3',url:'http://video.sina.com.cn/p/news/2020-10-11/detail-iivhvpwz1456173.d.html?cre=videopagepc&mod=r&loc=1&r=9&rfunc=13&tj=none?hasPlayedTime=0.570313'}
        ,{id:'',name:'视频3',url:'http://video.sina.com.cn/p/news/2020-10-31/detail-iiznezxr9187358.d.html?cre=videopagepc&mod=r&loc=6&r=9&rfunc=13&tj=none?hasPlayedTime=9.292851'}
    ]
    let tmpVideoList1 = [
        {id:'',name:'视频1',url:'http://edge.ivideo.sina.com.cn/31360210703.mp4?KID=sina,viask&Expires=1606406400&ssig=ODZdUKushQ&reqid='},{id:'',name:'视频3',url:'http://video.sina.com.cn/p/news/2020-10-31/detail-iiznezxr9187358.d.html?cre=videopagepc&mod=r&loc=6&r=9&rfunc=13&tj=none?hasPlayedTime=9.292851'}
    ]
    const renderVideoList = (videoList) => {
        videoList.map(item=>{
            return (<div className = {styles.video_item}>
                        <img src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302491320&di=5c42b404b28deeb55035b06a7cd841ec&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F55%2F22%2F20300000929429130630222900050.jpg'/>
                        <div className={styles.video_name}>dhsajkhdjhaskhdsakj</div>
                        <div className={styles.full_box}>
                            <img src = {picture} />
                        </div>
                    </div>)
        })
    }
    let ww =this.H>500?500:this.H*0.8
    console.log('ww=====',ww)
    return (
      <Modal
        visible={videoVisible}
        width={W}
        height={H}
        title="监控视频"
        onCancel={closeVideoModal}
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
                tmpVideoList.map(item=>{
                    return (<div className = {styles.video_item}>
                                <img src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302491320&di=5c42b404b28deeb55035b06a7cd841ec&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F55%2F22%2F20300000929429130630222900050.jpg'/>
                                <div className={styles.video_name}>dhsajkhdjhaskhdsakj</div>
                                <div className={styles.full_box}>
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

export default VideoViewModal;
