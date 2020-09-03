/**
 * Created by JetBrains WebStorm.
 * Author: zhazihong
 * Date: 2020/9/2
 * Time: 15:55
 * Desc: Form
 */
import React from 'react';
import { Button, Form, Icon, Input } from 'antd';

class TodoListForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleOk({...this.props.fields, ...values});
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { form: { getFieldDecorator } , fields} = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
            initialValue: fields.name
          })(
            <Input
              prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="Name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('age', {
            rules: [{ required: true, message: 'Please input your age!' }],
            initialValue: fields.age
          })(
            <Input
              prefix={<Icon type="age" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="Age"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('address', {
            rules: [],
            initialValue: fields.address
          })(
            <Input
              prefix={<Icon type="address" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="Address"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit">
            {
              fields.key ? "保存" : "新增"
            }
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(TodoListForm);
