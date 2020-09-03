export default {
  namespace: "page5",
  state: {
    visible: false,
    inputValue: '123',
    list: [],
    editIndex: -1
  },
  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    }
  },
  effects: {
    /*
    * put用来发送同步，
    * call发送同步
    * */
    * changeValue({payload}, {put}) {
      yield put({type: 'updateState', payload: {inputValue: payload.value}})
    },

    * changeList({payload}, {put, select}) {
      console.log(payload)
      let {editIndex, list} = yield select(state => state.page5)
      const {type, index, value} = payload
      console.log(index)
      let arr = []
      switch (type) {
        case "add":
          arr = [...list, ...[{nickname: value.nickname, phone: value.phone}]]
          break
        case 'delete':
          list.map((item, idx) => index !== idx ? arr.push(item) : null)
          break
        case 'edit':
          list.map((item, idx) => editIndex === idx ? arr.push({nickname: value.nickname, phone: value.phone}) : arr.push(item))
          yield put({type: 'updateState', payload: {editIndex: -1}})
          break
        default:
          arr = [...list]
          break
      }
      yield put({type: 'updateState', payload: {inputValue: payload.value, list: arr}})
    },

    * changeVisible({payload}, {put, select}) {
      yield put({type: 'updateState', payload: {visible: payload.visible,editIndex: -1}})
    },

    * edit({payload}, {put, select}) {
      console.log(payload)
      yield put({type: 'updateState', payload: {editIndex: payload.index,visible:true}})
    }
  },
  subscriptions: {//一開始就會執行的方法

  }
}
