import React, {Component} from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Modal,
  AutoComplete,
  Table,
  Divider
} from 'antd';
import {connect} from "dva";

const {Option} = Select;

class ModalView extends Component {
  constructor(props) {
    super(props);
  }

  onOk = () => {
    const form = this.props.form
    form.validateFields((err, value) => {
      if (!err) {
        this.props.onOk(value)
        form.resetFields()
      } else {
        console.log(err)
      }
    })
  }

  componentWillUpdate(e,a){
    console.log(111,e,a)
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal
        width={700}
        title="Basic Modal"
        visible={this.props.visible}
        onOk={(value) => this.onOk()}
        onCancel={() => this.props.onCancel()}
      >
        <div>
          <Form.Item
            label={
              <span>
              姓名&nbsp;
                <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
            }
          >
            {getFieldDecorator('nickname', {
              rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="电话号码">
            {getFieldDecorator('phone', {
              rules: [{required: true, message: 'Please input your phone number!'}],
            })(<Input style={{width: '100%'}}/>)}
          </Form.Item>
        </div>
      </Modal>


    )
  }
}

export default Form.create({name: 'jing'})(ModalView);
