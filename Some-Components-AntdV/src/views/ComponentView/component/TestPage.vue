<template>
    <a-modal
        v-model="visible"
      :maskClosable="false"
        title="新增"
        @ok="handleSubmit"
        @cancel="handleCancel"
        :confirmLoading="confirmLoading"
        width="70%"
        cancelText="取消"
        okText="确定"
    >
        <a-form-model ref="ruleForm" :model="form" v-if="visible">
            <a-row :gutter="48" class="formRow" v-for="(option,index) in form.domains" :key="index">
                <div :span="8" class="formCol">
                    <a-form-model-item
                        :prop="'domains.' + index + '.name'"
                        label="分类名称"
                        class="formItem"
                        :rules="{ required: true, message: '请填写分类名称', trigger: 'change' }"
                    >
                        <a-input v-model="option.name" placeholder="请填写分类名称" />
                    </a-form-model-item>
                </div>
                <div :span="8" class="formCol">
                    <a-form-model-item
                        :prop="'domains.' + index + '.version'"
                        label="版本"
                        class="formItem"
                        :rules="{ required: true, message: '请选择版本', trigger: 'change' }"
                    >
                        <a-select v-model="option.version" placeholder="请选择版本">
                            <a-select-option
                                v-for="item in  versionList"
                                :value="item.code"
                                :key="item.code"
                            >{{ item.name }}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </div>
                <div :span="8" class="formCol">
                    <a-form-model-item
                        :prop="'domains.' + index + '.code'"
                        label="手机号"
                        class="formItem"
                        :rules="{ required: true,  trigger: 'change',pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请输入正确的手机号!' }"
                    >
                        <a-input v-model="option.code" placeholder="请输入分类编码"></a-input>
                    </a-form-model-item>
                </div>
                <div class="extra">
                    <a-icon type="minus-circle" v-if="index !== 0" @click="deleteItem(index)" />
                </div>
            </a-row>
            <div class="add">
                <a-button type="primary" icon="plus" @click="addItem">Add</a-button>
            </div>
        </a-form-model>
    </a-modal>
</template>
<script>
export default {
    data() {
        return {
            visible: true,
            confirmLoading: false,
            labelCol: { span: 2 },
            wrapperCol: { span: 6 },
            other: '',
            form: {
                domains: [
                    {

                    }
                ]
            },
            versionList:[
                {
                    name:1,
                    code:1
                },
                {
                    name:2,
                    code:2
                }
            ]
        };
    },
    methods: {
        open() {
            this.visible = true;
        },
        addItem() {
            this.form.domains.push({

            })
        },
        deleteItem(index) {
            this.form.domains.splice(index, 1)
        },
        handleSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    console.log(this.form.domains);

                } else {

                    return false;
                }
            });
        },
        handleCancel() {
            // this.$refs.ruleForm.resetFields();
            this.form.domains = [{}];
            this.visible = false;
        },
    },
};
</script>
<style lang="less" scoped>
.formRow {
    display: flex;
    align-items: center;
    .formCol {
        flex: 1;
        display: flex;
        align-items: center;
        .formItem {
            flex: 1;
            display: flex;
            /deep/.ant-form-item-label {
                box-sizing: border-box;
                padding: 0 10px;
                min-width: 75px;
                margin-right: 5px;
                text-align: right;
                white-space: nowrap;
            }
            /deep/.ant-form-item-control-wrapper {
                flex: 1;
            }
        }
    }
    .extra {
        width: 100px;
        box-sizing: border-box;
        padding: 0 15px;
        margin-right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 24px;
        font-size: 20px;
        cursor: pointer;
    }
}
.add {
    box-sizing: border-box;
    padding: 15px 15px 15px 60px;
}
</style>