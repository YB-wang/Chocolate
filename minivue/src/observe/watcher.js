import { parsePath, traverse } from '../utils/index.js'
export default class Watcher {
    //vm指观测对象  expOrFn 指具体属性 cb为回调函数
    constructor(vm, expOrFn, cb, op) {
        this.vm = vm
        if (op) {
            this.deep = !!op.deep
        } else {
            this.deep = false
        }
        this.deps = []
        this.depIds = new Set()
        this.gettter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }
    get() {
        window.target = this
        let value = this.gettter.call(this.vm, this.vm)
        if (this.deep) {
            //deep的处理逻辑
            traverse(value)
        }
        window.target = undefined;
        return value
    }
    addDep(dep) {
        const id = dep.id
        if (!this.depIds.has(id)) {
            this.depIds.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    update() {
        const oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm, this.value, oldValue)
    }
    //通知Dep将自己移除
    teardown() {
        let i = this.deps.length
        while (i--) {
            this.deps[i].removeSub(this)
        }
    }
}