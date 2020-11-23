import React, { Component } from 'react';
import { Modal, Button } from 'antd';
class VideoViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { videoVisible, closeVideoModal } = this.props;
    return (
      <Modal
        visible={videoVisible}
        width={700}
        height={510}
        title="监控视频查看"
        onCancel={closeVideoModal}
        bodyStyle={{ padding: '0px 20px' }}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button onClick={closeVideoModal}>关闭</Button>
          </div>
        }
      >
          <div style={{width:700,height:510}}>

          </div>

      </Modal>
    );
  }
}

export default VideoViewModal;
