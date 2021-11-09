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