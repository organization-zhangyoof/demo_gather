//全局model
export default {
  namespace: 'global',
  state: {
    message:{}
  },
  subscriptions: {
    getGlobalData(e) {
      const {dispatch, history} = e;
    },
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
      })
    },
    //监听iframe传递的信息
    onIframeMessage({ dispatch, history }) {
      window.addEventListener('message', function (e) {
        try {
          let message = JSON.parse(e.data);
        //   console.info(message, '====+++++++++++++++++====>监听iframe窗口信息');
          if (message.isHandleBimWidth) {
              document.getElementById('bimBox').style.display='block';
          }
          dispatch({
            type: 'setState',
            payload: {
              message
            }
          })
        } catch (e) { }
      });
    },
  },

  effects: {

    
  },
  reducers: {
    setState(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
  }
}
