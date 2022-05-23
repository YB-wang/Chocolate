const toChain = (function () {
    const setNextNode = function (chain) {
        this.nextNode = chain
    }
    const start = function (...args) {
        const res = this.fn(...args)
        if (res === 'toNextNode') {
            return this.nextNode ? this.nextNode.start(...args) : undefined
        }
        return res
    }
    return function toChain(fn) {
        const node = Object.create({ setNextNode, start })
        node.fn = fn
        return node
    }
})()

const c1 = toChain((a) => {
    if (a > 1000) {
        console.log('A')
        return
    }
    return 'toNextNode'
})
const c2 = toChain((a) => {
    if (a > 500) {
        console.log('B')
        return
    }
    return 'toNextNode'
})
const c3 = toChain((a) => {
    if (a > 200) {
        console.log('C')
        return
    }
    return 'toNextNode'
})
const c4 = toChain((a) => {
    if (a > 100) {
        console.log('D')
        return
    }
    return 'toNextNode'
})
const c5 = toChain((a) => {
    console.log('E')
    return
})
c1.setNextNode(c2)
c2.setNextNode(c3)
c3.setNextNode(c4)
c4.setNextNode(c5)
c1.start(99) // D