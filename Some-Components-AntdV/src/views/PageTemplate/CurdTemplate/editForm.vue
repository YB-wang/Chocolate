<template>
    <a-modal
        :maskClosable="false"
        v-model="visible"
        title="新增"
        @ok="handleSubmit"
        @cancel="handleCancel"
        :confirmLoading="confirmLoading"
        width="60%"
        cancelText="取消"
        okText="确定"
    >
        <yb-form
            :rule="rows"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            ref="ybForm"
            v-if="visible"
        ></yb-form>
    </a-modal>
</template>
<script>
// import {
//     addConnetion
// } from '@/api/modular/system/dataConnetion.js'
export default {
    data() {
        return {
            visible: false,
            confirmLoading: false,
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
                    span: 16,
                },
            },
            rows: [
                {
                    gutter: 24,
                    //一行默认分为24份 
                    //md12表示 正常屏幕 时一行两列 
                    //sm24 表示 小屏幕 时一行一列
                    md: 24,
                    sm: 24,
                    cols: [
                        {
                            itemConfig: {
                                label: "名称",
                                labelCol: {
                                    style: 'width:100px;'
                                }
                            },
                            tag: "a-input",
                            decorator: [
                                "name",
                                {
                                    rules: [
                                        { required: true, message: "请填写标题!" },
                                    ],
                                },
                            ],
                            $bind: {
                                placeholder: "请填写标题!",
                            }
                        }
                    ]
                },
                {
                    gutter: 24,
                    //一行默认分为24份 
                    //md12表示 正常屏幕 时一行两列 
                    //sm24 表示 小屏幕 时一行一列
                    md: 24,
                    sm: 24,
                    cols: [
                        {
                            itemConfig: {
                                label: "类别",
                                labelCol: {
                                    style: 'width:100px;'
                                }
                            },
                            tag: "a-select",
                            decorator: [
                                "type",
                                {
                                    rules: [
                                        { required: true, message: "请选择类别!" },
                                    ],
                                },
                            ],
                            $bind: {
                                placeholder: "请选择类别",
                            },
                            data: [],
                            dataFormat: {
                                label: 'name',
                                value: 'code'
                            }
                        }
                    ]
                },
                {
                    gutter: 24,
                    //一行默认分为24份 
                    //md12表示 正常屏幕 时一行两列 
                    //sm24 表示 小屏幕 时一行一列
                    md: 24,
                    sm: 24,
                    cols: [
                        {
                            itemConfig: {
                                label: "标题",
                                labelCol: {
                                    style: 'width:100px;'
                                }
                            },
                            tag: "a-input",
                            decorator: [
                                "title",
                                {
                                    rules: [
                                        { required: true, message: "请填写标题!" },
                                    ],
                                },
                            ],
                            $bind: {
                                placeholder: "请填写标题",
                            }
                        }
                    ]
                },
                {
                    gutter: 24,
                    //一行默认分为24份 
                    //md12表示 正常屏幕 时一行两列 
                    //sm24 表示 小屏幕 时一行一列
                    md: 24,
                    sm: 24,
                    cols: [
                        {
                            itemConfig: {
                                label: "连接字符串",
                                labelCol: {
                                    style: 'width:100px;'
                                }
                            },
                            tag: "a-textarea",
                            decorator: [
                                "content",
                                {
                                    rules: [
                                        { required: false, message: "请填写连接字符串!" },
                                    ],
                                },
                            ],
                            $bind: {
                                placeholder: "请填写连接字符串!",
                                rows: 8
                            },

                        }
                    ]
                },
                {
                    gutter: 24,
                    //一行默认分为24份 
                    //md12表示 正常屏幕 时一行两列 
                    //sm24 表示 小屏幕 时一行一列
                    md: 24,
                    sm: 24,
                    cols: [
                        {
                            itemConfig: {
                                label: "注释说明",
                                labelCol: {
                                    style: 'width:100px;'
                                }
                            },
                            tag: "a-input",
                            decorator: [
                                "notes",
                                {
                                    rules: [
                                        { required: false, message: "请输入注释说明!" },
                                    ],
                                },
                            ],
                            $bind: {
                                placeholder: "请输入注释说明",
                            }
                        }
                    ]
                },
                {
                    gutter: 24,
                    //一行默认分为24份 
                    //md12表示 正常屏幕 时一行两列 
                    //sm24 表示 小屏幕 时一行一列
                    md: 24,
                    sm: 24,
                    cols: [
                        {
                            itemConfig: {
                                label: "排序",
                                labelCol: {
                                    style: 'width:100px;'
                                }
                            },
                            tag: "a-input",
                            decorator: [
                                "sort",
                                {
                                    rules: [
                                        { required: true, message: "请输入排序!" },
                                    ],
                                },
                            ],
                            $bind: {
                                placeholder: "请输入排序",
                            }
                        }
                    ]
                }
            ],
            checkedItem: null
        }
    },
    methods: {
        open(params) {
            
            this.checkedItem = params;
            let timer = setTimeout(() => {
                //赋予初始值 
                this.$refs.ybForm.form.setFieldsValue({
                    ...params
                });
                clearTimeout(timer);
                timer = null;
            }, 100);
            this.visible = true;
        },
        handleSubmit() {
            this.$refs.ybForm.form.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    this.confirmLoading = true
                    // addConnetion(values).then(res => {
                    //     if (res.success) {
                    //         this.$message.success('添加成功')
                    //         this.$emit('ok')
                    //         this.handleCancel()
                    //     } else {
                    //         this.$message.error(res.message)
                    //         this.confirmLoading = false
                    //     }
                    // }).catch((err) => {
                    //     this.confirmLoading = false
                    //     throw (err)

                    // })
                }
            });
        },
        handleCancel() {
            this.visible = false;
            this.confirmLoading = false;
        }
    },
    mounted() {
        // this.$set(this.rows[1].cols[0], 'data', this.$options.filters['dictData']('DataConnectionType') || [])

    }
}
</script>