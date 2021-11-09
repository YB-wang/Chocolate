import { parsePath } from '../utils/index.js'

export default class Watcher {
    //vm指观测对象  expOrFn 指具体属性 cb为回调函数
    constructor(vm, expOrFn, cb) {
        this.vm = vm
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