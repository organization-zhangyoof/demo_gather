import * as commonFunction from '@/utils/commonFunction';
import * as mapService from '../services/mapServices';
import localforage from 'localforage'
export default {
  namespace: 'video', // 构配件新增页
  state: {
    videoList:[],
    currentIndex:0,
    videoListVisible:false,
    videoPlayVisible:false,
    playTitle:''
  },
  reducers: {
    // 更新状态
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *initData({}, { call, put, select }) {
      yield put({ type: 'getRoadData', payload: {} });
      yield put({ type: 'getDangereData', payload: {} });
      yield put({ type: 'getMonitorData', payload: {} });
    },
    *getVideoList({ }, { call, put, select }) {
        debugger
        const res = yield call(mapService.getVideoList, {});
        console.log('rex====',res)
        if (res.code == 200) {
            let data = res.data || []
            if(data.length > 1){
                yield put({ 
                    type: 'setState', 
                    payload: { 
                        videoList: res.data ,
                        videoListVisible:true
                    } 
                });
            }else if(data.length == 1){
                yield put({ 
                    type: 'setState', 
                    payload: { 
                        videoList: res.data ,
                        currentIndex:0,
                        videoPlayVisible: true,
                        playTitle:res.data[0].name
                    } 
                });
            }
        }
    }
  },
};