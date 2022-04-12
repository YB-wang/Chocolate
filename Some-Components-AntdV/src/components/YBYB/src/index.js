import ybForm from "../components/yb-form/index.vue"
import ybSearch from "../components/yb-search/index.vue"
import ybProgress from "../components/yb-progress/index.vue"
/* istanbul ignore next */


const components = [
    ybForm,
    ybSearch,
    ybProgress
]
components.install = function (Vue) {
    components.forEach(item => {
        Vue.component(item.name, item);
    })
};

export default components;