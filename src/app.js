import * as $$ from './utils/commonFunction';
import { customNotice } from './utils/commonFunction';
import { localDbGetItem } from './utils/localDbFuns';
import {message} from 'antd'
import localforage from 'localforage'
function funMod () {
//   message.success = (content)=>{
//     customNotice({"type":"success",message:content})
//   };
//   message.error = (content)=>{
//     customNotice({"type":"error",message:content})
//   };
//   message.info = (content)=>{
//     customNotice({"type":"",message:content})
//   };
//   message.warning = (content)=>{
//     customNotice({"type":"",message:content})
//   };
//   message.warn = (content)=>{
//     customNotice({"type":"",message:content})
//   };
}

// 自定义 render，比如在 render 前做权限校验
export function render(oldRender) {
  funMod();
  console.log(27)
  window.addEventListener('load',async function (e) {
    console.log('localforage is: ', localforage)
    const url = decodeURI(decodeURI(window.location.search));
    // localforage.getItem('somekey222', function(err, value) {
    //     // 当离线仓库中的值被载入时，此处代码运行
    //     console.log('value=====',value);
    // });
    let test = await localforage.getItem('__somekey123___') || []
    console.log('test====',test)
    localforage.removeItem('somekey').then(function() {
        // 当值被移除后，此处代码运行
        console.log('Key is cleared!');
    }).catch(function(err) {
        // 当出错时，此处代码运行
        console.log(err);
    });
    localforage.setItem('__somekey___', [{a:1,v:32}]).then(function (value) {
        // 当值被存储后，可执行其他操作
        console.log(value);
    }).catch(function(err) {
        // 当出错时，此处代码运行
        console.log(err);
    });
    console.log('test====sads-=-=-=-=-=-=-=-=-=-=',test)
    // window.__PARENT_URL__ = sessionStorage.parentUrl || $$.getUrlParam('referrer', url) || document.referrer;
    // window.__TOKEN___ = $$.getUrlParam('token', url) || sessionStorage.token;
    // window.__APPID__ = $$.getUrlParam('appId', url) || sessionStorage.appId;
    // window.__TENANTID__ = $$.getUrlParam('tenantId', url) || sessionStorage.tenantId;
    // window.__TITLE__ = $$.getUrlParam('title', url) || sessionStorage.title || '建设中心智慧建设平台';
    // window.__TYPE__ = $$.getUrlParam('type', url) || sessionStorage.type || '';

    

    oldRender()
  });
  //应用卸载时，清除各种缓存
  window.addEventListener('unload', () => {
      debugger
    var a_n = window.event.screenX - window.screenLeft;
    var a_b = a_n > document.documentElement.scrollWidth - 20;

    //关闭浏览器
    if (a_b && window.event.clientY < 0 || window.event.altKey) {

    } else {
    }
  });

}
