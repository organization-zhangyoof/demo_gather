import router  from 'umi/router'
import {Modal} from 'antd'
const { confirm } = Modal;
/**
 * 新的业务模块/界面
 * @param {string} origin 类型，目前固定传outside
 * @param {string} name 页面名称
 * @param {string} route 路由地址
 * @param {string} id 路由ID
 **/
export function openNewPage({origin: origin, name: name, route: route, id: id,dispatch:dispatch,component:component}){
  if(dispatch && component){
    window.__OPEN_NEW_PAGE_WAY__ = 'cover'
    window.__IS_NEED_REFRESH__ = false
    dispatch(
      {
        type: 'menuDirectory/setState',
        payload:{
          coverComponent: component,
          showFirstLevel: false,
        }
      }
    )
  }else{
    if(route.indexOf('http') < 0){ //非完整地址
      router.replace(route)
      // window.location.href = "http://"+window.location.host+route //为了解决打开新页面 组件state数据缓存问题
    }else{
      router.replace('/other')
    }
  }

  //存储新页面的来源
  sessionStorage.newPageOrigin = origin
  window.__NEW_PAGE_ORIGIN__ = origin

  //存储当前路由地址
  sessionStorage.chooseSubMenuRoute = route
  window.__CHOOSE_SUBMENU_ROUTE__ = route

  //存储新的导航栏
  let nav = {name: name, id: id, route: route, origin: origin}
  window.__CUR_NAV_BAR__.push(nav)
  sessionStorage.curNavBar = JSON.stringify(window.__CUR_NAV_BAR__)

  let menuList = window.__MENU_LIST__
  let routeId = ''
  route = route.split("?")[0]
  if(id){
    routeId = id
  }else{
    for(let i in menuList){
      if(!!menuList[i].children){
        for(let j in menuList[i].children){
          if(!!menuList[i].children[j].children){
            for(let k in menuList[i].children[j].children){ //三级菜单
              // if(route.indexOf(menuList[i].children[j].children[k].route) > -1){
              if(route === menuList[i].children[j].children[k].route){
                routeId = menuList[i].children[j].children[k].id
              }
            }
          }else{ //二级菜单
            // if(route.indexOf(menuList[i].children[j].route) > -1){
            if(route === menuList[i].children[j].route){
              routeId = menuList[i].children[j].id
            }
          }
        }
      }else{ //一级菜单
        // if(route.indexOf(menuList[i].route) > -1){
        if(route === menuList[i].route){
          routeId = menuList[i].id
        }
      }
    }
  }
  //存储当前路由ID
  sessionStorage.currentRouteId = routeId
  window.__CURRENT_ROUTE_ID__ = routeId
  //初始化页面返回来源
  window.__BACK_LAST_PAGE_ORIGIN__ = ''
}

/**
 * 返回上一页
 **/
export function returnLastPage(flag) {
  const actionFun = () =>{
    let curNavBar = window.__CUR_NAV_BAR__
     //上一个页面
    let lastPage = curNavBar[curNavBar.length-2]
    //非完整地址
    if (lastPage.route.indexOf('http') < 0) {
      router.replace(lastPage.route)
    } else {
      router.replace('/other')
    }

    //更新导航栏数据
    window.__CUR_NAV_BAR__.pop()
    sessionStorage.curNavBar = JSON.stringify(window.__CUR_NAV_BAR__)

    //存储上一个页面的路由地址
    sessionStorage.chooseSubMenuRoute = lastPage.route
    window.__CHOOSE_SUBMENU_ROUTE__ = lastPage.route

    //存储上一个页面的路由ID
    sessionStorage.currentRouteId = lastPage.id || ''
    window.__CURRENT_ROUTE_ID__ = lastPage.id || ''
    //清除我的关注所保留的会话级变量
    sessionStorage.namespace = ''
    sessionStorage.selectedRows = ''
    sessionStorage.source = ''
    sessionStorage.sourceRoute = ''

    //如果上一个页面不是由openNewPage()打开，清空sessionStorage.newPageOrigin
    if(!lastPage.origin){
      sessionStorage.newPageOrigin = ''
      window.__NEW_PAGE_ORIGIN__ = ''
    }
  }
  if(!flag){
    changeRouteHint(actionFun);
  }else{
    
    actionFun();
  }
}
/**
 * 监听在页面有未保存或者正在上传的文件，在路由变化时给出提示
 * @param {*} callback 点击确定的回到函数
 */
export function changeRouteHint (callback){
  if(window.__UPLOADING_FILES_NUMBER__ || window.__HAVE_UNSUBMITTED__){
    let content = window.__UPLOADING_FILES_NUMBER__?"文件正在上传中是否放弃操作":(window.__HAVE_UNSUBMITTED__?'当前页面有未保存/提交的数据，是否放弃操作':'')
    confirm({
      content: content,
      onOk() {
        window.__UPLOADING_FILES_NUMBER__ = 0
        window.__HAVE_UNSUBMITTED__ = false
        callback && setTimeout(callback,100)
      },
      onCancel() {
        console.log('Cancel');
      },
      zIndex:1500
    });
  }else if(window.__RETURN_LAST_PAGE_CALLBACK__){
    //window.__RETURN_LAST_PAGE_CALLBACK__此方法可以暂时拦截返回，但须在自定义方法完成后调用传入的callback方法,重新执行返回事件
    let backClickFun = window.__RETURN_LAST_PAGE_CALLBACK__
    backClickFun(callback)
    window.__RETURN_LAST_PAGE_CALLBACK__ = ''
  }else{
    callback()
  }
}