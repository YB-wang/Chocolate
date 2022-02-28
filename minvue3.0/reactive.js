
import { isObject, hasOwn } from './utils.js'

let toProxy = new WeakMap(); //弱引用映射表  放置的是原对象 和 代理过的对象
let toRaw = new WeakMap();
//响应式核心方法
function reactive(target) {
    return createReactiveObject(target);
}

function createReactiveObject(target) {
    //不是对象直接返回
    if (!isObject(target)) {
        return target
    }
    // 已经代理过的 直接返回
    let proxy = toProxy.get(target);
    if (proxy) {
        return proxy
    }
    //防止被代理过的对象再次被代理
    if (toRaw.has(target)) {
        return target;
    }

    const baseHandler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            //result 时获取到的值  如果这个值是对象的话  则代理

            //收集依赖 订阅 把当前打的key 和 这个 effect 对应起来
            track(target, key); //如果目标上的这个key 变化了 重新让数组中的effect 执行即可

            return isObject(result) ? reactive(result) : result;
        },
        set(target, key, value, receiver) {
            /*
                当代理对象是个数组时，望数组push元素时会触发两次   
                第一次  往数组增加一个元素   第二次  length+1
            */
            let hadKey = hasOwn(target, key);//判断这个属性 区别 新增还是修改
            let oldValue = target[key]
            let res = Reflect.set(target, key, value, receiver)
            if (!hadKey) {
                trigger(target, 'add', key);
            } else if (oldValue !== value) { //表示属性修改过了
                trigger(target, 'set', key);
            }
            return res
        },
        deleteProperty(target, key) {
            let res = Reflect.deleteProperty(target, key)
            return res
        }
    }

    let observed = new Proxy(target, baseHandler)
    toProxy.set(target, observed);
    toRaw.set(observed, target);
    //这里只能劫持一层对象
    return observed
}



/* 栈 先进后出 */
let activeEffectStacks = []; // effect栈

let targetsMap = new WeakMap();

function track(target, key) { //如果这个target中的key变化了 就执行 

    let effect = activeEffectStacks[activeEffectStacks.length - 1];
    if (effect) { //有对应关系才创建关联
        let depsMap = targetsMap.get(target);
        if (!depsMap) {
            targetsMap.set(target, depsMap = new Map)
        }
        let deps = depsMap.get(key);
        if (!deps) {
            depsMap.set(key, deps = new Set())
        }
        if (!deps.has(effect)) {
            deps.add(effect);
        }
        //动态创建依赖关系
    }
}

function trigger(target, type, key) {
    let depsMap = targetsMap.get(target);
    if (depsMap) {
        let deps = depsMap.get(key);
        if (deps) { //将当前key 对应的方法一一执行
            deps.forEach(effect => {
                effect();
            })
        }
    }
}
/* 响应式 副作用 */
function effect(fn) {
    //需要把fn这个函数 转换成 响应式函数
    let effect = createReactiveEffect(fn);
    effect();//默认先执行一次
}

function createReactiveEffect(fn) {
    let effect = function () {
        return run(effect, fn); // 运行 1、让fn执行  2、把effect存到栈里面
    }

    return effect;
}
function run(effect, fn) {  //运行fn 并且将effect存起来
    try {
        activeEffectStacks.push(effect);
        fn(); // vue2 利用了js是单线程的
    } finally {
        activeEffectStacks.pop();
    }
}
/* 依赖收集 发布订阅 */


let obj = reactive({ name: 'wang' });
let arr = reactive([1,2,3,4])
const app =document.getElementById('app')
effect(() => {
    app.innerHTML+=`<div style="font-weight:900;font-size:24px">${obj.name}</div>`
})
console.log({
    toProxy,toRaw,activeEffectStacks,targetsMap
});
console.log(obj);

obj.name = 'jw'
obj.name = 'jw222'



