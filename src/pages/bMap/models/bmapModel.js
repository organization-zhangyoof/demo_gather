import * as commonFunction from '@/utils/commonFunction';
import * as mapService from '../services/mapServices';
import localforage from 'localforage'
export default {
    namespace: 'map', // 构配件新增页
    state: {
        tspSiteList:[],
        roadData:[],
    },
    reducers: {
        // 更新状态
        setState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *initData({ }, { call, put, select }) {
            yield put({ type :'getRoadData',payload : {} })
            yield put({ type :'getDangereData',payload : {} })
            yield put({ type :'testData',payload : {} })
        },
        *testData({ }, { call, put, select }) {
            // let test =  localforage.getItem('__somekey___').then(res=>{
            //     console.log(res)
            // })          

            const aaa = () =>{

                return localforage.getItem('__somekey___')

            }

            const res = yield call(aaa);
            console.log('testData=========',res)
        },
        /**获取危险源点位 */
        *getDangereData({ }, { call, put, select }) {
            const res = yield call(mapService.getDangereData,{});
            debugger
            // console.log("工地列表返回====>>>>",res)
            if(res.code == 200){
                yield put({ type: 'setState', payload: { tspSiteList: res.data } })
            }
        },
        /**获取道路点 */
        *getRoadData({ }, { call, put, select }) {
            const res = yield call(mapService.getRoadData,{});
            // console.log("工地列表返回====>>>>",res)
            if(res.code == 200){
                yield put({ type: 'setState', payload: { roadData: res.data } })
            }
        },
        /**获取视频监控点位 */
        *getMonitorData({ }, { call, put, select }) {
            const res = yield call(mapService.getRoadData,{});
            // console.log("工地列表返回====>>>>",res)
            if(res.code == 200){
                yield put({ type: 'setState', payload: { roadData: res.data } })
            }
        },
        /**获取驻地场站点位 */
        *getStationData({ }, { call, put, select }) {
            const res = yield call(mapService.getRoadData,{});
            // console.log("工地列表返回====>>>>",res)
            if(res.code == 200){
                yield put({ type: 'setState', payload: { roadData: res.data } })
            }
        },
        /**获取全景点位 */
        *getPanoramicData({ }, { call, put, select }) {
            const res = yield call(mapService.getRoadData,{});
            // console.log("工地列表返回====>>>>",res)
            if(res.code == 200){
                yield put({ type: 'setState', payload: { roadData: res.data } })
            }
        },
        /**获取关键工程点位 */
        *getKeyProjectData({ }, { call, put, select }) {
            const res = yield call(mapService.getRoadData,{});
            // console.log("工地列表返回====>>>>",res)
            if(res.code == 200){
                yield put({ type: 'setState', payload: { roadData: res.data } })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/bMap') {
                    dispatch({ type: 'initData', payload: {} });
                }
            });
        },
    }
};

