import { initState } from './state.js'
import { compileToFunction } from './compile/index.js'
import Watcher from './observe/watcher.js';
import { $watch, $set } from "./protoMethod/index.js"
export function initMixin(Vue) {
        Vue.prototype._init = function (options) {
                //数据劫持
                const vm = this;//vue中 的 this.$options 只带的就是用户传递的属性
                vm.$options = options;

                //初始化状态
                initState(vm);

                //如果传入了el 就需要挂载
                if (vm.$options.el) {
                        vm.$mount(vm.$options.el);
                }
        }
        Vue.prototype.$mount = function (el) {
                const vm = this;
                el = document.querySelector(el);
                const options = vm.$options;
                //没有render函数就使用 模板

                if (!options.render) {
                        let template = options.template
                        if (template && el) {
                                template = el.outerHTML;
                        }
                        console.log(template);
                        //拿到模板后 将模板转换为render函数
                        const render = compileToFunction(template);
                        vm.render = render;
                }
        }
        Vue.prototype.$watch = $watch

        Vue.prototype.$set = $set
}
