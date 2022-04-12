<template>
  <a-form :form="form" @submit="submit" >
    <a-row v-for="(rw, rwindex) in rule" :key="rwindex" :gutter="rw.gutter">
      <a-col v-for="(component, clindex) in rw.cols" :key="clindex" :md="rw.md" :sm="rw.sm">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" v-bind="component.itemConfig">
          <!-- input -->
          <a-input
            v-decorator="component.decorator"
            v-bind="component.$bind"
            v-if="component.name === 'a-input'"
          ></a-input>
          <!-- select -->
          <a-select
            v-decorator="component.decorator"
            v-bind="component.$bind"
            v-if="component.name === 'a-select'"
          ></a-select>
          <!-- tree-select -->
          <a-tree-select
            v-decorator="component.decorator"
            v-bind="component.$bind"
            tree-default-expand-all
            v-if="component.name === 'a-tree-select'"
          ></a-tree-select>
          <!-- date-picker -->
          <a-date-picker
            v-decorator="component.decorator"
            v-bind="component.$bind"
            v-if="component.name == 'a-date-picker'"
          ></a-date-picker>
          <!-- <slot v-if="cl.component.name == 'slot'" :name="cl.component.slotName" ></slot> -->
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: "yb-form",
  props: {
    rule: {
      type: Array,
      default: () => {
        return []
      }
    },
    labelCol: {
      type: Object,
      default: () => {
        return {
          xs: {
            span: 24,
          },
          sm: {
            span: 5,
          },
        }
      }
    },
    wrapperCol: {
      type: Object,
      default: () => {
        return {
          xs: {
            span: 24,
          },
          sm: {
            span: 15,
          },
        }
      }
    },
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("校检成功", values);
          this.$emit("handleSubmit", values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`,
      });
    },
    resetForm() {
      this.form.resetFields();
    },
  }
};
</script>
<style scoped>
</style>