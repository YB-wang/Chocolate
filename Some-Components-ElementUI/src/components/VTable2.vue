<template>
  <div
    class="v-table"
    :style="{
      padding: isCard ? `45px` : `15px`,
    }"
  >
    <el-table
      v-bind="computedTableProps"
      :data="tableData"
      ref="table"
      @hook:updated="onElTableUpdated"
    >
      <template v-for="column in columns">
        <el-table-column
          v-if="column.type === 'slot' || column.slotName"
          v-bind="column"
          :key="column.prop"
        >
          <template slot-scope="scope">
            <slot
              :row="scope.row"
              :name="column.slotName || column.prop"
            ></slot>
          </template>
        </el-table-column>
        <el-table-column v-else v-bind="column" :key="'else-' + column.prop">
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-bind="computedPaginationProps"
        :currentPage="pageNo"
        :pageSize="pageSize"
        :total="total"
        @size-change="pageSizeChange"
        @current-change="pageNoChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
    },
    loadData: {
      type: Function,
      required: true,
    },
    format: {
      type: Object,
    },
    paginationConfig: {
      type: Object,
      default: () => {
        return {}; // @params 传递给分页器的props
      },
    },
  },
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      defaultColumnConfig: {
        "header-align": "center",
      },
      defaultTableConfig: {
        "header-align": "center",
      },
      defaultPaginationConfig: {
        background: "",
        layout: "total, sizes, prev, pager, next, jumper",
      },
    };
  },
  methods: {
    fetchData() {
      this.loadData(this.pageNo, this.pageSize).then((res) => {
        if (this.format) {
          for (const key in this.format) {
            this[key] = res.data[this.format[key]];
            console.log(key, this.format[key]);
          }
          return;
        }
        this.tableData = res.data.result;
        this.total = res.data.total;
      });
    },
    pageSizeChange(val) {
      this.pageSize = val;
    },
    pageNoChange(val) {
      this.pageNo = val;
    },
    onElTableUpdated() {
      const { height } = this.$refs.table.resizeState;
      console.log("el-table:>>>height:", height);
    },
  },
  computed: {
    computedTableProps() {
      const props = {
        ...this.defaultTableConfig,
        ...this.$attrs,
        ...this.$listeners,
      };
      props.data ? props.delete("data") : "";
      return props;
    },
    computedPaginationProps() {
      const props = {
        ...this.defaultPaginationConfig,
        ...this.paginationConfig,
      };
      return props;
    },
    isCard() {
      return this.$attrs.hasOwnProperty("card");
    },
  },
  watch: {
    pageNo() {
      this.fetchData();
    },
    pageSize() {
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.v-table {
  background: #ffffff;
  transition: padding 0.3s ease;
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }
}
</style>
