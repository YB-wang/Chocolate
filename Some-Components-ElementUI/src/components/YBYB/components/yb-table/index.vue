<template>
  <div class="yb-table" v-loading="loading">
    <!-- 默认一行只能容纳四个 -->
    <el-row class="search" :span="24" v-if="searchRule.length && searchRule.length <= 6">
      <el-col class="searchItem" :span="4" v-for="item in searchRule" :key="item.key">
        <label>{{ item.label }}：</label>
        <!-- input -->
        <el-input v-model="params[item.model]" v-bind="item.$bind" v-if="item.tag === 'el-input'"></el-input>

        <!-- select -->
        <el-select v-model="params[item.model]" v-bind="item.$bind" v-if="item.tag === 'el-select'">
          <el-option
            v-for="item in item.data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- datePicker -->
        <el-date-picker
          v-model="params[item.model]"
          type="date"
          v-bind="item.$bind"
          v-if="item.tag === 'el-date-picker'"
        ></el-date-picker>

        <yb-treeSelect
          v-model="params[item.model]"
          v-bind="item.$bind"
          v-if="item.tag === 'yb-treeSelect'"
        ></yb-treeSelect>
      </el-col>
      <span class="btnItem">
        <el-button @click="search()" size="small" type="primary">查询</el-button>
        <el-button @click="reset()" size="small">重置</el-button>
      </span>
    </el-row>
    <!-- 超过四个则隐藏超出的部分 -->
    <div v-else class="search">目前最多支持五个搜索参数,折叠功能开发中，或者请自行修改源码二次开发。。。</div>

    <slot name="tableNav"></slot>
    <!-- table 部分 -->
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      :stripe="$attrs.stripe"
      :border="border"
    >
      <template v-for="item in rule">
        <el-table-column
          v-if="item.type === 'selection'"
          :key="item.$bind.prop"
          type="selection"
          v-bind="item.$bind"
        ></el-table-column>
        <!-- 是否自动盛满列 -->
        <!-- 当fullColumnWidth为true 并且没有传入width时 自动撑满-->
        <el-table-column
          v-if="item.type === 'normal' && $attrs.fullColumnWidth && !item.$bind.width"
          :key="item.$bind.prop"
          v-bind="item.$bind"
          :width="fullColumnWidth(item.$bind.prop, tableData)"
        ></el-table-column>
        <!-- fullColumnWidth为false 或者 只要传入width就应用width的宽度-->
        <el-table-column
          v-if="item.type === 'normal' && (item.$bind.width || !$attrs.fullColumnWidth)"
          :key="item.$bind.prop"
          v-bind="item.$bind"
        ></el-table-column>

        <!-- slot是否自动盛满列 -->
        <!-- 当fullColumnWidth为true 并且没有传入width时 自动撑满-->
        <el-table-column
          v-if="item.type === 'slot' && $attrs.fullColumnWidth && !item.$bind.width"
          :key="item.$bind.prop"
          v-bind="item.$bind"
          :width="fullColumnWidth(item.$bind.prop, tableData)"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :record="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- fullColumnWidth为false 或者 只要传入width就应用width的宽度-->
        <el-table-column
          v-if="item.type === 'slot' && (item.$bind.width || !$attrs.fullColumnWidth)"
          :key="item.$bind.prop"
          v-bind="item.$bind"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :record="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="paginationRow">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.PageNo"
        :page-sizes="[10, 15, 20, 30, 50, 100, 200]"
        :page-size="params.PageSize"
        prev-text="上一页"
        next-text="下一页"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  name: "yb-table",
  inheritAttrs: false,
  components: {

  },
  directives: {

  },
  props: {
    rule: {
      type: Array,
      default: () => {
        return [];
      },
    },
    searchRule: {
      type: Array,
      default: () => {
        return [];
      },
    },
    loadData: {
      required: true,
    },
    defaultProps: {
      type: Object,
    },
    beforeSearch: {
      type: Function,
    },
    border: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    defaultPageSize: {
      type: Number,
      default: () => {
        return 10;
      },
    },
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      params: {
        PageNo: 1,
        PageSize: 10,
      },
      total: 0,
      loading: true,
    };
  },
  methods: {
    fullColumnWidth(str, tableData, fontSize = 16) {
      let len = "75px";
      function getValue(v) {
        let value = 0;
        let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
        for (let i = 0; i < v.length; i++) {
          if (reg.test(v.charAt(i))) {
            value += 1
          } else {
            value += 0.5
          }
        }
        return value;
      }
      if (tableData.length) {
        let allStr = []
        tableData.forEach(item => {
          if (!item[str] && item[str] !== 0) {
            item[str] = ""
          }
          allStr.push(item[str].toString())
        });

        let temp = getValue(allStr[0]);
        allStr.forEach(val => {
          if (getValue(val) > temp) {
            temp = getValue(val)
          }
        });
        len = `${temp * fontSize + 75}px`
      }
      return len
    },
    //每页数量
    handleSizeChange(val) {
      console.log("PageSize", val);
      this.params.PageSize = val;
      this.inintData();
    },
    //翻页
    handleCurrentChange(val) {
      console.log("翻页", val);
      this.params.PageNo = val;
      this.inintData();
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    //获取数据
    inintData() {
      if (!this.loading) {
        this.loading = true;
      }
      console.log("请求参数:", this.params);
      this.loadData(this.params)
        .then((res) => {
          res = res.data
          // // eslint-disable-next-line no-debugger
          // debugger
          if (res.success) {
            res = res.data
            if (this.defaultProps) {
              //判断有没有超过最大页数 超过则页数减1然后重新请求
              if (res[this.defaultProps.data].length) {
                this.tableData = res[this.defaultProps.data];
                this.total = res[this.defaultProps.total];
                this.loading = false;
                // this.$message({
                //   message: "请求成功",
                //   showClose: true,
                //   type: "success",
                // });
              } else {
                //判断当前页数是否大于1
                if (this.params.PageNo > 1) {
                  let temp = this.params.PageNo;
                  while (
                    temp > 1 && ((temp * this.params.PageSize - res[this.defaultProps.total]) >= this.params.PageSize)) {
                    temp = temp - 1;

                  }
                  this.params.PageNo = temp;
                  this.inintData();
                } else {
                  this.tableData = res[this.defaultProps.data];
                  this.total = res[this.defaultProps.total];
                  this.loading = false;
                }
              }
            } else {
              //判断有没有超过最大页数 超过则页数减1然后重新请求
              if (res.data.length) {
                this.tableData = res.data;
                this.total = res.total;
                this.loading = false;
                // this.$message({
                //   message: "请求成功",
                //   showClose: true,
                //   type: "success",
                // });
              } else {
                //判断当前页数是否大于1
                if (this.params.PageNo > 1) {
                  let temp = this.params.PageNo;
                  while (
                    temp > 1 && ((temp * this.params.PageSize - res.total) >= this.params.PageSize)) {
                    temp = temp - 1;
                  }
                  this.params.PageNo = temp;
                  this.inintData();
                } else {
                  this.tableData = res.data;
                  this.total = res.total;
                  this.loading = false;
                }
              }
            }
          }
        });
      console.log("请求结果：", this.tableData);
      // .catch((err) => {
      //   this.$message({
      //     type: "error",
      //     showClose: true,
      //     message: err,
      //   });
      // });
    },
    //刷新
    refresh(bl = false) {
      if (bl) {
        this.$set(this.params, "PageNo", 1);
        this.inintData();
        //bl为真则 强制刷新到第一页
      } else {
        //默认在当前页数刷新
        this.inintData();
      }
    },
    //重置
    reset(bl = false) {
      if (bl) {
        //bl为真则 强制刷新到第一页
        this.params = {
          PageNo: 1,
          PageSize: 10,
        };
        this.inintData();
      } else {
        //默认在当前页数刷新
        let { PageSize, PageNo } = this.params;
        this.params = {
          PageNo,
          PageSize,
        };
        this.inintData();
      }
    },
    //查询
    search(bl = false) {
      if (this.beforeSearch) {
        this.beforeSearch();
      }
      this.refresh(bl);
    },
  },
  watch: {},
  mounted() {
    this.params.PageSize = this.defaultPageSize;
    this.inintData();

    console.log("attrs:", this.$attrs);


  },
};
</script>

<style lang="scss" scoped>
.yb-table {
  /deep/.full {
    .el-select {
      width: 100%;
      .el-input {
        width: 100%;
      }
    }
    .el-date-editor {
      width: 100%;
    }
  }
  .paginationRow {
    background-color: #fff;
    padding: 10px;
  }
  /deep/.btn-prev {
    span {
      padding: 0 10px !important;
    }
  }
  /deep/.btn-next {
    span {
      padding: 0 10px !important;
    }
  }
  .search {
    padding: 10px 10px 0 10px;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #fff;
    overflow: hidden;
    .searchItem {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      min-width: 200px;
      margin-right: 15px;
      label {
        white-space: nowrap;
      }
    }
    .btnItem {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  }
}
</style>
