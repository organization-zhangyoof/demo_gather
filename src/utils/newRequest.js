import Axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
Axios.defaults.timeout = 30000;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.withCredentials = true;

/**
 * 公共请求
 *
 * @param type 请求方法，默认为get
 * @param url 请求的URL
 * @param params 请求的参数
 * @param isToast 是否提示返回的信息， 0为不提示，1为只提示成功信息，2为只提示错误信息，3为提示成功和错误信息
 * @param api 将自动加在url前面，除非url是一个绝对的URL，是为了便于传递相对URL，默认为config.ROOT_API
 */
var _http = function(type, url, params, isToast, api, responseType = 'text', isUpload = false) {
    type = type || 'get';
    if (!url)
        throw new Error('请指定url');
    var obj = {};
    // params = Object.prototype.toString.call(params) === '[object Object]' ? params : {};
    if (type === 'get') {
        obj.method = 'get';
        obj.url = url;
        obj.responseType = responseType;
        obj.params = params;
    } else if (type === 'post') {
        obj.method = 'post';
        obj.url = url;
        obj.responseType = responseType;
        params = !isUpload ? qs.stringify(params) : params;
        obj.data = params;
    } else {
        throw new Error('请指定请求方式');
    }
    var instance = Axios.create();
    instance.interceptors.request.use(config => {
        config.headers['Authorization'] = window.__TOKEN___ || sessionStorage.token || "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiI4NWM4NWIyMzBhMmY0NjE4ODAzNmQ1NWM4NmJhZWZlMCIsImVtYWlsIjoieXRfeWhfc2dyeUAxNjMuY29tIiwibmFtZSI6IuaWveW3peS6uuWRmOeUqOaItyIsInVzZXJuYW1lIjoieXRfeWhfc2dyeSIsInBob25lTnVtYmVyIjoiMTU5MDAwMjAwMDIiLCJhY2NvdW50VHlwZSI6IlBFUlNPTkFMIiwidXNlcklkIjoiN2EzMTI5ZDk2ZmZlNGExOWFiNDZhYWQzNWJhMzlmZmUiLCJjb21wYW55SWQiOiI1ZjdjMTk4ZWIwMjk0MWRiOWMwNjhlM2MzMTE0NGQ5ZCIsImNvbXBhbnlOYW1lIjoi5p2o5rab55qE5rWL6K-V5pa95bel5Y2V5L2NIiwianRpLXV1aWQiOiJqdGktYzM5OTRhZGUtMzA0Mi00ZjQyLWJiOWQtNjM1NDA2MDI2YjYxIiwiZXhwIjoxNjE0MDExMTEwfQ.lIyC4Tps9dAAsUm2JnUsECDKdJpcq26-ZcRqcQxaOBg"
        isUpload && (config.headers['content-type'] = 'multipart/form-data');
        return config;
    }, error => {
        return Promise.reject(error);
    });
    instance.interceptors.response.use(response => {
        return response;
    }, error => {
        // return response;
        // return Promise.reject(error);
        return Promise.resolve(error);
    });

    var __promise = new Promise((resolve, reject) => {
        instance.request(obj).then(res => {
            debugger
            /**
             * 正常请求和缓存
             */
            if (res.status == 200 || res.status == 304) {
                if (res.data.code == 'SUCCESS' || res.data.code == '200' || res.data.code == '201' || res.data.code == '202' || res.data.code == '204' || typeof res.data === 'boolean') {
                    (isToast == 1 || isToast == 3) && message.info(res.data.message && res.data.message || '请求成功');
                    return resolve(res.data);
                } else {
                    (isToast == 2 || isToast == 3) && message.warning(res.data.message && res.data.message || '请求错误');
                    return resolve(res.data);
                  }
                }
            message.error('请求失败');
            reject(res.data);
        }, err => {
            debugger
            let parseError = JSON.parse(JSON.stringify(err));
            /**
             * 无权限处理
             */
            let code = parseError.response.status;
            if (code == 401) {
                return window.app._store.dispatch({
                    type: 'global/getUngrantInfo'
                })
            }
            /**
             * 客户端错误
             */
            if (code >= 400 && code < 500) {
                message.error('客户端异常');
            }

            /**
             * 服务端错误
             */
            if (code >= 500) {
                message.error('服务端异常1');
            }

            /**
             * 超时终止
             */
            if (code == 'ECONNABORTED') {
                message.error('请求超时');
            }
            reject(code);
        }).catch(e => {
            console.log('qqqqq',e)
            // message.error('服务端异常2');
            reject('服务端异常3');
            resolve(e)
        });
    });
    return __promise;
}

export default _http;
