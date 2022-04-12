<template>
    <div>
        <!-- 按比例 -->
        <div v-if="layout === 'auto'">
            <div class="ybSearch" :style="obj1" v-if="border">
                <a-form>
                    <a-row :gutter="48">
                        <a-col v-for="(item,index) in rule" :key="item.model" :md="5" :sm="24">
                            <!-- 默认展示的 -->
                            <a-form-item :label="item.label" v-if="index <= 2">
                                <a-input
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-input'"
                                ></a-input>
                                <a-select
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-select'"
                                ></a-select>

                                <a-tree-select
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    tree-default-expand-all
                                    v-if="item.tag === 'a-tree-select'"
                                ></a-tree-select>
                                <a-date-picker
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-date-picker'"
                                />
                                <a-range-picker
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-range-picker'"
                                />
                            </a-form-item>
                            <!-- 隐藏 -->
                            <a-form-item :label="item.label" v-show="index > 2 && advanced">
                                <a-input
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-input'"
                                ></a-input>
                                <a-select
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-select'"
                                ></a-select>
                                <a-tree-select
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    tree-default-expand-all
                                    v-if="item.tag === 'a-tree-select'"
                                ></a-tree-select>
                                <a-date-picker
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-date-picker'"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :md="!advanced && 5 || 24" :sm="24" style="margin-top:3px">
                            <span
                                class="table-page-search-submitButtons"
                                :style="advanced && { float: 'right', overflow: 'hidden', margin: '0 0 24px 0' } || {}"
                            >
                                <a-button type="primary" @click="search">查询</a-button>
                                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
                                <a
                                    @click="toggleAdvanced"
                                    style="margin-left: 8px"
                                    v-if="rule.length > 3"
                                >
                                    {{ advanced ? '收起' : '展开' }}
                                    <a-icon :type="advanced ? 'up' : 'down'" />
                                </a>
                            </span>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="ybSearch" :style="obj2" v-else>
                <a-form>
                    <a-row :gutter="48">
                        <a-col v-for="(item,index) in rule" :key="item.model" :md="5" :sm="24">
                            <!-- 默认展示的 -->
                            <a-form-item :label="item.label" v-if="index <= 2">
                                <a-input
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-input'"
                                ></a-input>
                                <a-select
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-select'"
                                ></a-select>

                                <a-tree-select
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    tree-default-expand-all
                                    v-if="item.tag === 'a-tree-select'"
                                ></a-tree-select>
                                <a-date-picker
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-date-picker'"
                                />
                            </a-form-item>
                            <!-- 隐藏 -->
                            <a-form-item :label="item.label" v-if="index > 2 && advanced">
                                <a-input
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-input'"
                                ></a-input>
                                <a-select
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-select'"
                                ></a-select>
                                <a-tree-select
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    tree-default-expand-all
                                    v-if="item.tag === 'a-tree-select'"
                                ></a-tree-select>
                                <a-date-picker
                                    v-bind="item.$bind"
                                    v-model="params[item.model]"
                                    v-if="item.tag === 'a-date-picker'"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :md="!advanced && 5 || 24" :sm="24" style="margin-top:3px">
                            <span
                                class="table-page-search-submitButtons"
                                :style="advanced && { float: 'right', overflow: 'hidden', margin: '0 0 24px 0' } || {}"
                            >
                                <a-button type="primary" @click="search">查询</a-button>
                                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
                                <a
                                    @click="toggleAdvanced"
                                    style="margin-left: 8px"
                                    v-if="rule.length > 3"
                                >
                                    {{ advanced ? '收起' : '展开' }}
                                    <a-icon :type="advanced ? 'up' : 'down'" />
                                </a>
                            </span>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </div>
        <!-- 不按比例 -->
        <!-- 不隐藏 -->
        <div v-if="layout === 'fixed' && !hidden" class="ybSearch2">
            <div class="item" :style="itemStyle" v-for="item in rule" :key="item.model">
                <label :style="labelStyle">{{ item.label }}:</label>
                <div :style="contentStyle">
                    <a-input
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        v-if="item.tag === 'a-input'"
                    ></a-input>
                    <a-select
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        v-if="item.tag === 'a-select'"
                    ></a-select>

                    <a-tree-select
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        tree-default-expand-all
                        v-if="item.tag === 'a-tree-select'"
                    ></a-tree-select>
                    <a-date-picker
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        v-if="item.tag === 'a-date-picker'"
                    />
                    <a-range-picker
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        v-if="item.tag === 'a-range-picker'"
                    />
                </div>
            </div>
            <div class="item" :style="itemStyle">
                <label :style="labelStyle"></label>
                <div :style="contentStyle" style="text-align:start;">
                    <a-button type="primary" style="margin-right:10px" @click="search">查询</a-button>
                    <a-button @click="reset">重置</a-button>
                </div>
            </div>
        </div>
        <!-- 隐藏 -->
        <div v-if="layout === 'fixed' && hidden" class="ybSearch2">
            <div
                class="item"
                :style="itemStyle"
                v-for="(item,index) in rule"
                :key="item.model"
                v-show="((index + 1) <= hidden) || advanced2"
            >
                <label :style="labelStyle">{{ item.label }}:</label>
                <div :style="contentStyle">
                    <a-input
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        v-if="item.tag === 'a-input'"
                    ></a-input>
                    <a-select
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        v-if="item.tag === 'a-select'"
                    ></a-select>

                    <a-tree-select
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        tree-default-expand-all
                        v-if="item.tag === 'a-tree-select'"
                    ></a-tree-select>
                    <a-date-picker
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        v-if="item.tag === 'a-date-picker'"
                    />
                    <a-range-picker
                        v-bind="item.$bind"
                        v-model="params[item.model]"
                        v-if="item.tag === 'a-range-picker'"
                    />
                </div>
            </div>
            <div class="item" :style="itemStyle">
                <label :style="labelStyle"></label>
                <div :style="contentStyle">
                    <a-button type="primary" style="margin-right:10px" @click="search">查询</a-button>
                    <a-button @click="reset">重置</a-button>
                    <a @click="toggleAdvanced2" v-if="hidden && rule.length > hidden">
                        {{ advanced2 ? '收起' : '展开' }}
                        <a-icon :type="advanced2 ? 'up' : 'down'" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: "yb-search",
    props: {
        rule: {
            type: Array,
            required: true
        },
        border: {
            type: Boolean,
            default: () => {
                return true
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
        defaultParams: {
            type: Object,
            default: () => {
                return {

                }
            }
        },
        layout: {
            type: String,
            default: () => {
                return 'auto'
            }
        },
        labelStyle: {
            type: Object,
            default: () => {
                return {
                    width: "100px"
                }
            }
        },
        itemStyle: {
            type: Object,
            default: () => {
                return {
                    width: "300px"
                }
            }
        },
        contentStyle: {
            type: Object,
            default: () => {
                return {

                }
            }
        },
        hidden: {
            type: Number,
            default: () => {
                return NaN
            }
        }
    },
    data() {
        return {
            params: {

            },
            advanced: false,
            advanced2: false,
            timer: null,
            obj1: {
                padding: "24px"
            },
            obj2: {
                padding: "0 24px"
            }
        }
    },
    methods: {
        toggleAdvanced() {
            this.advanced = !this.advanced
        },
        toggleAdvanced2() {
            this.advanced2 = !this.advanced2
        },
        search() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.$emit("handleSearch", this.params);
                clearTimeout(this.timer);
                this.timer = null;
            }, 200);


        },
        reset() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.params = this.$deepClone(this.defaultParams);
                this.$emit("reset");
                clearTimeout(this.timer);
                this.timer = null;
            }, 200);
        }
    },
    mounted() {
        this.params = this.$deepClone(this.defaultParams);
    }
}
</script>
<style scoped lang="scss">
.ybSearch {
    background-color: #fff;
    /deep/.ant-form-item {
        display: flex;
    }
    /deep/.ant-form-item .ant-form-item-label label {
        margin-right: 10px;
    }
    /deep/.ant-form-item .ant-form-item-control-wrapper {
        flex: 1;
    }
}

.ybSearch2 {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    .item {
        display: flex;
        align-items: center;
        margin: 0 20px 10px 0;
        label {
            margin-right: 5px;
            text-align: end;
        }
        div {
            flex: 1;
            /deep/ .ant-select {
                width: 100%;
            }
        }
    }
}
</style>