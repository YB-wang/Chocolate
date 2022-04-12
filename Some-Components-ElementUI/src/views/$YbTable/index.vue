<template>
  <div class="mytable">
    <!-- YBUI -->
    <yb-table
      ref="table"
      :loadData="getTableData"
      :defaultProps="defaultProps"
      :rule="rule"
      :searchRule="searchRule"
      :defaultPageSize="10"
      :fullColumnWidth="true"
      :stripe="true"
      :border="true"
      @handleSelectionChange="handleSelectionChange"
      :beforeSearch="beforeSearch"
    >
      <el-row slot="tableNav" style="display:flex;padding:10px;background-color: #fff;">
        <el-button type="primary" size="small" @click="batchDelete">批量删除</el-button>
      </el-row>
      <span slot="operation" slot-scope="{ record }">
        <el-button @click="edit(record)">编辑</el-button>
      </span>
    </yb-table>
    <!-- YBUI -->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      list: [],
      show: false,
      defaultProps: {
        data: "rows",
        total: "totalRows",
      },
      searchRule: [
        {
          tag: "el-input",
          label: "姓名",
          model: "name",
          $bind: {
            placeholder: "请输入姓名",
            size: "small"
          }
        },
        {
          tag: "el-input",
          label: "年龄",
          model: "age",
          $bind: {
            placeholder: "请输入姓名",
            size: "small"
          }
        },

        {
          tag: "el-select",
          label: "性别",
          model: "sex",
          $bind: {
            data: [
              {
                label: "男",
                value: "1"
              },
              {
                label: "女",
                value: "2"
              }
            ],
            placeholder: "请选择性别",
            size: "small"
          }
        },
        {
          tag: "el-date-picker",
          label: "日期",
          model: "date",
          $bind: {
            placeholder: "请选择日期",
            size: "small",
            "value-format":"yyyy-MM-dd hh:mm"
          }
        },
        {
          tag: "yb-treeSelect",
          label: "事件类型",
          model: "EventID",
          $bind: {
            data: [{
              label: '一级 1',
              value: "1",
              children: [{
                label: '二级 1-1',
                value: "1-1",
                children: [{
                  label: '三级 1-1-1',
                  value: "1-1-1",
                }]
              }]
            }, {
              label: '一级 2',
              value: "2",
              children: [{
                label: '二级 2-1',
                value: "2-1",
                children: [{
                  label: '三级 2-1-1',
                  value: "2-1-1",
                }]
              }, {
                label: '二级 2-2',
                value: "2-2",
                children: [{
                  label: '三级 2-2-1',
                  value: "2-2-1",
                }]
              }]
            }, {
              label: '一级 3',
              value: "3",
              children: [{
                label: '二级 3-1',
                value: "3-1",
                children: [{
                  label: '三级 3-1-1',
                  value: "3-1-1",
                }]
              }, {
                label: '二级 3-2',
                value: "3-2-2",
                children: [{
                  label: '三级 3-2-1',
                  value: "3-2-1",
                }]
              }]
            }],
            placeholder: "请选择事件类型",
            size: "small",
            filterable: true
          }
        }
      ],
      rule: [
        {
          type: "selection",
          $bind: {
            prop: "selection",
            fixed: "left",
            align: "center"
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "id",
            label: "ID",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "name",
            label: "姓名",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "age",
            label: "年龄",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "sex",
            label: "性别",
          }
        },
        {
          type: "normal",

          $bind: {
            align: "center",
            prop: "date",
            label: "出生日期",
          }
        },
        {
          type: "normal",

          $bind: {
            align: "center",
            prop: "email",
            label: "邮箱",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v1",
            label: "v1",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v2",
            label: "v2",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v3",
            label: "v3",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v4",
            label: "v4",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v5",
            label: "v5",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v7",
            label: "v7",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v8",
            label: "v8",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v9",
            label: "v9",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v10",
            label: "v10",
          }
        },
        {
          type: "normal",
          $bind: {
            align: "center",
            prop: "v11",
            label: "v11",
          }
        },
        {
          type: "slot",
          slotName: "operation",
          $bind: {
            align: "center",
            fixed: "right",
            width: "200px",
            prop: "operation",
            label: "操作",
          }
        },
      ],
      selected: []
    };
  },
  methods: {
    edit(val) {
      console.log(val);
    },
    //请求方法
    getTableData(params) {
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
            date: `${this.$dealtime(new Date() * Math.random())}`,
            v1: "v1",
            v2: "v2",
            v3: "v3",
            v4: "v4",
            v5: "v5",
            v6: "v6",
            v7: "v7",
            v8: "v8",
            v9: "v9",
            v10: "v10",
            v11: "v11",
          };
          tableData.push(obj);
        }
        let newArr = [];
        for (
          let i = (params.PageNo - 1) * params.PageSize;
          i <= (params.PageNo - 1) * params.PageSize + params.PageSize - 1;
          i++
        ) {
          if (tableData[i]) {
            newArr.push(tableData[i]);
          }
        }

        let timer = setTimeout(() => {
          resolve(
            {
              data: {
                success: true,
                data: {
                  rows: newArr,
                  totalRows: tableData.length * 1,
                }
              }
            }
          );
          clearTimeout(timer);
          timer = null;
        }, 200);
      });
    },
    //多选
    handleSelectionChange(val) {
      this.selected = val;
      console.log(val);
    },
    batchDelete() {
      console.log(this.selected);
    },
    //操作
    deal(val) {
      console.log(val);
    },
    beforeSearch() {
      if (this.$refs.table.params.date) {
        this.$refs.table.params.date = this.$dealtime(this.$refs.table.params.date)
      }
    },

  },
  mounted() {
    //addRoute 测试
    // this.$router.addRoute({
    //   path: '/Test',
    //   name: 'Test',
    //   component: () => import('../views/Test.vue')
    // });
    console.log(this.$router.getRoutes());
  },
};
</script>
<style lang="scss" scoped>
.mytable {
  background-color: rgb(190, 190, 190);
  padding: 10px;
}
</style>