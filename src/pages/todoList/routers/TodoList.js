/**
 * Created by JetBrains WebStorm.
 * Author: zhazihong
 * Date: 2020/9/2
 * Time: 10:47
 * Desc: TodoList增删改查
 */
import React from 'react';
import { connect } from 'dva';
import styles from '@/pages/index.less';
import { Button, Modal } from 'antd';
import { TodoListTable } from '@/pages/todoList/components/TodoListTable';
import TodoListForm from '@/pages/todoList/components/TodoListForm';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 添加modal
    };
  }

  componentDidMount() {
  }

  render() {
    const { dispatch } = this.props;
    const { todoList, fields, visible } = this.props.todoList;
    const btnProps = {
      onClick: () => {
        dispatch({ type: 'todoList/setFields', payload: {} });
        dispatch({ type: 'todoList/updateState', payload: { visible: true } });
      },
      className: styles.btn,
    };
    const tableProps = {
      data: todoList,
      onDelClick: (key) => dispatch({ type: 'todoList/delTodoListItem', payload: { key } }),
      onEditClick: (item) => {
        dispatch({ type: 'todoList/setFields', payload: { ...item } });
        dispatch({ type: 'todoList/updateState', payload: { visible: true } });
      },
    };
    const modalProps = {
      title: 'Basic Modal',
      visible: visible,
      onCancel: () => {
        dispatch({ type: 'todoList/setFields', payload: {} });
        dispatch({ type: 'todoList/updateState', payload: { visible: false } });
      },
      footer: null,
    };
    const formProps = {
      fields: fields,
      handleOk: (item) => dispatch({ type: 'todoList/addTodoList', payload: { ...item } }),
    };
    return (
      <div style={{ padding: 15 }}>
        <Button {...btnProps}>添加</Button>
        {/* 表格 */}
        <TodoListTable {...tableProps}/>
        <Modal {...modalProps}>
          {/* 新增form */}
          <TodoListForm {...formProps}/>
        </Modal>
      </div>
    );
  }

}

function mapStateToProps({ todoList }) {
  return ({ todoList });
}

export default connect(mapStateToProps)(TodoList);
