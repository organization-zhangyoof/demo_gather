import React, { Component } from 'react';
import { Row, Col, Drawer, Form, Icon, Tabs } from 'antd';
import styles from './map.less';
class RightSideInfoDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    let { visible } = this.state;
    const onClose = () => {
      this.setState({
        visible: false,
      });
    };
    const showInfoBox = () => {
      this.setState({
        visible: true,
      });
    };
    let formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
      style: { marginBottom: 0 },
    };
    let singleFormItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      style: { marginBottom: 0 },
    };
    return (
      <div>
        {!visible ? (
          <div
            style={{
              width: 19,
              background: '#6fccf3',
              height: 45,
              position: 'absolute',
              top: '50%',
              cursor: 'pointer',
              borderRadius: 10,
              right: 0,
            }}
            onClick={showInfoBox}
          >
            <Icon type="left" style={{ color: '#fff', lineHeight: 3.5, paddingLeft: 3 }} />
          </div>
        ) : (
          <Drawer
            width={380}
            onClose={onClose}
            visible={visible}
            mask={false}
            style={{ position: 'absolute' }}
            bodyStyle={{ padding: 5 }}
            getContainer={false}
          >
            <Tabs defaultActiveKey="1" size="small" tabBarGutter={0}>
              <Tabs.TabPane tab="标段" key="1">
                <Form>
                  <div>
                    <Row gutter={0}>
                      <Col span={24}>
                        <Form.Item label="标段名称" {...singleFormItemLayout}></Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={0}>
                      <Col span={24}>
                        <Form.Item label="施工单位" {...singleFormItemLayout}></Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={0} style={{ paddingLeft: '25px' }}>
                      <Col span={12}>
                        <Form.Item label="合同金额" {...formItemLayout}></Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="线路里程" {...formItemLayout}></Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={0} style={{ paddingLeft: '25px' }}>
                      <Col span={12}>
                        <Form.Item label="特大桥" {...formItemLayout}></Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="桥梁里程" {...formItemLayout}></Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={0} style={{ paddingLeft: '25px' }}>
                      <Col span={12}>
                        <Form.Item label="特长隧道" {...formItemLayout}></Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="隧道里程" {...formItemLayout}></Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Tabs.TabPane>
              <Tabs.TabPane tab="费用" key="2">
                <div>
                  <Row gutter={0}>
                    <Col span={24}>
                      <Form.Item label="标段名称" {...singleFormItemLayout}></Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="累计完成" {...singleFormItemLayout}>
                          <div style={{width:'90%',background:'rgba(11, 26, 47, 1)',lineHeight:1.2,marginTop:10,borderRadius:10}}>
                              <div style={{width:'78.6%',borderRadius:10,height:'100%',background:'linear-gradient(90deg, rgba(240, 104, 162, 1) 0%, rgba(240, 104, 162, 1) 0%, rgba(223, 24, 109, 1) 100%, rgba(223, 24, 109, 1) 100%)'}}></div>
                              <span>16354.66</span>
                          </div>
                          <span>78.6%</span>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="累计支付" {...singleFormItemLayout}></Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="年度完成" {...singleFormItemLayout}></Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="年度支付" {...singleFormItemLayout}></Form.Item>
                    </Col>
                  </Row>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="进度" key="3"></Tabs.TabPane>
              <Tabs.TabPane tab="质量" key="4"></Tabs.TabPane>
              <Tabs.TabPane tab="安全" key="5"></Tabs.TabPane>
            </Tabs>
          </Drawer>
        )}
      </div>
    );
  }
}

export default RightSideInfoDrawer;
