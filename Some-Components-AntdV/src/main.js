import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import KFormDesign from 'k-form-design/lib/k-form-design-mini.umd.min'
import 'k-form-design/lib/k-form-design.css'
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import axios from 'axios'
import "./mock"

import cloneDeep from "lodash/cloneDeep"
import $msg from "@/components/Message/index.js"
import "@/components/Message/index.less"
Vue.prototype.$msg=$msg
Vue.use(KFormDesign)
Vue.use(ant)
import ybyb from "./components/YBYB/src/index.js"
Vue.use(ybyb)
Vue.config.productionTip = false
//时间处理函数
Vue.prototype.$dealtime = (date, showtime = false) => {
  function setTwo(value) {
    if (value < 10) {
      return '0' + value
    } else {
      return value
    }
  }
  //输入时间
  let mytime = new Date(date);
  let myYear = setTwo(mytime.getFullYear());
  let myMonth = setTwo(mytime.getMonth() + 1);
  let myDay = setTwo(mytime.getDate());
  let myHours = setTwo(mytime.getHours());
  let myMinutes = setTwo(mytime.getMinutes());
  let temp = `${myYear}-${myMonth}-${myDay}`
  if (showtime) {
    temp = `${myYear}-${myMonth}-${myDay} ${myHours}:${myMinutes}`
  }
  return temp
}
//递归深拷贝
Vue.prototype.$deepClone = cloneDeep;
Vue.prototype.$axios=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')