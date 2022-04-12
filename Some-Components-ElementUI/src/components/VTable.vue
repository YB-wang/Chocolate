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
  },
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    fetchData() {
      this.loadData(this.pageNo, this.pageSize).then((res) => {
        this.tableData = res.data.tableData;
        this.total = res.data.total;
      });
    },
    pageSizeChange(val) {
      this.pageSize = val;
    },
    pageNoChange(val) {
      this.pageNo = val;
    },
    tableMounted() {
      console.log("el-table 渲染完毕", this.$refs.table.$el.offsetHeight);
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
  render() {
    const events = Object.assign(
      {
        "hook:mounted": this.tableMounted,
      },
      this.$listeners
    );
    const attrs = this.$attrs;
    const props = Object.assign(
      {
        data: this.tableData,
      },
      this.$props
    );
    return (
      <div>
        <el-table
          {...{ props: props }}
          {...{ attrs: attrs }}
          {...{ on: events }}
          ref="table"
        >
          {this.columns.map((cl) => {
            if (cl.type === "slot") {
              if (!this.$scopedSlots[cl.slotName || cl.prop]) {
                return;
              }
              return (
                <el-table-column {...{ attrs: cl }}>
                  {(scope) => {
                    return this.$scopedSlots[
                      cl.slotName ? cl.slotName : cl.prop
                    ]({
                      row: scope.row || {},
                    });
                  }}
                </el-table-column>
              );
            }
            return <el-table-column {...{ attrs: cl }}></el-table-column>;
          })}
        </el-table>
        <el-pagination
          onSize-change={this.pageSizeChange}
          onCurrent-change={this.pageNoChange}
          background
          currentPage={this.pageNo}
          pageSize={this.pageSize}
          layout="total, sizes, prev, pager, next, jumper"
          total={this.total}
        ></el-pagination>
      </div>
    );
  },
  mounted() {
    this.fetchData();
  },
};
</script>
