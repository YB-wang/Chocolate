function fn() {
    let cacheMap = new Map()
    console.log(cacheMap);
    return function (a, b) {
        if (cacheMap.get(`${a}+${b}`)) {
            console.log('走缓存');
            return cacheMap.get(`${a}+${b}`)
        }
        cacheMap.set(`${a}+${b}`, a + b)
        console.log('计算');
        return a + b
    }
}

const sum = fn()
sum(1, 1)
sum(1, 1)
sum(2, 2)
sum(2, 2)
