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
import {connect} from 'dva';
import ModalView from "@/pages/page5/component/ModalView";

class Page5 extends Component {

  render() {
    const { dispatch, list, visible,editIndex} = this.props

    const columns = [
      {
        title: '姓名',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '设置',
        render: (text, record, index) => (
          <span>
            <Button type="primary" onClick={() => {
              const { nickname,phone } = record
              dispatch({type: 'page5/edit', payload: {index}})
              this.refs.ModalView.setFieldsValue({nickname, phone})
            }}>编辑</Button>
            <Button type="danger" onClick={() => {
              dispatch({
                type: 'page5/changeList',
                payload: {type: 'delete', index}
              })
            }}>刪除</Button>
          </span>

        ),
      },
    ];

    const buttonParams = {
      type: "primary",
      onClick: () =>{
        dispatch({type: 'page5/changeVisible', payload: {visible: true}})
        this.refs.ModalView.resetFields()
      }
    }

    const ModalParams = {
      visible: visible,
      onOk: (value) => {
        if(editIndex===-1){
          dispatch({type: 'page5/changeList', payload: {type: 'add', value}})
        }else{
          dispatch({type: 'page5/changeList', payload: {type: 'edit', value}})
        }
        dispatch({type: 'page5/changeVisible', payload: {visible: false}})
      },
      onCancel: () => {
        dispatch({type: 'page5/changeVisible', payload: {visible: false}})
      }
    }

    return (
      <div style={{width: '100%', height: '100%', background: '#FAE5E5'}}>
        <h1>this is page5</h1>
        <Button {...buttonParams}>新增</Button>
        <ModalView{...ModalParams} ref='ModalView'/>
        <Table dataSource={list} columns={columns}/>
      </div>
    )
  }
}

const mapStateToProps = ({page5, page55}) => ({...page5, ...page55})

export default connect(mapStateToProps)(Page5);
