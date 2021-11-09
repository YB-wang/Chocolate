import { Observer } from "./index.js"
export function debounce(func, wait) {
    let timer;
    return function () {
        let context = this; // 注意 this 指向
        let args = arguments; // arguments中存着e

        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

export function observer(value) {

    if (typeof value !== 'object' || value===null) {
        return
    }
    let ob
    if (value?.__ob__ && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}

export function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

//一些工具函数
export function protoAugment(target, src, keys) {
    target.__proto__ = src;
}
export function copyAugment(target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        def(target, key, src[key])
    }
}























