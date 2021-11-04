function defineReactive(obj, key, val) {
    if (typeof val === "object") {
        new Observer(obj[key])
    } else {
        let dep = new Dep();
        console.log("key:", key, "已转换为响应式");
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                dep.depend()
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
//用与手机依赖
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
class Observer {
    constructor(val) {
        this.value = val;
        //不是数组时
        if (!Array.isArray(this.value)) {
            this.toReactive(this.value)
        }

    }

    toReactive(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }

}
const bailRE = /[^\w.$]/

let wang = {
    name: "wzq",
    other: {
        interest: "coding"
    },
    age: 18,
    sex: "male"
}
//将 wang 转换为响应式对象
new Observer(wang);

//通过Watcher 观测
new Watcher(wang, 'other.interest', function (v1, v2) {
    console.log("oldVal:", v2,"=>","newVal:", v1 );
});
wang.other.interest="game"