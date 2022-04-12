
const routes = [

    {
        path: '/',
        name: 'componentView',
        component: () => import(/* webpackChunkName: "about" */ '../views/ComponentView/index'),
        redirect: '/componentView/modalForm',
        children: [
            {
                path: '/componentView/modalForm',
                name: 'modalForm',
                component: () => import(/* webpackChunkName: "about" */ '@/views/ComponentView/component/modalForm.vue')
            },
            {
                path: '/componentView/ybSearch',
                name: 'ybSearch',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/ComponentView/component/ybSearch.vue')
            },
            {
                path: '/componentView/Table',
                name: 'Table',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/ComponentView/component/Table.vue')
            },
            {
                path: '/componentView/Trees',
                name: 'Trees',
                component: () => import(/* webpackChunkName: "about" */ '@/views/ComponentView/component/Trees.vue')
            },
            {
                path: '/componentView/K-Form-Design',
                name: 'K-Form-Design',
                component: () => import(/* webpackChunkName: "about" */ '@/views/ComponentView/component/K-Form-Design.vue')
            },
            {
                path: '/componentView/Han',
                name: 'Han',
                component: () => import(/* webpackChunkName: "about" */ '@/views/ComponentView/component/Han.vue')
            },
            {
                path: '/componentView/Message',
                name: 'Message',
                component: () => import(/* webpackChunkName: "about" */ '@/views/ComponentView/component/Message.vue')
            },
            {
                path: "/componentView/yb-progress",
                name: "yb-progress",
                component: () => import(/* webpackChunkName: "about" */ '@/views/ComponentView/component/yb-progress.vue')
            },{
                path: "/componentView/TestPage",
                name: "TestPage",
                component: () => import(/* webpackChunkName: "about" */ '@/views/ComponentView/component/TestPage.vue')
            }
        ]
    },
    {
        path: "/pageTemplate",
        name: "pageTemplate",
        component: () => import(/* webpackChunkName: "about" */ '../views/PageTemplate/index'),
        children: [
            {
                path: "/pageTemplate/curdTemplate",
                name: "curdTemplate",
                component: () => import(/* webpackChunkName: "about" */ '@/views/PageTemplate/CurdTemplate/index.vue')
            }
        ]
    }
]
export default routes