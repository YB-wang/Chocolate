

export function bubbleSort(arr) {
    let len = arr.length - 1
    if (len <= 0) {
        return arr
    }
    for (let i = 0; i < len + 1; i++) {
        for (let j = 0; j < len - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

export function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let mid = arr[Math.floor((arr.length - 1) / 2)]
    let l = []
    let r = []
    let c = []
    let len = arr.length
    for (let i = 0; i < len; i++) {
        if (arr[i] > mid) {
            r.push(arr[i])
        }
        if (arr[i] < mid) {
            l.push(arr[i])
        }
        if (arr[i] === mid) {
            c.push(arr[i])
        }
    }
    return [...quickSort(l), ...c, ...quickSort(r)]
}