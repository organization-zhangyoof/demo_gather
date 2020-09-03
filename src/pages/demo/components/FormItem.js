import React from 'react'
import { Form, Input, Select, Button, Row, Icon } from 'antd';
const { Option } = Select;

class FormDemo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                <Form.Item label="name">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入姓名!' },
                        { max: 5, message: '姓名不能超过5个字符!' }],
                    })(
                        <Input />,
                    )}
                </Form.Item>
                <Form.Item label="age" >
                    {getFieldDecorator('age', {
                        rules: [{ required: true, message: '请输入年龄!' },
                        { max: 2,pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '只能输入数字并且不能超过两个字符!' }],
                    })(
                        <Input />,
                    )}
                </Form.Item>
                <Form.Item label="class" >
                    {getFieldDecorator('class', {
                        rules: [{ required: true, message: '请输入年级!' },
                        { max: 6, message: '班级不能超过6个字符!' }],
                    })(
                        <Input />,
                    )}
                </Form.Item>
                <Form.Item label="Gender">
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: '请选择性别!' }],
                    })(
                        <Select defaultValue="男">
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>,
                    )}
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(FormDemo)



