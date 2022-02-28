// 1、1、2、3、5、8、13

/*暴力递归 */

function fn(n) {
    if (n === 1 || n === 2) return 1
    return arguments.callee(n - 2) + arguments(n - 1)
}


/* 迭代 */
function fn2(n) {
    if (n === 1 || n === 2) return 1
    let f = 1
    let s = 2
    let cur
    for (let i = 3; i <= n; i++) {
        cur = f + s
        f = s
        s = cur
    }
    return cur
}


/* 公式法 */
function fn3(n) {
    const C = Math.sqrt(5)
    return (Math.pow((1 + C) / 2, n) - Math.pow((1 - C) / 2, n)) / C
}