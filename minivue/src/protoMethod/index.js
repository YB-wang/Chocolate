import Watcher from "../observe/watcher.js"
import { isValidArrayIndex } from "../utils/index.js"
export function $watch(expOrFn, cb, op) {
    const vm = this
    op = op || {}
    const watcher = new Watcher(vm, expOrFn, cb, op)
    if (op.immediate) {
        cb.call(vm, watcher.value)
    }
    return function unwatchFn() {
        watcher.teardown()
    }

}
//
export function $set(target, key, val) {
    //如果是数组
    if(Array.isArray(target)&&isValidArrayIndex(key)){
        target.length=Math.max(target,length,key)
        target.splice(key,1,val)
        return val
    }
    //如果key已存在
    if(key in target && !(key in Object.prototype)){
        target[key]=val
        return val
    }
    //新增属性
    //target不能是vue实例或者vue实例的根数据对象
    const ob=target.__ob__
   
}