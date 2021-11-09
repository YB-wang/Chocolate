
export default class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(val) {
        this.subs.push(val);
    }
    depend() {
        if (window.target) {
            this.subs.push(window.target);
        }
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        });
        console.log(this.subs);
    }
}