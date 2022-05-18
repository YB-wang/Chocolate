class Chain {
    constructor(fn) {
        this.fn = fn
        this.nextNode = null
    }
    setNextNode(fn) {
        return this.nextNode = fn;
    }
    start(...args) {
        const res = this.fn(...args)
        if (res === 'toNextNode' || res === undefined) {
            return this.nextNode && this.nextNode.start(...args)
        }
        return res;
    }
}

const fn1 = (price) => {
    console.log(this)
    if (price >= 1000) {
        return 1000
    }
    return 'toNextNode'
}
const fn2 = (price) => {
    console.log(this)
    if (price >= 500) {
        return 500
    }
    return 'toNextNode'
}
const fn3 = (price) => {
    console.log(this)
    if (price >= 200) {
        return 200
    }
    return 'toNextNode'
}
const c1 = new Chain(fn1)
const c2 = new Chain(fn2)
const c3 = new Chain(fn3)
c1.setNextNode(c2)
c2.setNextNode(c3)
console.log(c1, c2, c3)
const res = c1.start(500)
console.log(res)