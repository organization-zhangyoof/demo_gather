import * as commonFunction from '@/utils/commonFunction';
import * as mapService from '../services/mapServices';

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
            yield put({ type :'getTspSiteList',payload : {} })
            yield put({ type :'getRoadData',payload : {} })
        },
        /**获取tsp工地列表 */
        *getTspSiteList({ }, { call, put, select }) {
            const res = yield call(mapService.getTspSiteList,{});
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

