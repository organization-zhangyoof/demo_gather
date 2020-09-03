/**
 * Created by JetBrains WebStorm.
 * Author: zhazihong
 * Date: 2020/9/2
 * Time: 10:50
 * Desc: models
 */
export default {
  namespace: 'todoList',
  state: {
    visible: false,
    todoList: [{
      key: 1,
      name: '小明',
      age: '23',
      address: 'xian-address',
    }],
    fields: {
      key: '',
      name: '',
      age: '',
      address: '',
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    // 添加 or 编辑
    * addTodoList({ payload = {} }, { call, put, select }) {
      let todoList = (yield select(state => state.todoList)).todoList;
      let param = {};
      if (payload['key']) {
        const index = todoList.findIndex((item) => item.key === payload.key);
        todoList[index] = { ...todoList[index], ...payload };
        payload = { todoList };
      } else {
        param = { todoList: [...todoList, { ...payload, key: new Date().getTime() }] };
      }
      yield put({
        type: 'updateState',
        payload: {...param, visible: false},
      });
    },

    // 删除
    * delTodoListItem({ payload = {} }, { call, put, select }) {
      let todoList = (yield select(state => state.todoList)).todoList;
      const newData = todoList.filter(({ key }) => key !== payload.key);
      yield put({ type: 'updateState', payload: { todoList: newData } });
    },

    // 设置form表单数据
    * setFields({ payload = {} }, { call, put, select }) {
      let fields = (yield select(state => state.todoList)).fields;
      const isInitFields = JSON.stringify(payload) === '{}';
      if (isInitFields) {
        payload = {
          name: '',
          age: '',
          address: '',
          key: '',
        };
      }
      yield put({ type: 'updateState', payload: { fields: { ...fields, ...payload }} });
    },
  },

  subscriptions: {},
};
