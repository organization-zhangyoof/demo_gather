import React, { Component } from 'react';
import { Calendar, Modal, Button, Badge, Select, Row, Col } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class CalendarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { calendarVisible, closeCalendar,projectI ,contractI ,sourceId } = this.props;
    let obj = {projectI ,contractI ,sourceId}
    let token = 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiI3NDk3MzVmMWVlNTk0ODYyYmI2YjI4YzIwZDljZmY4OSIsImVtYWlsIjoiMTM3NTE0MzAwMDFAcXEuY29tIiwibmFtZSI6IuWFrOi3r-a1i-ivleS4muS4uyIsInVzZXJuYW1lIjoiMTM3NTE0MzAwMDFhIiwicGhvbmVOdW1iZXIiOiIxMzc1MTQzMDAwMSIsImFjY291bnRUeXBlIjoiUEVSU09OQUwiLCJ1c2VySWQiOiJlOTVjZjY3ZDVkM2M0YzIwYWQ4MWQ3MGMwOWY1NGFlMCIsImNvbXBhbnlJZCI6IjM5Y2E2MWRmY2ZhYzQzZGNhOGQ1Y2RiMGYxY2ZkZGYxIiwiY29tcGFueU5hbWUiOiJJVOS4iemDqOS4muS4u-WNleS9jSIsImV4cCI6MTYwNjE1OTM5OX0.RZ8-aUHi2ClOyzyhJ7R3cKSx-JypJhAjV_qCc9omUCI'
    let url ="http://bimcloud.gcnao.cn:9001/safe/CheckCalendar?state=" + JSON.stringify(obj)+"&token="+ token
    return (
      <Modal
        visible={calendarVisible}
        width={700}
        title="巡查情况"
        onCancel={closeCalendar}
        bodyStyle={{ padding: '0px 20px' }}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button onClick={closeCalendar}>关闭</Button>
          </div>
        }
      >
        <iframe src={url}  style={{ width: '100%', height: '510px' }}></iframe>
        {/* <div style={{ width: '100%', height: '100%' }}>
          <Calendar
            fullscreen={false}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];
              const current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.monthsShort(current));
              }

              for (let index = start; index < end; index++) {
                monthOptions.push(
                  <Select.Option className="month-item" key={`${index}`}>
                    {months[index]}
                  </Select.Option>,
                );
              }
              const month = value.month();

              const year = value.year();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>,
                );
              }
              return (
                <div style={{ padding: 10 }}>
                  <Row type="flex">
                    <Col span={12}>
                      <Badge color="green" text="正常" style={{ paddingRight: 15 }} />
                      <Badge color="red" text="异常" />
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        onChange={newYear => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                        value={String(year)}
                        style={{ marginRight: 20 }}
                      >
                        {options}
                      </Select>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={String(month)}
                        onChange={selectedMonth => {
                          const newValue = value.clone();
                          newValue.month(parseInt(selectedMonth, 10));
                          onChange(newValue);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
            }}
          />
        </div> */}
      </Modal>
    );
  }
}

export default CalendarModal;
