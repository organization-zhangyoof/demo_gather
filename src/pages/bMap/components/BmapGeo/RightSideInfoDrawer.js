import React, { Component } from 'react';
import { Row, Col, Drawer, Form, Icon, Tabs } from 'antd';
import styles from './map.less';
class RightSideInfoDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorId: '',
      currentKey: '1',
    };
  }

  scrollToCard(anchorId) {
    debugger;
    let anchorElement = document.getElementById(anchorId);
    if (anchorElement) {
      anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
      this.setState({ anchorId: anchorId });
    }
  }
  render() {
    let { 
      visible,
      onClose,
      showInfoBox,
      directToMarker
     } = this.props;

    const { roadData } = this.props;
    const { currentKey } = this.state;
    const mapToInfoCard =
      roadData &&
      roadData.length > 0 &&
      roadData.map(item => (
        <div
          id={currentKey == '1' ? item.contractId : ''}
          className={styles.card}
          style={{ border: this.state.anchorId == item.contractId ? '1px solid rgba(83,161,228,0.85)' : 'none' }}
          onClick={() => {
            this.setState({
              anchorId:item.contractId
            })
            directToMarker(item.contractId)
          }}
        >
          <div>
            <span className={styles.ellipsisSpan}>
              标段名称：<span title={item.projectName}>{item.projectName}</span>
            </span>
          </div>
          <div>
            <span className={styles.ellipsisSpan}>
              施工单位：<span title={item.projectdes}>{item.projectdes}</span>
            </span>
          </div>
          <div>
            <span className={styles.ellipsisSpan50}>
              合同金额：<span>{'12536.78万元'}</span>
            </span>
            <span className={styles.ellipsisSpan50}>
              线路里程：<span>{'129.66km'}</span>
            </span>
          </div>
          <div>
            <span className={styles.ellipsisSpan50}>
              特大桥：<span>{3}</span>
            </span>
            <span className={styles.ellipsisSpan50}>
              桥梁里程：<span>{'3.99km'}</span>
            </span>
          </div>
          <div>
            <span className={styles.ellipsisSpan50}>
              特长隧道：<span>{'11.33km'}</span>
            </span>
            <span className={styles.ellipsisSpan50}>
              隧道里程：<span>{'3.99km'}</span>
            </span>
          </div>
        </div>
      ));

    const mapToFeeCard =
      roadData &&
      roadData.length > 0 &&
      roadData.map(item => (
        <div
          id={currentKey == '2' ? item.contractId : ''}
          className={styles.card}
          style={{ border: this.state.anchorId == item.contractId ? '1px solid rgba(83,161,228,0.85)' : 'none' }}
          onClick={() => {
            this.setState({
              anchorId:item.contractId
            })
            directToMarker(item.contractId)
          }}
        >
          <div>
            <span className={styles.ellipsisSpan}>
              标段名称：<span title={item.projectName}>{item.projectName}</span>
            </span>
          </div>
          <div>
            <span className={styles.persentageDiv}>
              累计完成
              <div className={styles.persentageOutSide}>
                <div
                  className={styles.persentageInside1}
                  style={{
                    width: '78.6%',
                  }}
                ></div>
                <span>16354.66</span>
              </div>
              <span>78.6%</span>
            </span>
          </div>
          <div>
            <span className={styles.persentageDiv}>
              累计支付
              <div className={styles.persentageOutSide}>
                <div
                  className={styles.persentageInside2}
                  style={{
                    width: '64.23%',
                  }}
                ></div>
                <span>12543.22</span>
              </div>
              <span>64.23%</span>
            </span>
          </div>
          <div>
            <span className={styles.persentageDiv}>
              年度完成
              <div className={styles.persentageOutSide}>
                <div
                  className={styles.persentageInside3}
                  style={{
                    width: '22.35%',
                  }}
                ></div>
                <span>12543.22</span>
              </div>
              <span>22.35%</span>
            </span>
          </div>
          <div>
            <span className={styles.persentageDiv}>
              年度支付
              <div className={styles.persentageOutSide}>
                <div
                  className={styles.persentageInside4}
                  style={{
                    width: '43.55%',
                  }}
                ></div>
                <span>12543.22</span>
              </div>
              <span>43.55%</span>
            </span>
          </div>
        </div>
      ));

    const mapToRateCard =
      roadData &&
      roadData.length > 0 &&
      roadData.map(item => (
        <div
          id={currentKey == '3' ? item.contractId : ''}
          className={styles.card}
          style={{ border: this.state.anchorId == item.contractId ? '1px solid rgba(83,161,228,0.85)' : 'none' }}
          onClick={() => {
            this.setState({
              anchorId:item.contractId
            })
            directToMarker(item.contractId)
          }}
        >
          <div>
            <span className={styles.ellipsisSpan}>
              标段名称：<span title={item.projectName}>{item.projectName}</span>
            </span>
          </div>
          <div>
            <span className={styles.persentageDiv}>
              开累产值
              <div className={styles.persentageOutSide}>
                <div
                  className={styles.persentageInside5}
                  style={{
                    width: '78.6%',
                  }}
                ></div>
                <span>16354.66</span>
              </div>
              <span>78.6%</span>
            </span>
          </div>
          <div>
            <span className={styles.persentageDiv}>
              年度产值
              <div className={styles.persentageOutSide}>
                <div
                  className={styles.persentageInside6}
                  style={{
                    width: '64.23%',
                  }}
                ></div>
                <span>12543.22</span>
              </div>
              <span>64.23%</span>
            </span>
          </div>
          <div>
            <span className={styles.persentageDiv}>
              季度产值
              <div className={styles.persentageOutSide}>
                <div
                  className={styles.persentageInside7}
                  style={{
                    width: '22.35%',
                  }}
                ></div>
                <span>12543.22</span>
              </div>
              <span>22.35%</span>
            </span>
          </div>
          <div>
            <span className={styles.persentageDiv}>
              月度产值
              <div className={styles.persentageOutSide}>
                <div
                  className={styles.persentageInside8}
                  style={{
                    width: '43.55%',
                  }}
                ></div>
                <span>12543.22</span>
              </div>
              <span>43.55%</span>
            </span>
          </div>
        </div>
      ));
    const mapToQualityCard =
      roadData &&
      roadData.length > 0 &&
      roadData.map(item => (
        <div
          id={currentKey == '4' ? item.contractId : ''}
          className={styles.card}
          style={{ border: this.state.anchorId == item.contractId ? '1px solid rgba(83,161,228,0.85)' : 'none' }}
          onClick={() => {
            this.setState({
              anchorId:item.contractId
            })
            directToMarker(item.contractId)
          }}
        >
          <div>
            <span className={styles.ellipsisSpan}>
              标段名称：<span title={item.projectName}>{item.projectName}</span>
            </span>
          </div>
          <div>
            <span className={styles.ellipsisSpan50}>
              实施中：<span>{'1234'}</span>
            </span>
            <span className={styles.ellipsisSpan50}>
              已验收：<span>{'1234'}</span>
            </span>
          </div>
          <div>
            <span className={styles.title}>分项工程评定</span>
            <span className={styles.persentageDiv}>
              <div className={styles.persentageOutSide} style={{ margin: '9px 10px 9px 0px' }}>
                <div
                  className={styles.persentageInside9}
                  style={{
                    width: '64.23%',
                  }}
                ></div>
                <span>5000/5568</span>
              </div>
              <span>93.42%</span>
            </span>
          </div>
          <div>
            <span className={styles.title}>质量隐患</span>
            <span className={styles.persentageDiv}>
              <div className={styles.persentageOutSide} style={{ margin: '9px 10px 9px 0px' }}>
                <div
                  className={styles.persentageInside10}
                  style={{
                    width: '77.23%',
                  }}
                ></div>
                <span>66/80</span>
              </div>
              <span>77.42%</span>
            </span>
          </div>
        </div>
      ));

    const mapToSafeCard =
      roadData &&
      roadData.length > 0 &&
      roadData.map(item => (
        <div
          id={currentKey == '5' ? item.contractId : ''}
          className={styles.card}
          style={{ border: this.state.anchorId == item.contractId ? '1px solid rgba(83,161,228,0.85)' : 'none' }}
          onClick={() => {
            this.setState({
              anchorId:item.contractId
            })
            directToMarker(item.contractId)
          }}
        >
          <div>
            <span className={styles.ellipsisSpan}>
              标段名称：<span title={item.projectName}>{item.projectName}</span>
            </span>
          </div>
          <div>
            <span className={styles.ellipsisSpan50}>
              平安工地：<span>{'86.66'}</span>
            </span>
            <span className={styles.ellipsisSpan50}>
              环水保专项：<span>{'88.35'}</span>
            </span>
          </div>
          <div>
            <span className={styles.title}>危险源状态</span>
            <span className={styles.persentageDiv}>
              <div className={styles.persentageOutSide} style={{ margin: '9px 10px 9px 0px' }}>
                <div
                  className={styles.persentageInside11}
                  style={{
                    width: '20.42%',
                  }}
                ></div>
                <span>20/108</span>
              </div>
              <span>20.42%</span>
            </span>
          </div>
          <div>
            <span className={styles.title}>安全隐患</span>
            <span className={styles.persentageDiv}>
              <div className={styles.persentageOutSide} style={{ margin: '9px 10px 9px 0px' }}>
                <div
                  className={styles.persentageInside12}
                  style={{
                    width: '77.23%',
                  }}
                ></div>
                <span>66/80</span>
              </div>
              <span>77.42%</span>
            </span>
          </div>
          <div>
            <span className={styles.title}>环水保隐患</span>
            <span className={styles.persentageDiv}>
              <div className={styles.persentageOutSide} style={{ margin: '9px 10px 9px 0px' }}>
                <div
                  className={styles.persentageInside10}
                  style={{
                    width: '77.23%',
                  }}
                ></div>
                <span>66/80</span>
              </div>
              <span>77.42%</span>
            </span>
          </div>
        </div>
      ));

    return (
      <div>
        <div
          className={styles.rightSideIcon}
          style={{ display: this.state.visible ? 'none' : 'block' }}
          onClick={showInfoBox}
        >
          <Icon type="left" style={{ color: '#fff', lineHeight: 3.5, paddingLeft: 3 }} />
        </div>
        <div className={visible ? styles.rightSideSlider : styles.rightSideSliderOff}>
          <div className={styles.tabLine} style={{ display: visible ? 'inline-flex' : 'none' }}>
            <div className={styles.line} />
            <div className={styles.square} />
          </div>
          <Tabs
            defaultActiveKey="1"
            size="small"
            tabBarGutter={0}
            tabBarStyle={{ marginBottom: 0, color: '#fff', borderBottom: 'none' }}
            onChange={activeKey => {
              this.setState({ currentKey: activeKey });
              setTimeout(() => {
                this.scrollToCard(this.state.anchorId);
              }, 500);
            }}
            tabBarExtraContent={
              <Icon
                type="close"
                style={{
                  color: '#797979',
                }}
                onClick={onClose}
              />
            }
          >
            <Tabs.TabPane tab="标段" key="1">
              <div style={{ height: '100%', overflow: 'auto' }}>{mapToInfoCard}</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="费用" key="2">
              <div style={{ height: '100%', overflow: 'auto' }}>{mapToFeeCard}</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="进度" key="3">
              <div style={{ height: '100%', overflow: 'auto' }}>{mapToRateCard}</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="质量" key="4">
              <div style={{ height: '100%', overflow: 'auto' }}>{mapToQualityCard}</div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="安全" key="5">
              <div style={{ height: '100%', overflow: 'auto' }}>{mapToSafeCard}</div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default RightSideInfoDrawer;
