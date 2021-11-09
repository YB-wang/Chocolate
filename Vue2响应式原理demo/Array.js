const arrayProto=Array.prototype;
const arrayMethods=Object.create(arrayProto);
import { def } from "./util.js"
['psuh','pop','shift','unshift','splice','sort','reverse'].forEach(function(method){
    //缓存原始方法
    const original=arrayProto[method];
    def(arrayMethods,method,function mutator(...args){
        const result =original.apply(this,args);
        const ob =this.__ob__
        ob.dep.notify()
        return result
    })

});
export default arrayMethods