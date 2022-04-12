import YbTable from "../components/yb-table/index.vue"
import ElTreeSelect from "../components/yb-treeSelect/index.vue"
/* istanbul ignore next */


const components = [
    YbTable,
    ElTreeSelect
]
components.install = function (Vue) {
    components.forEach(item => {
        Vue.component(item.name, item);
    })
};

export default components;