/*
 * @Author: 寇晓丽
 * @Date: 2020-09-02 11:22:34
 */
import React, { Component } from 'react'
import { connect } from 'dva';
import FormDemo from './components/FormItem'
import { Form, Input, Select, Button, Row, Table, Divider, Modal, message } from 'antd';
import styles from './demo.less'
class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { dispatch, demo } = this.props
        const { list, visible, type, selectValue, editFillBackInfo } = demo

        // {   this.props里面的内容
        //     children: null
        //     computedMatch: { path: "/demo", url: "/demo", isExact: true, params: { … } }
        //     demo: { age: 12, name: "张三" }
        //     dispatch: ƒ(action)
        //     history: { length: 7, action: "POP", location: { … }, createHref: ƒ, push: ƒ, … }
        //     location: { pathname: "/demo", search: "", hash: "", query: { … }, state: undefined, … }
        //     match: { path: "/demo", url: "/demo", isExact: true, params: { … } }
        //     route: { path: "/demo", component: { … }, exact: true, _title: "route-demo", _title_default: "route-demo" }
        //     staticContext:
        // }
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'class',
                key: 'class',
                dataIndex: 'class',
            },
            {
                title: 'gender',
                key: 'gender',
                dataIndex: 'gender',
            },

        ];
        //model相关参数
        const modalParams = {
            visible,
            title: type === 'add' ? '新增' : '编辑',
            onOk: () => {
                let form = this.refs.getFormVlaue;//通过refs属性可以获得对话框内form对象
                form.validateFields((err, values) => {
                    if (!err) {
                        form.resetFields()
                        const userInfo = { ...values }
                        userInfo.key = new Date().getTime()
                        if (type === 'add') {  //新增
                            dispatch({ type: 'demo/add', payload: { ...userInfo } })
                        } else {
                            dispatch({ type: 'demo/edit', payload: { editId: selectValue[0], userInfo } })
                        }
                    }
                })
            },
            onCancel: () => {
                let form = this.refs.getFormVlaue;
                form.resetFields()
                dispatch({ type: 'demo/updateState', payload: { visible: false } })
            }

        }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let selectValue = []
                for (let index = 0; index < selectedRows.length; index++) {
                    selectValue.push(selectedRows[index].key)
                }
                dispatch({ type: 'demo/updateState', payload: { selectValue } })
            },
        };
        const tableParams = {
            rowSelection,
            columns,
            dataSource: list,
            tableLayout:'auto',
            bordered:true
        }
        //添加
        const addBtnParams = {
            onClick: () => {
                dispatch({ type: 'demo/updateState', payload: { visible: true, type: 'add' } })
            }
        }
        //编辑
        const editBtnParams = {
            onClick: () => {
                if (selectValue.length > 1 || selectValue.length === 0) {
                    message.info('请选择一条需要编辑的数据');
                } else {
                    let form = this.refs.getFormVlaue;
                    list.map((item, index) => {
                        console.log(">>>>>>>>>>itemitemitem",item)
                        if (item.key === selectValue[0]) {
                            form.setFieldsValue({
                                name: item.name, age: item.age,class:item.class,gender:item.gender
                            })
                        }
                    })
                    dispatch({ type: 'demo/updateState', payload: { visible: true, type: 'edit', editId: selectValue[0] } })
                }
            }
        }
        const deleteBtnParams = {
            onClick: () => {
                if (selectValue.length === 0) {
                    message.info('请至少选择一条需要删除的数据');
                } else {
                    dispatch({ type: 'demo/delete', payload: {} })
                }
            }
        }
        //视图里面业务处理尽量摘出来,让视图看起来简单,干净
        return (
            <div className={styles.layout}>
                <div className={styles.btnBox}>
                    <Button type="primary" className={styles.btn} {...addBtnParams}>新增</Button>
                    <Button className={styles.btn} {...deleteBtnParams}>删除</Button>
                    <Button className={styles.btn} {...editBtnParams}>编辑</Button>
                </div>
                <Table {...tableParams} />
                <Modal {...modalParams}>
                    <FormDemo ref="getFormVlaue" />
                </Modal>
            </div>
        )
    }
}
function mapStateToProps({ demo }) { //形参接收一个全局state,结构出来需要的model
    return { demo };
}
export default connect(mapStateToProps)(Demo);




