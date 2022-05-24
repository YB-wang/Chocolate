//单例模式的定义：保证一个类仅有一个实例，并提供一个全局访问点

//惰性单例

const createDialog = function (...args) {
    const dialog = document.createElement('div')
    dialog.innerText = args.join('-')
    return dialog
}
const getSingleton = (fn) => {
    let instance = null;
    return function (...args) {
        if (!instance) {
            console.log('创建的实例')
            instance = fn(...args)
        }
        console.log('缓存的实例')
        return instance
    }
}
const showDialog = getSingleton(createDialog)
const res = showDialog(1)
const res2 = showDialog(12)
const res3 = showDialog(123)
console.log(res, res2, res3)

