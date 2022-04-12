import FormComponent from './formComponent.vue'
import FormModule from './formModule.vue'
import GeneralModel from './generalModel.vue'
import TableModule from './tableModule.vue'

let commonComponents = [FormComponent, FormModule, GeneralModel, TableModule]

commonComponents.install = function (Vue) { 
  commonComponents.forEach(item => {
    Vue.component(item.name, item)
  })
}

export default commonComponents