export default {
    namespace: 'demo', //要保证namespace的唯一性
    state: {
        type:'add',
        visible:false,
        list: [],
        selectValue:[],
        editId:''
    },
    //Reducer 是 Action 处理器，
    //用来处理同步操作，只修改state的值。
    //里面可以加多个方法,会一次执行,第一个形参是state,第二个是一个action {type: "demo/updateState", payload: {visible: true, type: "add"}}
    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        }
    },
    //Effect 是一个 Generator 函数，异步以及复杂逻辑的处理,最终修改state还是在reducers里面
    //内部使用 yield 关键字，标识每一步的操作（不管是异步或同步）。
    //select获取state值  
    //call处理异步,会把结果return回来  
    //put发出一个action,作用感觉应该跟dispatch一样
    effects: {
        //新增
        *add({ payload }, { select, put, call }) {
            const { list } = yield select(state => state.demo)
            list.push(payload)
            yield put({ type: 'updateState', payload: { list,visible: false } })
        },
        //删除
        *delete({ payload}, { select, put, call }) {
            let { list,selectValue } = yield select(state => state.demo)
            let newList = []
            newList = list.filter((item) => {
                const key=item.key
                return selectValue.indexOf(key)===-1
            })
            yield put({ type: 'updateState', payload: { list: newList,selectValue:[] } })
        },
        //编辑
        *edit({ payload }, { select, put, call }) {
            let { list } = yield select(state => state.demo)
            list.map((item,index)=>{
                if(item.key===payload.editId){
                    list[index]=payload.userInfo
                }
            })
            yield put({ type: 'updateState', payload: { list,visible: false,selectValue:[] } }) 
        }
    },
    //Subscription 用于订阅一个数据源，然后根据条件 dispatch 需要的 action。
	//数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
    subscriptions: {},
}