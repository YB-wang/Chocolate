import Msg from "./Msg.vue"
import Vue from 'vue'
let seed = 1;
const instance = [];
const Constractor = Vue.extend(Msg)
const $msg = (options) => {
    options.type ? "" : options.type = 'success';
    const id = `yb-message-wraper${seed++}`
    let vertricalOffset = options.offset || 20;
    instance.forEach(vm => {
        vertricalOffset += (vm.$el?.offsetHeight || 0) + 20
    });
    //onDestroy

    const props = {
        id,
        offset: vertricalOffset,
        ...options,
        onClose: (id) => {
            close(id)
        }
    }
    props.onDestroy = () => {
        vm.$destroy();
        document.body.removeChild(vm.$el);
    }
    const vm = new Constractor({ propsData: { ...props } });
    vm.$mount();
    instance.push(vm)
    document.body.appendChild(vm.$el)
    console.log(vm);
}
//拓展写法
['success', 'error', 'info', 'warning'].forEach(type => {
    $msg[type] = (str) => {
        let options = {}
        options.type = type;
        options.message = str;
        return $msg(options)
    }
});
//关闭方法
const close = (id) => {
    console.log("onClsoe");
    let idx = instance.findIndex(vm => vm._props.id === id);
    instance.splice(idx,1)
}

export default $msg