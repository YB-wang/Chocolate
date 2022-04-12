import Vue from 'vue'
import copy from './copy.js'

const directives = {
    copy
}
directives.install = Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
})

export default directives