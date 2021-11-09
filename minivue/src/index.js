import { initMixin } from './init.js'

function Vue(options) {
    this._init(options);
}
initMixin(Vue);//给vue增加初始化方法
export default Vue