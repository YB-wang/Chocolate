let oldArrayMethods = Array.prototype;
//将 arrayMethods 的 __proto__ 指向  Array.prototype
export let arrayMethods = Object.create(oldArrayMethods)
//这些方法都会导致数组 本身发生变化
let methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];
methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        const result = oldArrayMethods[method].apply(this, args);
        //如果添加了元素，添加的元素如果是一个对象 那么需要进行观测
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice'://三个参数 
                inserted = args.slice(2);
            default:
                break;

        }
        //将新增属性继续观测
        if (inserted) {
            this.__ob__.observerArray(inserted)
        }
        this.__ob__.dep.notify();
        return result;
    }
})
