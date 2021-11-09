import { isObject } from '../utils/index.js'
import { arrayMethods } from './array.js'
import { def } from '../utils/index.js'
import Dep from './dep.js'
export function observe(data) {
    if (!isObject(data)) {
        return
    }
    if (data.__ob__) {
        return data.__ob__
    }
    //是对象就 进行数据劫持
    return new Observer(data) //用来观测数据
}

class Observer {
    constructor(value) {
        this.dep = new Dep();
        //给每个观测过的对象都增加一个属性 当前Observer实例 并且这个属性不可被遍历到
        def(value, '__ob__', this)
        if (Array.isArray(value)) {
            //如果是数组的话并不会对索引进行观测 性能差
            //通过观测能改变数组的方法进行观测
            value.__proto__ = arrayMethods;
            //如果数组里的元素是一个对象 仍需要进行观测
            this.observerArray(value);
        } else {
            this.walk(value)
        }
    }

    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        })
    }

    observerArray(value) {
        for (let i = 0; i < value.length; i++) {
            //判断value是否为对象 如果是 则遍历劫持
            if (isObject(value[i])) {
                observe(value[i])
            }
        }
    }
}
function defineReactive(data, key, value) {
    //判断value是否为对象 如果是 则遍历属性劫持
    if (isObject(value)) {
        observe(value)
    }
    let dep = new Dep();
    let childOb = observe(value)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.depend();
            if (childOb) {
                childOb.dep.depend()
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) return;
            //若果设置的新值也是一个对象 也需要进行劫持
            if (isObject(value)) {
                observe(value)
            }
            console.log("数据更新了");
            value = newValue;
            dep.notify()
        }
    })
}