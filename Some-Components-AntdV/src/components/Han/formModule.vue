<template>
  <div class="FormModule">
    <a-form-model ref="form" :model="formData" :rules="rules" :label-col="{ span: labelWidth }" :wrapper-col="{ span: inputWidth }">
      <a-row>
        <template v-for="(item, index) in formItems">
          <a-col v-if="!item.show" :md="md || item.md || 24" :sm="sm || item.sm || 24" :key="index">
            <a-form-model-item :label="item.label" :prop="item.prop">
              <component
                :is="defaultComponents.includes(item.component) ? 'FormComponent' : item.component"
                v-model="formData[item.prop]"
                :data="formData"
                :formItem="item"
                :placeholder="'请输入' + item.label"
                format="YYYY-MM-DD hh:mm"
                valueFormat="YYYY-MM-DD hh:mm"
                :style="{ width: item.component.includes('picker') ? '100%' : '' }"
                v-bind="defaultComponents.includes(item.component) ? {} : item.props"
                v-on="defaultComponents.includes(item.component) ? {} : item.listeners"
              ></component>
            </a-form-model-item>
          </a-col>
        </template>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
const defaultComponents = ['a-select', 'a-checkbox', 'a-radio', 'a-upload', 'a-tree-select'];

export default {
  name: 'FormModule',
  props: {
    /** 
     * 传入的表单组件信息
     * {
     *  component:组件名,
     *  prop:对象值,
     *  label:label名称,
     *  options: 下拉选or复选or单选
     *  sm,md占用位置占比
     *  rules:正则,
     *  required: 是否需要验证,
     *  props:给组件绑定的值
     *  listeners:给组件绑定的事件
     * }
    */
    formItems: {
      type: Array,
      default: () => [],
    },
    /**
     * 传入的表单存储的对象
    */
    formData: {
      type: Object,
      default: () => ({}),
    },
    labelWidth: {
      type: Number,
      default: 4,
    },
    inputWidth: {
      type: Number,
      default: 20,
    },
    // 整体表单是否需要验证
    noRules: {
      type: Boolean,
      default: false,
    },
    // 整体表单的内部组件宽度占比
    md: {
      type: [String, Number],
    },
    sm: {
      type: [String, Number],
    },
  },
  data() {
    return {
      rules: {},
      defaultComponents,
    };
  },
  created() {
    this.addRules();
  },
  methods: {
    addRules() {
      if (this.noRules) {
        return false;
      }
      // 自动加入简单的表单验证
      this.formItems.forEach((item) => {
        let isRequired = typeof item.required === 'boolean' && item.required === false;
        if (!isRequired || item.required === true) {
          let tempRule = {
            required: true,
            trigger: 'blur',
            message: `${this.defaultComponents.includes(item.component) ? '请选择' : '请输入'}${item.label}`,
          };
          if (!(Array.isArray(item.rules) && item.rules.length > 0)) {
            this.rules[item.prop] = [tempRule];
          } else {
            this.rules[item.prop] = [tempRule, ...item.rules];
          }
        }
      });
    },
    async validate() {
      try {
        return await this.$refs.form.validate();
      } catch (error) {
        return false;
      }
    },
    resetFields() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped>
</style>