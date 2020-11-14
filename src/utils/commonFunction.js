import { Select, Radio, notification, Icon } from 'antd';
import request from './request'
import _ from 'underscore';
import OSS from 'ali-oss';
const { Option } = Select;

const loadScript = (()=>{
	  let idCache = {};
	  return async function(id,url,flush) {
	    if (idCache[id] && !flush){
	      return
	    }else {
	      let script;
            script = await request('get',url,{random:Math.random()}, false,'text');
            if (script){
	        idCache[id]=id;
	        try{
	          let el = document.createElement('script');
	          el.innerHTML = script;
	          el.id = id;
	          el.src=url;
	          document.body.appendChild(el);
	        }catch(err){
	          console.log(err);
	        }

	      }else {
	        delete idCache[id];
	      }
	    }
	  }
	})();

export async function extendScript(extendArr) {
    console.log(extendArr);
    for(let js of extendArr){
    try{
      await loadScript(js.id,js.src);
    }catch (e){
      console.log(`加载js错误,url:${js.src},err:${e}`);
    }
  }
}

export const buildThrottle = (func,context,time)=>{
  return _.throttle(function(){
    func.apply(context,arguments);
  },time,{trailing:false})
};

export const deepCopyObject = (object)=>{
  return JSON.parse(JSON.stringify(object));
};

export function keyValueSelectOptionsBuild (list,keyName,valueName,disable=false) {
  var options = [];
  if (keyName && valueName){
    for (let index in list) {
      let one = list[index];
      options.push(<Select.Option disabled={disable} key={one[keyName]} title={one[valueName]} value={one[keyName]}>{one[valueName]}</Select.Option>)
    }
  }else {
    var keyArr = Object.getOwnPropertyNames(list).sort();
    for(let index in keyArr){
      let key = keyArr[index];
      let value = list[key];
      options.push(<Select.Option disabled={disable} key={key} title={value}  value={key}>{value}</Select.Option>)
    }
  }
  return options;
};

export function valueSelectOptionsBuild (list) {
  var options = [];
  for(let data of list){
      let key = data;
      let value = data;
      options.push(<Select.Option key={key} title={value}  value={key}>{value}</Select.Option>)
  }
  return options;
};

export function keyValueOptionsBuild (list,keyName,valueName,disable=false) {
  var options = [];
  if (keyName && valueName){
    for (let index in list) {
      let one = list[index];
      options.push(<Option disabled={disable} key={one[keyName]} title={one[keyName]} value={one[keyName]}>{one[valueName]}</Option>)
    }
  }else {
    var keyArr = Object.getOwnPropertyNames(list).sort();
    for(let index in keyArr){
      let key = keyArr[index];
      let value = list[key];
      options.push(<Option disabled={disable} key={key} title={value}  value={key}>{value}</Option>)
    }
  }
  return options;
};

export const onceInvoke = (()=>{
  let cache = {};
  return function(id,call){
    if (!id){
      throw new Error("id 不能为空");
    }
    if (!cache[id]){
      cache[id] = id;
      call();
    }
  }
})();
/**
 * 根据权限决定是否渲染指定元素
 * route 权限key
 * element 指定元素
 * ignore 如果为true则不执行权限控制
 */
export const accessElement = (()=>{
  let accessCache = null;

  return async function(route,element,ignore=false){
    let accessUrl =  window.__ROUTE_LIMIT_URL__;
    let menuId = window.__CURRENT_ROUTE_ID__;
    if (!accessCache){
      let {result:access}= await request('get', accessUrl, {menuId}, false);
      accessCache = access.map((a)=>a.route);
    }
    if (!ignore && accessCache){
      if (accessCache.contains(route)) {
        return element;
      }else {
        return "";
      }
    }else {
      return "";
    }
  }
})();

//自定义通知
export function customNotice({ type, message, description,duration = 3 }) {
    notification.config({
        top: 80,
      });
    if (type === 'success') {
        notification.success({
            icon: <Icon type='check-circle' style={{ color: '#52c41a' }} />,
            message,
            description,
            duration,
            style: {
                backgroundColor: '#f6ffed',
                border: '1px solid #b7eb8f',
            },
        });
    } else if (type === 'error') {
        notification.error({
            icon: <Icon type='close-circle' style={{ color: '#da350f' }} />,
            message,
            description,
            duration,
            style: {
                backgroundColor: '#fff1f0',
                border: '1px solid #ffa39e',
            },
        });
    } else {
        notification.info({
            icon: <Icon type='info-circle' style={{ color: '#1890ff' }} />,
            message,
            description,
            duration,
            style: {
                backgroundColor: '#e6f7ff',
                border: '1px solid #91d5ff',
            },
        });
    }
}
export function isString(val) { // 是否为字符串校验
    if (((typeof val === 'string') && val.constructor == String) && val != '') {
        return true;
    }
    return false;
}

export function isObject(values) { // 是否为对象
    if (values !== null && values !== undefined) {
        return (typeof values === 'object') && values.constructor === Object;
    }
    return false;
}

export function isArrayAndNotEmpty (val) { // 是否为数组且数组不为空
    if (Array.isArray(val) && val.length > 0) {
        return true;
    }
    return false;
}

/**
 *  判断字符串是否（undefined,null,空字符）
 * @param val 字符串
 * @returns {boolean}  true: 不为空; false: undefined,null,空字符串
 */
export function isNoEmpty(val) { //是否为空字符串
    if ( val && (typeof val === 'string' && val != '') ){
        return true;
    }
    return false;
}

/**
 * 获取url参数
 * @param {string} name 参数名称
 */

export const getUrlParam = (name, href)=>{
    let ret = '';
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = (href || window.location.search).substr(1).match(reg);
    if(r!=null) {
        ret = unescape(r[2]);
        if(!ret || ret == 'undefined' || ret == 'null'){
            ret = '';
        }
    }
    return ret;
}

export function tranKeyToVal(value, keys, vals) {
    // 转义键值
    // value: 需要转义的数据
    // keys : 转义所需要的所有数据源
    // vals : 转义所需要的所有数据结果
    // 数据源与数据结果均是对象，且对应转义键值的字段属性名要一致，数据结果要求有缺省字段defaults
    for (let [k, v] of Object.entries(keys)) {
        if (v === value) {
            return vals[k];
        }
    }
    return vals.defaults;
}


export function tranListToOption(list, keys, labels) { // 将数组转换为下拉框
    let node = [];
    if (Array.isArray(list)) {
        list.map((row, i) => {
            let { [keys]: key, [labels]: label } = row;
            node[node.length] = <Option key={key} value={key}>{label}</Option>;
        });
    }
    return node;
}

export function fillService (namespace,service) {
    for (let key in service) {
        service[key] = (data)=> {
            return {type: namespace + '/' + key, payload: data};
        }
    }
};


export function getFileTypeByFileName (fileName) {
    let lastDotIndex = fileName.lastIndexOf('.');
    let fileType = fileName.substr(lastDotIndex + 1,fileName.length);
    return fileType;
};



/**
 * 计算合并单元格的数据
 * data 列表数据
 * keys 要跨行的列 多列以逗号隔开
 */
export const calcCount = (data,keys) =>{
    let maps = {};
    data.forEach(d =>{
        keys.forEach(k=>{
            let key = k + '-' + d[k] ;
            if(!key) return
            if(maps[key]){
                maps[key]++;
            }else  maps[key] = 1;
        })
    });
    for(let i = 0;i<data.length;i++){
        keys.forEach(k=>{
            let key = k + '-' + data[i][k];
            if(maps[key]){
                data[i][k + 'RowSpan'] = maps[key];
                delete maps[key];
            }else data[i][k + 'RowSpan'] = 0;
        })
    }
    return data;
}
/**
 * page:当前页
 * pageSize：页大小
 * array：集合
 */
export const arrayPagination = (page,pageSize,array) =>{
    let offset = (page - 1) * pageSize;
    if(offset + pageSize >= array.length) return array.slice(offset,array.length)
    return array.slice(offset,offset + pageSize)
}
/**
 * obj: element 对象
 * id：element id
 */
export const elementScorll = (obj,id) =>{
    obj.divListItem = document.getElementById(id);
    if(obj.isScrollTop){
        if(--obj.divListItem.scrollTop <= 0){
            obj.isScrollTop = false;
        }
    }else{
        let oldScrollTop = obj.divListItem.scrollTop;
        obj.divListItem.scrollTop++;
        if(obj.divListItem.scrollTop <= oldScrollTop){
            obj.isScrollTop = true;
        }
    }
}
/**
 * obj: element 对象
 * startId：element id
 * endId：element id
 */
export const elementHorizonScorll = (obj,id,startId,endId) =>{
    obj.divListItem = document.getElementById(id);//
    obj.start = document.getElementById(startId);
    obj.end = document.getElementById(endId);
    if(obj.divListItem.clientWidth < obj.start.offsetWidth){//如果标题面板的宽度小于标题内容的长度，则复制一分标题，用于轮播图显示
        obj.end.innerHTML = obj.start.innerHTML;
    }
    if(obj.divListItem.scrollLeft>=obj.end.offsetWidth){
        obj.divListItem.scrollLeft = 0;
    }else{
        obj.divListItem.scrollLeft++;
    }
}
/**
 *  滚动条是否到达底部
 * return true  false
 */
export const isScorllBottom = (obj) =>{
    // console.log('obj.scrollHeight <= obj.scrollTop + obj.clientHeight'+'  '+obj.scrollHeight +'  '+ obj.scrollTop+'   '+obj.clientHeight);
    if(obj.scrollTop&&obj.scrollHeight <= obj.scrollTop + obj.clientHeight){
        return true;
    }
    return false;
}
/**
 * 获取当前屏幕分辨率
 */
export const getScreenResolution = (obj) =>{
    if(window.innerWidth >= 1920){
        obj.setStyle = obj.style1920
    } else if(window.innerWidth >= 1366 && window.innerWidth < 1920) {
        obj.setStyle = obj.style1366
    }else if(window.innerWidth < 1366) {
        obj.setStyle = obj.style1280
    }
}

/**
 * 获取当前屏幕类型
 */
export const getScreenType = () =>{
    if(window.innerWidth >= 1920){
        return '1920';
    } else if(window.innerWidth >= 1366 && window.innerWidth < 1920) {
        return '1366';
    }else if(window.innerWidth < 1366) {
        return '1280';
    }
}

export function uploadLargeFile(fileList = [], article, callback, progressFunc) {
  if (Array.isArray(fileList)) {
    const uploadCredit = { region: article.region, accessKeyId: article.accessKeyId, accessKeySecret: article.accessKeySecret, bucket: article.bucket };
    let client = new OSS(uploadCredit);
    const ossKeys = article.ossKeys;
    let totalSize = 0;
    let promiseArr = [];
    let saveFileList = [];
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList[i];
      const key = ossKeys[i];
      if (file.uid) {
        // saveFileList[i] = {uid:file.uid,fileName:file.name,size:file.size,fileType:file.fileType,id: key};
        saveFileList[i] = { "name": file.name, "type": file.fileType, "size": file.size, "id": key, "uid":file.uid,'key':key }
        let promise = client.multipartUpload(key,
          file,
          {
            progress: (progress) => {
              progressFunc(i, progress, file.size, totalSize);
            },
            headers: {
              'Content-Disposition':
                `attachment;filename=${encodeURIComponent(file.name)}`,
            },
          })
        promiseArr.push(promise);
      }
    }
    if (promiseArr.length !== 0) {
      Promise.all(promiseArr).then(() => {console.log("callback");callback(saveFileList)}).catch(e => {
        console.log(e);
      });
    }
  }
}

/**
 * 我的关注公共方法
 * namespace
 * selectedRows
 * source  模块名称
 * sourceRoute 页面路由
 */
export function submitFocusInfo(namespace, selectedRows, source, sourceRoute) {
  sessionStorage.namespace = namespace;
  sessionStorage.selectedRows = selectedRows;
  sessionStorage.source = source;
  sessionStorage.sourceRoute = sourceRoute;
}
