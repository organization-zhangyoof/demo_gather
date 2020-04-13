    const page1_routes = require("./pages/page1/routes")
    const page3_routes = require("./pages/page3/routes")
    const page2_routes = require("./pages/page2/routes")
    const page4_routes = require("./pages/page4/routes")
    const spread_routes = require("./pages/spreadjs/routes")

    let routes = [
      ...page1_routes,
      ...page3_routes,
      ...page2_routes,
      ...page4_routes,
      ...spread_routes,
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