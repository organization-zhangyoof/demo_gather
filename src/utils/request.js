import Axios from 'axios';
import qs from 'qs';
import {customNotice} from "./commonFunction";

Axios.defaults.timeout = 600000; // 模型解析及pw文件传输耗时较长
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.withCredentials = true;

const request = function (type, url, params, isToast, responseType = 'json',isStringfy = true) {
  type = type || 'get';
  if (!url) {
    throw new Error('请指定url');
  }
  let obj = {};
  params = (Object.prototype.toString.call(params) === '[object Object]' || Object.prototype.toString.call(params) === '[object Array]')? params : {};;
  if (type === 'get') {
    obj.method = 'get';
    obj.url = url;
    obj.params = params;
    obj.responseType = responseType;
  } else if (type === 'post') {
    obj.method = 'post';
    obj.url = url;
    if(isStringfy){
      params = qs.stringify(params);
    }
    obj.data = params;
    obj.responseType = responseType;
  }  else if (type === 'postBody') {
    obj.method = 'post';
    obj.url = url;
    obj.data = params;
    obj.responseType = responseType;
  }else {
    throw new Error('请指定请求方式');
  }
  const instance = Axios.create();
  // 当创建实例的时候，拦截器放在default无效
  instance.interceptors.request.use((config) => {
    // 不能使用null，否则会将token的值变成'null'
    config.headers.Authorization = window.__TOKEN___ || 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiI5YmQ0ZDNlZjRjZmY0OWRjYWRiNTc4ODFlNjczZmU2ZSIsImVtYWlsIjoiMTg2MjIyMjIyMjJAMTYzLmNvbSIsIm5hbWUiOiJseSIsInVzZXJuYW1lIjoibHl0ZXN0MDEiLCJwaG9uZU51bWJlciI6IjE4NjIyMjIyMjIyIiwiYWNjb3VudFR5cGUiOiJQRVJTT05BTCIsInVzZXJJZCI6IjJhMmJjNjVlZmRjZjQxN2Y4Y2M1Yjk0ZDMwMzc2NTY4IiwiY29tcGFueUlkIjoiMTkzY2VjODVmY2M2NDhmZThmYTczZGY1MTZiOTQzZTUiLCJjb21wYW55TmFtZSI6IuS4reWbveS4remTgeiCoeS7veaciemZkOWFrOWPuOWSjOS4remTgeWbm-WxgOmbhuWbouaciemZkOWFrOWPuOWSjOS4iua1t-W4gumap-mBk-W3peeoi-i9qOmBk-S6pOmAmuiuvuiuoeeglOeptumZouiBlOWQiOS9kyIsImV4cCI6MTYwMDcyNDYwOH0.sWfLceVnVCFJjIPlsKqfxT6TdCiXQ2vGrQ6tMeOLfK0&appId=92154bbabd344156962e320a6927cac9&tenantId=ae5683314e5c48b3b8eb1df2dac4c6fa&referrer=http://cloud-test.gcnao.cn&tiitle=%E6%99%BA%E6%85%A7%E5%BB%BA%E8%AE%BE%E5%B9%B3%E5%8F%B0%EF%BC%88%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83%EF%BC%89';
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use((response) => response, (error) => Promise.reject(error));

  return new Promise((resolve, reject) => {
    instance.request(obj)
    .then((res) => {
      if (res.status == 200) {
        /**
         * 如果返回的事blob 则直接返回
         */
        if (res.data instanceof Blob) {
          return resolve(res);
        }
        /**
         * 无权限处理
         */
        if (res.data.code == 401) {
          customNotice({ type:'error', message: res.data.message && res.data.message || '你无权限', description: ''});
          return window.g_app._store.dispatch({type: 'global/getUngrantInfo', params: {}});
        }

        /**
         * 有权请求
         */
        //以前平台的接口(项目模块) 用的是res.data.code === 'SUCCESS'
        if (res.data.code == '200' || res.data.code == '201' || res.data.code == '202' || res.data.code == '204' || res.data.code === 'SUCCESS') {
          isToast && customNotice({ type:'success', message: res.data.message && res.data.message || '请求成功', description: ''});
          return resolve(res.data);
        } else {
          isToast && customNotice({ type:'error', message: res.data.message && res.data.message || '请求错误', description: ''});
          return resolve(res.data);
        }
      }
      customNotice({ type:'error', message: '请求失败', description: ''});
      reject(res.data);
    }, (err) => {
      let parseError = JSON.parse(JSON.stringify(err));
      let code = parseError.response.status;
      if (code == 401) {
        return window.g_app._store.dispatch({type: 'global/getUngrantInfo', params: {}});
      }
      if (code >= 500) {
        customNotice({ type:'error', message: '服务端异常', description: ''});
      }
      if (code == 'ECONNABORTED') {
        customNotice({ type:'error', message: '请求超时', description: ''});
      }
      reject(code);
    })
    .catch((e) => {
      customNotice({ type:'error', message: '异常', description: ''});
      reject(e);
    });
  });
};

export default request;
