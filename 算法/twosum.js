function reverseObject(obj) {
    const kv = Object.entries(obj)
    const vk = kv.map(arr => arr.reverse())
    return Object.fromEntries(vk)
}
function arrToObj(arr) {
    const obj = {}
    return arr.reduce((pre, cur, index) => {
        pre[index] = cur
        return pre
    }, {})
}
function getValueMap(arr) {
    const obj = arr.reduce((pre, cur, index, arr) => {
        if (pre[cur]) {
            pre[cur] = [...pre[cur], index]
            return pre
        }
        pre[cur] = [index]
        return pre
    }, {})
    return obj
}
const twoSum = (nums, target) => {
    const arr = [...nums].sort((a, b) => a - b)
    const originValueKey = getValueMap(nums)
    const keyValue = arrToObj(arr)
    let left = 0
    let right = nums.length - 1
    let sum = keyValue[left] + keyValue[right]
    while (sum !== target) {
        if (left >= right) {
            return [undefined, undefined]
        }
        if (sum > target) {
            right -= 1
            sum = keyValue[left] + keyValue[right]
        } else {
            left += 1
            sum = keyValue[left] + keyValue[right]
        }

    }
    const lefVal = keyValue[left]
    const rightVal = keyValue[right]
    if (lefVal === rightVal) {
        return [originValueKey[lefVal][0], originValueKey[lefVal][1]]
    }
    return [originValueKey[lefVal][0], originValueKey[rightVal][0]]
};

const res = twoSum([3, 2, 4], 6)
console.log(res)
