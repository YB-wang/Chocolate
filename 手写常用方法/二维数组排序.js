const arr = [
    [2, 1, 4, 3, 6, 5, 7, 9, 8],
    [2, 1, 4, 3, 6, 5, 7, 9, 8],
    [2, 1, 4, 3, 6, 5, 7, 9, 8],
    [2, 1, 4, 3, 6, 5, 7, 9, 8],
    [2, 1, 4, 3, 6, 5, 7, 9, 8],
    [2, 1, 4, 3, 6, 5, 7, 9, 8],
    [2, 1, 4, 3, 6, 5, 7, 9, 8]
]

Array.prototype.sort2 = function (fn) {
    const instance = this
    let width = instance[0].length
    let height = instance.length
    let totalArr = []
    for (let i = 0; i < width; i++) {
        let sum = 0;
        for (let j = 0; j < height; j++) {
            sum += instance[j][i]
        }
        totalArr.push(sum)

    }
    totalArr = totalArr.map((item, index) => {
        return {
            num: item,
            index
        }
    })
    totalArr = totalArr.sort(fn)
    return instance.map(arr => {
        let newArr = []
        totalArr.forEach(item => {
            newArr.push(arr[item.index])
        })
        return newArr
    })
}


