import { observe } from "./observe/index.js";
import Watcher from './observe/watcher.js'
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
    //数据劫持  
    observe(data)
    new Watcher(data,'age',(v1,v2)=>{
        console.log("oldVal:",v2,'=>',"newVal:",v1);
    })
}
function initComputed(vm) {

}
function initWatchr(vm) {

}