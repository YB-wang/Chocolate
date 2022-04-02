const routes = [
    {
        path: '/',
        redirect: '/Home'
    },
    {
        path:'/Home',
        component:()=>import('/src/views/Home.vue')
    }
]

export default routes