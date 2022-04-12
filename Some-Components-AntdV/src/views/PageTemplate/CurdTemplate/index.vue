<template>
    <div class="curdTemplate">
        <div class="search">
            <span class="item">
                <label>名称：</label>
                <a-input v-model="searchParams.Name" />
            </span>
            <span class="item">
                <label>类别：</label>

                <a-select v-model="searchParams.Type">
                    <a-select-option
                        :value="item.code"
                        v-for="item in typeList"
                        :key="item.name"
                    >{{ item.name }}</a-select-option>
                </a-select>
            </span>
            <span class="item">
                <label>标题：</label>
                <a-input v-model="searchParams.Title" />
            </span>
            <span class="item" style="margin-left:15px">
                <a-button type="primary" @click="search" style="margin-right:15px">搜索</a-button>
                <a-button @click="reset">重置</a-button>
            </span>
        </div>
        <s-table ref="table" :rowKey="(record) => record.id" :columns="columns" :data="loadData">
            <span slot="action" slot-scope="text,record">
                <a href="javascript:void(0)" @click="editItem(record)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                    title="确定删除？"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteItem(record)"
                >
                    <a href="javascript:void(0)">删除</a>
                </a-popconfirm>
            </span>
        </s-table>
    </div>
</template>
<script>
import STable from "@/components/Table/index"
const getTableData = (params) => {
    console.log(params);
    return new Promise((resolve) => {
        let tableData = [];
        for (let i = 0; i < 200; i++) {
            let sex = Math.random() * 10 > 5 ? "男" : "女";
            let obj = {
                id: i,
                name: `${Math.random().toString(16).slice(2)}`,
                age: Math.floor(Math.random() * 100),
                email: `${Math.random().toString(16).slice(2)}@.com`,
                sex: sex,
                v1: "v1",
                v2: "v2",
                v3: "v3",
            };
            tableData.push(obj);
        }


        let timer = setTimeout(() => {
            resolve(
                {
                    data: {
                        success: true,
                        data: {
                            rows: tableData
                        }
                    }
                }
            );
            clearTimeout(timer);
            timer = null;
        }, 200);
    });
}
export default {
    components: {
        STable
    },
    data() {
        return {
            columns: [
                {
                    title: 'id',
                    dataIndex: 'id',
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                }
            ],
            searchParams: {
                PageNo: 1,
                PageSize: 10
            },
            loadData: params => {
                return getTableData(params).then((res) => {
                    console.log("请求结果:", res);
                    return res.data.data
                })
            }
        }

    },
    methods: {
        editItem(record) {
            console.log(record);
        },
        deleteItem(record) {
            console.log(record);
        }
    },
    mounted() {

    }
};
</script>


<style lang="scss">
.curdTemplate {
    width: 100%;
    height: 100%;
    .search {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 10px;
        .item {
            width: 220px;
            display: flex;
            align-items: center;
            label {
                width: 100px;
                text-align: end;
                align-items: center;
            }
           .ant-select {
                width: 100%;
            }
        }
    }
}
</style>
