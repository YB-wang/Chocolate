/*call和apply :
    改变this指向 添加到函数原型上
    函数调用call和apply后会立即执行
*/

//call: 当第一个参数传递的是undefined或null，内部会让this指向window
//       当第一个参数是基本类型 ， 内部会调用相应的构造函数 创建对应实例让this指向这个实例
//       当第一个参数是引用类型 ， 内部this会指向它
Function.prototype._call = function (ctx, ...args) {
    
    const _ctx = ctx == undefined ? window : Object(ctx)
    //this表示当前_call的调用者  即 那个函数调用就指向谁
    // 将fn的上下文设置成_ctx
    _ctx.fn = this;
    //在_ctx环境下执行fn 并拿到结果
    const res = _ctx.fn(...args);
    // 删除_ctx环境下的fn
    delete _ctx.fn
    //返回执行结果
    return res
}


Function.prototype._apply = function (ctx, arr) {
    const _ctx = (ctx == undefined ? window : Object(ctx))
    //this表示当前_call的调用者  即 那个函数调用就指向谁
    // 将fn的上下文设置成_ctx
    _ctx.fn = this;
    //在_ctx环境下执行fn 并拿到结果
    const res = _ctx.fn(...arr);
    // 删除_ctx环境下的fn
    delete _ctx.fn
    //返回执行结果
    return res
}
/*
    bind:
    作用：返回一个内部改变了 this 的新函数(引用)
    特点：
        1、在Function.prototype上
        2、调了bind，函数不会立即执行
 */

Function.prototype._bind = function (ctx, ...args) {
    const _ctx = (ctx == undefined ? window : Object(ctx))
    const _self = this
    return function (...rest) {
        _self.call(_ctx, ...args, ...rest)
    }
}


