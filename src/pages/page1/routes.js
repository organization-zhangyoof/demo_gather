const routes = [
    {
        path: '/page1',
        component: '../layouts/otherLayout',
        routes: [
            { exact: true, path: '/page1', redirect: '/page1/page1-2' },
            {
                path: '/page1/page1-2',
                component: './page2/Page2',
            },
            {
                path: '/page1/page1-3',
                component: './page3/Page3',
            },
            {
                path: '/page1/page1-4',
                component: './page4/Page4',
            },
        ]
    }
]
module.exports = routes