import Dep from "../observe/dep.js"
import { observe } from "../observe/index.js";

export function isObject(data) {
    if (typeof data !== 'object' || data === null) {
        return false
    }
    return true
}
//设置一个不可枚举的属性
export function def(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}

export function parsePath(path) {
    if (/[^\w.$]/.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) {
                return
            }
            obj = obj[segments[i]]
        }
        return obj
    }
}

export function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[data][key];
        },
        set(newValue) {
            vm[data][key] = newValue
        }
    })
}

export function defineReactive(data, key, value) {
    //判断value是否为对象 如果是 则遍历属性劫持子属性 然后对象本身也需要劫持
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

const seenObjects = new Set()
export function traverse(val) {
    _traverse(val, seenObjects)
    seenObjects.clear()
}

function _traverse(val, seen) {
    let i, keys
    const isA = Array.isArray(val)
    if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
        return
    }
    if (val.__ob__) {
        const depId = val.__ob__.dep.id
        if (seen.has(depId)) {
            return
        }
        seen.add(depId)
    }
    if (isA) {
        i = val.length
        while (i--) _traverse(val[i], seen)
    } else {
        keys = Object.keys(val)
        i = keys.length
        while (i--) _traverse(val[keys[i]], seen)
    }
}
//检查val是否是一个有效的数组索引，其实就是验证是否是一个非无穷大的正整数
export function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val)//Math.floor(n) === n验证是否是整数 
}