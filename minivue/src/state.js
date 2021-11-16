import { observe } from "./observe/index.js";
import Watcher from './observe/watcher.js'
import { proxy } from './utils/index.js'
export function initState(vm) {
    const opts = vm.$options;
    //这是vue默认的初始化顺序
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethods(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatchr(vm)
    }
}
function initProps(vm) {

}
function initMethods(vm) {

}
function initData(vm) {
    //数据的初始化
    let data = vm.$options.data;
    data = typeof data === 'function' ? data.call(vm) : data;
    //方便用户直接访问data
    vm._data=data;

    //当我区vm上取属性值时，帮我将属性的取值代理到_data上
    for(let key in data){
        proxy(vm,'_data',key)
    }
    //数据劫持  
    observe(data)
    
}
function initComputed(vm) {

}
function initWatchr(vm) {

}

