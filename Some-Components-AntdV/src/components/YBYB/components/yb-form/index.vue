
<script>
export default {
  name: "yb-form",
  props: {
    fixed: {
      type: Boolean,
      default: () => {
        return false
      }
    },
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
  },
  render() {
    let rule = this.rule;

    function renderComponent(option) {
      //不能取其他名称否则会被当做html属性接收
      const directives = [
        {
          name: 'decorator',
          value: option.decorator
        }
      ]

      //这种写法无法在$bind里面写style了通过v-bind绑定  props和$attrs必须分开写了
      let props = option.$bind
      switch (option.name) {
        case 'a-input':
          return <a-input {...{ directives }} {...{ props }} ></a-input>
        case 'a-select':
          return <a-select {...{ directives }} {...{ props }}></a-select>
        case 'a-tree-select':
          return <a-tree-select {...{ directives }} {...{ props }} tree-default-expand-all></a-tree-select>
        case 'a-date-picker':
          return <a-date-picker {...{ directives }} {...{ props }} ></a-date-picker>
      }
    }

    let props = {
      form: this.form
    }
    return (
      <a-form onSubmit={() => this.submit} {...{ props }}>
        {rule.map(rw => {
          let rowProps = {
            gutter: rw.gutter
          }
          return (<a-row {...{ props: rowProps }}>
            {rw.cols.map(component => {
              //不能取其他名称否则会被当做html属性接收
              let componentProps = {
                labelCol: this.labelCol,
                wrapperCol: this.wrapperCol,
                ...component.itemConfig,
              }
              return (<a-col md={rw.md} sm={rw.sm}>
                <a-form-item  {...{ props: componentProps }}>
                  {renderComponent(component)}
                </a-form-item>
              </a-col>)
            }
            )}
          </a-row>)
        })}
      </a-form>
    )
  }
};
</script>
<style scoped lang="scss">
/deep/.ant-form-item {
  display: flex;
}
</style>