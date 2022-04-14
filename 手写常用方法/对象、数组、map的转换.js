const enumObj = {
    '1': "one",
    '2': "two",
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven'
}
function getKeyOrValue(v) {
    const keys = Object.keys(enumObj)
    const values = Object.values(enumObj)
    let idx = keys.findIndex(item => item === v)
    if (idx !== -1) {
        return values[idx]
    }
    idx = values.findIndex(item => item === v)
    if (idx !== -1) {
        return keys[idx]
    }
    return undefined
}

function reverseObject(obj) {
    const kv = Object.entries(obj)
    const vk = kv.map(arr => arr.reverse())
    return Object.fromEntries(vk)
}
const obj = {
    name: 'wang',
    age: 18,
    sex: "male"
}
const { name, age, sex } = obj
