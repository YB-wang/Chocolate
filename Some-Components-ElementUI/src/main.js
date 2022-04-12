import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'video.js/dist/video-js.css'
Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import './plugin/echarts.js'

import { route } from './router/route.config.js'
console.log(route)
import Storage from 'vue-ls';

const options = {
  namespace: 'vuejs__', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
};

Vue.use(Storage, options);


import ybyb from "./components/YBYB/src/index.js"
Vue.use(ybyb)

import axios from "axios"
Vue.prototype.$axios = axios
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')