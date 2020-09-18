    const page1_routes = require("./pages/page1/routes")
    const page3_routes = require("./pages/page3/routes")
    const page2_routes = require("./pages/page2/routes")
    const page4_routes = require("./pages/page4/routes")
    const spread_routes = require("./pages/spreadjs/routes")
    const spread_io_routes = require("./pages/spreadIo/routes")
    const base_test_routes = require("./pages/base/routes")
    const spread_Designer_routes = require("./pages/spreadDesigner/routes")
    const iframe_page_routes = require("./pages/iframePage/routes")
    const bim_routes = require("./pages/bim/routes")


    let routes = [
      ...page1_routes,
      ...page3_routes,
      ...page2_routes,
      ...page4_routes,
      ...spread_routes,
      ...spread_io_routes,
      ...base_test_routes,
      ...spread_Designer_routes,
      ...iframe_page_routes,
      ...bim_routes,
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