import Vue from 'vue'
import VueRouter from 'vue-router'

import { route } from './route.config.js'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  redirect: '/YbTable'
},
...route
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name) {
    next()
  } else {
    next({
      path: "/404"
    })
  }

})
export default router