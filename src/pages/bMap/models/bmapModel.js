import * as commonFunction from '@/utils/commonFunction';
import * as mapService from '../services/mapServices';
import * as mapData from '../services/roadData';
import localforage from 'localforage';
import { last } from 'lodash';
export default {
  namespace: 'map', // 构配件新增页
  state: {
    dangereData: [],
    roadData: [],
    monitorData: [],
    videoPoints:[],
    bimPoints:[]
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
    /**获取危险源点位 */
    *getDangereData({}, { call, put, select }) {
      const res = yield call(mapService.getDangereData, {});
      if (res.code == 200) {
        yield put({ type: 'setState', payload: { dangereData: res.data } });
      }
    },
    /**获取道路点 */
    *getRoadData({}, { call, put, select }) {
      const res = yield call(mapService.getRoadData2, {});
      if (res.code == 200) {
        let videoPoints = [], bimPoints = [];
        if (res.data && res.data.length > 0) {
          res.data.forEach(item => {
            videoPoints.push({
              pid:item.projectId,
              cid:item.contractId,
              isVideo:item.isVideo,
              latitude:item.roadNameList[Math.ceil(item.roadNameList.length*2/3)].latitude,
              longitude:item.roadNameList[Math.ceil(item.roadNameList.length*2/3)].longitude
            })
            bimPoints.push({
              pid:item.projectId,
              cid:item.contractId,
              isBim:item.isBim,
              latitude:item.roadNameList[Math.ceil(item.roadNameList.length*1/3)].latitude,
              longitude:item.roadNameList[Math.ceil(item.roadNameList.length*1/3)].longitude
            })
          });
        }
        yield put({
          type: 'setState',
          payload: {
            roadData: res.data,
            videoPoints,
            bimPoints
          },
        });
      }
    },
    /**获取视频监控点位 */
    *getMonitorData({}, { call, put, select }) {
      const res = yield call(mapService.getMonitorData, {});
      if (res.code == 200) {
        yield put({ type: 'setState', payload: { monitorData: res.data } });
      }
    },
    /**获取驻地场站点位 */
    *getStationData({}, { call, put, select }) {
      const res = yield call(mapService.getRoadData, {});
      // console.log("工地列表返回====>>>>",res)
      if (res.code == 200) {
        yield put({ type: 'setState', payload: { roadData: res.data } });
      }
    },
    /**获取全景点位 */
    *getPanoramicData({}, { call, put, select }) {
      const res = yield call(mapService.getRoadData, {});
      // console.log("工地列表返回====>>>>",res)
      if (res.code == 200) {
        yield put({ type: 'setState', payload: { roadData: res.data } });
      }
    },
    /**获取关键工程点位 */
    *getKeyProjectData({}, { call, put, select }) {
      const res = yield call(mapService.getRoadData, {});
      // console.log("工地列表返回====>>>>",res)
      if (res.code == 200) {
        yield put({ type: 'setState', payload: { roadData: res.data } });
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
  },
};
