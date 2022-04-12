import component from "./index.vue"
/* istanbul ignore next */
component.install = function (Vue) {
  Vue.component(component.name, component);
};

export default component;