import arrayMethods from "./Array.js";
import { debounce, def, observer,protoAugment,copyAugment } from "./util.js"
const hasProto = '__proto__' in {}
const arrayKeys =Object.getOwnPropertyNames(arrayMethods)
function defineReactive(obj, key, val) {
    if (typeof val === "object") {
        new Observer(obj[key])
    } else {
        //检查该属性是否已创建Observer实例
        let childOb = observer(val);
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                dep.depend();
                console.log("收集对象依赖:",dep);
                if (childOb) {
                    console.log("收集数组依赖:",childOb);
                    childOb.dep.depend()
                }
                return val
            },
            set: function (newVal) {
                if (newVal === val) {
                    return
                }
                val = newVal;
                dep.notfiy();

            }
        })
    }

}
//用与收集依赖
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(val) {
        this.subs.push(val)
    }
    depend() {
        if (window.target) {
            this.subs.push(window.target)
        }
    }
    notfiy() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
///
class Watcher {
    //vm指观测对象  expOrFn 指具体属性 cb为回调函数
    constructor(vm, expOrFn, cb) {
        this.vm = vm,
            this.gettter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }

    get() {
        window.target = this
        let value = this.gettter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }

    update() {
        const oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm, this.value, oldValue)

    }
}
function parsePath(path) {
    if (bailRE.test(path)) {
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
export class Observer {
    constructor(val) {
        this.value = val;
        this.dep = new Dep();
        // 把observer挂载到val上
        def(this.value, '__ob__', this)
        //不是数组时
        if (!Array.isArray(this.value)) {
            
            this.toReactive(this.value)
        } else {
            const augment=hasProto
            ? protoAugment
            :copyAugment
            console.log("__proto__存在吗：",hasProto);
            augment(this.value,arrayMethods,arrayKeys)
            this.reactiveArray(this.value)
        }

    }
    toReactive(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }
    //遍历侦测数组的每一个数据
    reactiveArray(arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
            observer(arr[i])
        }
    }

}

const bailRE = /[^\w.$]/


let wang= {
    name:'wang',
    age:18,
    list: [1, 2, 3, 4, 5]
}



new Observer(wang);
new Watcher(wang,'list',(v1,v2)=>{
    console.log(v1,v2);
})



