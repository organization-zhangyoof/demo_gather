    const page1_routes = require("./pages/page1/routes")
    const page3_routes = require("./pages/page3/routes")
    const page2_routes = require("./pages/page2/routes")
    const page4_routes = require("./pages/page4/routes")
    const page5_routes = require("./pages/page5/routes")
    const spread_routes = require("./pages/spreadjs/routes")
    const spread_io_routes = require("./pages/spreadIo/routes")
    const base_test_routes = require("./pages/base/routes")
    const spread_Designer_routes = require("./pages/spreadDesigner/routes")
    const iframe_page_routes = require("./pages/iframePage/routes")
    const bim_routes = require("./pages/bim/routes")
    const bMap_routes = require("./pages/bMap/routes")
    const bimDemo_routes= require("./pages/bimDemo/routes")
    const react_hook_routes= require("./pages/hookPage/routes")
    const publish_routes= require("./pages/publishPage/routes")
    const ytx_routes= require("./pages/YTX/routes")


    let routes = [
      ...page1_routes,
      ...page3_routes,
      ...page2_routes,
      ...page4_routes,
      ...page5_routes,
      ...spread_routes,
      ...spread_io_routes,
      ...base_test_routes,
      ...spread_Designer_routes,
      ...iframe_page_routes,
      ...bim_routes,
      ...bMap_routes,
      ...bimDemo_routes,
      ...react_hook_routes,
      ...publish_routes,
      ...ytx_routes,
    ]
    module.exports = [
        {
          exact: true,
          path: '/',
          redirect: '/page1'
        }, {
          path: '/',
          component: '../layouts/index',
          routes: routes
        },
    ]