/**
 * Created by JetBrains WebStorm.
 * Author: zhazihong
 * Date: 2020/9/2
 * Time: 14:53
 * Desc: Table
 */
import React from 'react';
import { Table } from 'antd';

export class TodoListTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'delete',
        render: ({key}) => (<div onClick={() => this.props.onDelClick(key)}><a>删除</a></div>),
      },
      {
        title: 'Action',
        key: 'edit',
        render: (item) => (<div onClick={() => this.props.onEditClick(item)}><a>编辑</a></div>),
      }];

    return (
      <Table style={{ background: '#fff', marginTop: 20 }} columns={columns} dataSource={this.props.data}/>
    );
  }
}
