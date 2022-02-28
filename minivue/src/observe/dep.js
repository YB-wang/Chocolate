let uid = 0
export default class Dep {
    constructor() {
        this.id = uid++
        this.subs = [];
    }
    addSub(val) {
        this.subs.push(val);
    }
    depend() {
        if (window.target) {
            window.target.addDep(this)
        }
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        });
        console.log(this.subs);
    }
    //移除watcher的方法
    removeSub(sub) {
        const index = this.subs.indexOf(sub)
        if (index > -1) {
            return this.subs.splice(index, 1)
        }
    }

}