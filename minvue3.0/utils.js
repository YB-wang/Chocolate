
export function isObject(val) {
    return typeof val === 'object' && val !== null;
}

export function hasOwn(target,key){
    return target.hasOwnProperty(key)
}