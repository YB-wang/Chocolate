<template>
    <div class="willdo">
        <div class="topTable">
            <a-card :border="false">
                <s-table
                    ref="tableTop"
                    class="parentTable"
                    :columns="columns"
                    :data="loadData"
                    :alert="true"
                    :rowKey="(record) => record.id"
                    @expand="expand"
                    :expandedRowKeys="expandedRowKeys"
                    :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'checkbox' }"
                    :scroll="{ x: 'max-content' }"
                    :tableSettingID="'table-setting-No1'"
                    size="small"
                >
                    <span slot="action">
                        <a>操作</a>
                        <a-divider type="vertical" />
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>删除</span>
                            </template>
                            <i
                                class="el-icon-delete"
                                style="color:#F56C6C;cursor: pointer;font-size:18px;"
                            />
                        </a-tooltip>
                    </span>
                </s-table>
            </a-card>
        </div>
    </div>
</template>
<script>

import STable from "@/components/Table/index.js"
import { getMockList, editMockData } from "@/api/index.js"
export default {
    components: {
        STable
    },
    data() {
        return {
            scrollLeft: 0,
            scrollEl: null,
            timer: null,
            columns: [{
                title: '送检编号',
                dataIndex: 'systemIP',
                sorter: true,
                width: 300
            },
            {
                title: '样品编号',
                dataIndex: 'unit',
                sorter: true
            },
            {
                title: '样品名称',
                dataIndex: 'sunit',
                sorter: true
            },
            {
                title: '样品数量',
                dataIndex: 'startDate',
                sorter: true
            },
            {
                title: '操作',
                dataIndex: 'action',
                align: "center",
                scopedSlots: { customRender: 'action' }
            }],
            tableData: [],
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                return getMockList(Object.assign(parameter, this.searchParams)).then((res) => {
                    console.log(res);
                    return res.data.data
                })
            },
            selectedRowKeys: [],
            selectedRows: [],
            selectedRowKeys2: [],
            selectedRows2: [],
            searchParams: {

            },
            searchRule: [
                {
                    tag: "a-select",
                    label: "送检类别",
                    $bind: {
                        options: [
                            {
                                label: "全部",
                                value: 0,
                            },
                            {
                                label: "环境监测",
                                value: 1,
                            },
                            {
                                label: "空气监测",
                                value: 2,
                            },
                        ]
                    },
                    model: "type"
                },
                {
                    tag: "a-select",
                    label: "检品编号",
                    $bind: {
                        options: []
                    },
                    model: "name"
                }
            ],
            expandedRowKeys: []
        }
    },
    methods: {
        search(val) {
            const values = this.$deepClone(val);

            this.searchParams = values;
            console.log(this.searchParams);
        },
        reset() {
            this.searchParams = {};
            console.log(this.searchParams);
        },
        deleteItem(val) {
            console.log(val);

        },
        save(key, record) {
            console.log("修改后的数据:", record);
            const newData = [...this.$refs.tableBottom.localDataSource];
            const target = newData[key];
            if (target) {
                delete target.editable
                this.$refs.tableBottom.setlocalDataSource(newData);
            }
            editMockData(record).then(res => {
                if (res.success) {
                    this.$message.success(`id:${key + 1},修改成功`);
                    this.$refs.tableBottom.refresh()
                }
            })
        },
        edit(key, record) {
            console.log(key);
            console.log("正在修改的数据:", record);
            const newData = [...this.$refs.tableBottom.localDataSource];
            const target = newData[key];
            if (target) {
                target.editable = true;
                this.$refs.tableBottom.setlocalDataSource(newData);
            }
        },
        expand(expanded, record) {
            if (!this.expandedRowKeys.length) {
                this.expandedRowKeys.push(record.id)
            } else {
                if (this.expandedRowKeys[0] != record.id) {
                    this.expandedRowKeys.pop();
                    this.expandedRowKeys.push(record.id)
                } else {
                    this.expandedRowKeys.pop();
                }
            }
        },
        onSelectChange(selectedRowKeys, selectedRows) {
            this.selectedRowKeys = selectedRowKeys;
            this.selectedRows = selectedRows;
            console.log(selectedRowKeys, selectedRows);
        },
        onSelectChange2(selectedRowKeys, selectedRows) {
            this.selectedRowKeys2 = selectedRowKeys;
            this.selectedRows2 = selectedRows;
        },
        onSelectChange3(selectedRowKeys, selectedRows) {
            this.selectedRowKeys3 = selectedRowKeys;
            this.selectedRows3 = selectedRows;
            console.log(this.selectedRows3, this.selectedRowKeys3);
        },

    },
    mounted() {
        
    }
}
</script>
<style lang="less" scoped>
/deep/ .ant-card-body {
    padding: 10px;
}

.willdo {
    .topTable {
        margin-bottom: 10px;
    }
    /deep/.default-theme {
        .splitpanes__splitter {
            &::before {
                background-color: #7f8c8d !important;
            }
            &::after {
                background-color: #7f8c8d !important;
            }
        }

        // 修改table 固定高度
        .ant-table {
            .ant-table-scroll > .ant-table-body {
                min-height: 550px !important;
            }
        }
    }
    /deep/.table-operator {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0 !important;
        .title {
            font-size: 16px;
            font-weight: 900;
            padding: 0 10px;
        }
        .icon {
            display: flex;
            align-items: center;
        }
    }
}
</style>