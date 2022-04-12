<template>
  <div>
    <a-button type="primary" @click="showModal">打开</a-button>
    <a-modal
      title="yb-form"
      :visible="visible"
      cancelText="取消"
      okText="确认"
      width="70%"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <yb-form :rule="rows" :labelCol="labelCol" :wrapperCol="wrapperCol" ref="form" v-if="visible"></yb-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "modalForm",
  components: {},
  data() {
    return {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 6,
        },

      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 18,
        },
      },
      rows: [
        {
          gutter: 24,
          //一行默认分为24份 
          //md12表示 正常屏幕 时一行两列 
          //sm24 表示 小屏幕 时一行一列
          md: 12,
          sm: 24,
          cols: [
            {
              itemConfig: {
                label: "姓名",
                labelCol: {
                  style: 'width:100px;'
                }
              },
              name: "a-input",
              decorator: [
                "name",
                {
                  rules: [
                    { required: true, message: "请输入姓名!" },
                  ],
                },
              ],
              $bind: {
                placeholder: "请输入姓名",
              }
            },
            {
              itemConfig: {
                label: "性别",
                labelCol: {
                  style: 'width:100px;'
                }
              },
              name: "a-select",
              decorator: [
                "gender",
                {
                  rules: [{ required: true, message: "请选择性别" }],
                },
              ],
              $bind: {
                placeholder: "请选择性别",
                options: [
                  {
                    label: "男",
                    value: "男",
                  },
                  {
                    label: "女",
                    value: "女",
                  },
                ],
              }
            }
          ]
        },
        {
          gutter: 24,
          md: 12,
          sm: 24,
          cols: [
            {
              itemConfig: {
                label: "年龄",
                labelCol: {
                  style: 'width:100px;'
                }
              },
              name: "a-tree-select",
              decorator: [
                "age",
                {
                  rules: [{ required: true, message: "请选择类别!" }],
                },
              ],
              $bind: {
                placeholder: "请选择类别",
                "tree-data": [
                  {
                    title: "类别1",
                    value: "value 1",
                    key: "key 1",
                    children: [
                      {
                        title: "类别1-1",
                        value: "value 1-1",
                        key: "key 1-1",
                      },
                      {
                        title: "类别1-2",
                        value: "value 1-2",
                        key: "key 1-2",
                      },
                    ],
                  },
                  {
                    title: "类别2",
                    value: "value 2",
                    key: "key 2",
                  },
                ],
              }
            },
            {
              itemConfig: {
                label: "日期",
                labelCol: {
                  style: 'width:100px;'
                }
              },
              name: "a-date-picker",
              decorator: [
                "date",
                {
                  rules: [{ required: true, message: "请选择日期" }],
                },
              ],
              $bind: {
                placeholder: "请选择日期",
                format: 'YYYY/MM/DD',
                style: {
                  width: "100%",
                }
              }
            }]
        },
        {
          gutter: 24,
          md: 24,
          sm: 24,
          cols: [
            {
              itemConfig: {
                label: "备注",
                labelCol: {
                  style: 'width:100px;'
                }
              },
              name: "a-input",
              decorator: [
                "notes",
                {
                  rules: [{ required: true, message: "请填写备注!" }],
                },
              ],
              $bind: {
                placeholder: "请选择类别"
              }
            }
          ]
        }
      ],
      test1: "",
      test2: "",
      visible: false,
      confirmLoading: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
      //初始化 表单值
      let timer = setTimeout(() => {
        this.$refs.form.form.setFieldsValue({
          name: "Wang",
          gender: "男",
        });
        clearTimeout(timer);
        timer = null;
      }, 100);
    },
    handleOk() {
      this.$refs.form.form.validateFields((err, values) => {
        if (!err) {
          //转换日期格式
          Object.keys(values).forEach(v => {
            if (values[v]._isAMomentObject) {
              values[v] = this.$dealtime(values[v]._d, true)
            }
          });
          console.log("校检成功", values);

        }
      });
    },
    handleCancel() {
      this.visible = false;
    },
  },
  mounted() { },
};
</script>
