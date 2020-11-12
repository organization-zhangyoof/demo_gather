/**设置模型区域的宽度
 * @params {number} width 模型区域宽度单位PX，不传则默认为窗口的一半
 **/
export function setBimWidth(width) {
  let bigBox = document.getElementById('bigBox');
  let boxOne = document.getElementById('boxOne');
  let boxTwo = document.getElementById('boxTwo');
  boxOne.style.width = width ? (bigBox.clientWidth - width)+'px' : bigBox.clientWidth/2 +'px'
  boxTwo.style.width = width ? width+'px' : bigBox.clientWidth/2+'px'
  boxTwo.style.display = 'block'
  window.__ISVISIBLE_BIM__ = true
  window.__finalWidth__ = width ? width : bigBox.clientWidth/2
}

/**关闭模型区域的窗口*/
export function closeBimWindow() {
  let bigBox = document.getElementById('bigBox');
  let boxOne = document.getElementById('boxOne');
  let boxTwo = document.getElementById('boxTwo');
  boxOne.style.width = bigBox.clientWidth+'px'
  boxTwo.style.width = bigBox.clientWidth+'px'
  boxTwo.style.display = 'none'
  window.__ISVISIBLE_BIM__ = false
}

/**
 * 打开指定项目合同段下的模型，若无合同段则打开该项目下的第一个合同段的模型
 * @params {string} projectId 项目ID
 * @params {string} contractId 合同段ID
 * @params {bool} openEntity 是否打开实体树（关联实体功能需要，其他地方调用不用传此参数）
 * @params {bool} queryEntityData 是否请求实体树数据（关联实体功能需要，其他可忽略）
 * @params {string} realend 结束时间，时间格式为2020-03-12（实际进度着色功能需要，其他可忽略）
 */
export function openModel({projectId: projectId, contractId: contractId, openEntity: openEntity, queryEntityData: queryEntityData, realend: realend}) {
  console.info(projectId, contractId, openEntity,queryEntityData, realend, '调用openModel')
  // console.info(window.frames, 'window.frames')
  // console.info(typeof window.frames, 'window.frames类型')
  // console.info(window.frames.length, 'window.frames.length')
  // for(let index =0; index <window.frames.length; index++){
  //   console.info(window.frames[index], 'window.frames['+index+']')
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'openModel',
      data: {
        projectId: projectId,
        contractId: contractId,
        openEntity: openEntity,
        queryEntityData: queryEntityData,
        realend: realend
      },
    }, '*');
  // }
}
/**
 * 构件定位（会根据传的项目合同段判断是否已加载该模型，若无则先加载模型，）
 * 根据传的projectId、contractId判断是否已加载该模型，若无则先加载模型
 * 判断模型窗口是否打开，若无则根据传的bimWidth设置模型窗口的宽度，不传则默认100
 * @params {string} projectId 项目ID
 * @params {string} contractId 合同段ID
 * @params {string} bimWidth 模型区域窗口宽度
 * @params {string} layerName 图层名称
 * @params {string} id 目标构件ID
 * @params {array} relativeObjs 关联图层
 * @params {bool} isHighLight 是否高亮目标图层和关联图层
 */
export function setViewToObj({projectId: projectId, contractId: contractId, bimWidth: bimWidth, layerName: layerName, id: id, relativeObjs: relativeObjs, isHighLight: isHighLight}) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'setViewToObj',
      data: {
        projectId: projectId,
        contractId: contractId,
        bimWidth: bimWidth,
        layerName: layerName,
        id: id,
        relativeObjs: relativeObjs,
        isHighLight: isHighLight
      },
    }, '*');
  // }
}

/**
 * 设置指定图层的构件颜色
 * @params {string} layerName 图层名称
 * @params {array} ids 该图层下的构件ID集合
 * @params {string} color 例如#000
 */
export function setObjsColor({layerName: layerName, ids: ids, color: color}) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'setObjsColor',
      data: {
        layerName: layerName,
        ids: ids,
        color: color
      },
    }, '*');
  // }
}

/**
 * 移除指定模型的全部着色
 * @params {string} projectId 项目ID
 * @params {string} contractId 合同段ID
 */
export function removeModelColor({projectId:projectId, contractId: contractId}) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'removeModelColor',
      data: {
        projectId:projectId,
        contractId: contractId
      },
    }, '*');
  // }
}

/**
 * 显示或者隐藏指定模型的所有图层
 * @params {string} projectId 项目ID , 不传则显示全部
 * @params {string} contractId 合同段ID , 不传则显示全部
 * @params {boolean} bool 显示true, 隐藏false
 */
export function showOrHideModel({projectId:projectId, contractId: contractId, bool: bool}) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'showOrHideModel',
      data: {
        projectId:projectId,
        contractId: contractId,
        bool: bool
      },
    }, '*');
  // }
}

/**
 * 移除指定模型的所有高亮
 * @params {string} projectId 项目ID
 * @params {string} contractId 合同段ID
 */
export function removeModelHighLight({projectId:projectId, contractId: contractId}) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'removeModelHighLight',
      data: {
        projectId:projectId,
        contractId: contractId,
      },
    }, '*');
  // }
}

/**
 * 打开模型进度开关
 */
export function openProgressSwitch() {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'openProgressSwitch',
      data: {},
    }, '*');
  // }
}

/**
 * 设置指定图层的构件为显示或隐藏
 * @params {string} layerName 图层名称
 * @params {array} ids 构件ID集
 * @params {boolean} bool true显示，false隐藏
 */
export function showComponentByNameAndIds({layerName: layerName, ids: ids, bool: bool}) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'showComponentByNameAndIds',
      data: {
        layerName: layerName,
        ids: ids,
        bool: bool
      },
    }, '*');
  // }
}

/**
 * 通过图层名称显示或隐藏指定的图层
 * @params {string} name 图层名称
 * @params {boolean} bool true显示，false隐藏
 */
export function showLayerByName({name: name, bool: bool}) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'showLayerByName',
      data: {
        name: name,
        bool: bool
      },
    }, '*');
  // }
}

/**
 * 打开模型预览模式
 * @param {object} scene 模型信息
 **/
export function openModelPreview(scene) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'openModelPreview',
      data: {
        scene: scene
      },
    }, '*');
  // }
}

/**
 * 关闭模型预览模式
 **/
export function closeModelPreview() {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'closeModelPreview',
      data: {},
    }, '*');
  // }
}

/**
 * 实体单元树的勾选----关联实体模型功能
 * @param {array} ids 实体单元ID，为空则表示清除所有勾选
 **/
export function checkEntityTree(ids) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'checkEntityTree',
      data: {
        wbsIds: ids
      },
    }, '*');
  // }
}

/**
 * 实体单元树的高亮----关联实体模型功能
 * @param {array} ids 实体单元ID，为空则表示清除所有高亮
 **/
export function highlightEntityTree(ids) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
      isHandleBim: true,
      type: 'highlightEntityTree',
      data: {
        wbsIds: ids
      },
    }, '*');
  // }
}
/**
 * 质量管理功能
 * @params {bool} value， true为显示质量管理的功能，false为隐藏
 **/
export function toggleQualityManageStatus(value) {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
    isHandleBim: true,
    type: 'toggleQualityManageStatus',
    data: {
      openQuality: value
    },
  }, '*');
  // }
}
/**
 * 关闭关联实体相关功能项
 * @params {bool} value， true为显示质量管理的功能，false为隐藏
 **/
export function closeRelativeEntityFunc() {
  // for(let index =0; index <window.frames.length; index++){
  document.getElementById('bimModel') && document.getElementById('bimModel').contentWindow.postMessage({
    isHandleBim: true,
    type: 'closeRelativeEntityFunc',
    data: {},
  }, '*');
  // }
}
