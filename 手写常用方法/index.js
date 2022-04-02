import './call、apply、bind.js'
import { $Array } from './数组去重.js'
import { bubbleSort, quickSort } from './排序.js'
import './PromiseAll、PromiseRace.js'
import './手写instanceof.js'
import './url参数解析.js'
import { debounce, throttle } from './防抖和节流.js'
import './手写构造函数.js'
import './闭包实现缓存.js'
import './async、await.js'
import './手写compose函数.js'
console.log(bubbleSort([1, 2, 3, 1, 2, 3, 1, 2, 3]));

let arr = [
    { name: 'a', num: 1 },
    { name: 'b', num: 1 },
    { name: 'b', num: 1 },
    { name: 'c', num: 1 },
    { name: 'c', num: 1 },
    { name: 'd', num: 1 },
    { name: 'd', num: 1 },
    { name: 'a', num: 1 },
    { name: 'a', num: 1 },
    { name: 'a', num: 1 }
]

function fn(arr) {
    let cache = new Map()
    let res = arr.reduce((total, cur) => {
        if (!cache.get(cur.name)) {
            cache.set(cur.name, cur)
            total.push(cur)
        }
        return total
    }, [])
    return res
}

