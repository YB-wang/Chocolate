/* 
        instanceof原理：
    通过判断后面的构造函数是否在 前面元素的原型链上
*/


function _instanceof(pre,ctor){

    while(pre!==null){
        if(Object.__proto__===ctor.prototype){
            return true
        }
        obj=obj.__proto__
    }
}