<template>
  <div class="TableModule">
    <a-table
      :row-selection="rowSelection"
      :columns="tableOptions.tableLabel"
      :data-source="tableOptions.tableData"
      :pagination="{
        total: tableOptions.total,
        'show-total': (total) => `共 ${total} 数据`,
        'page-size': 10,
        size: tableOptions.size || 'small',
        'default-current': 1,
      }"
      v-on="tableOptions.listeners"
      v-bind="tableOptions.props"
    >
      <span slot="tags" slot-scope="tags">
        <a-tag color="geekblue">
          {{ tags }}
        </a-tag>
      </span>
        <!-- record为点击当前行信息 -->
      <span slot="action" slot-scope="text, record">
        <slot :record="record"> </slot>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "TableModule",
  props: {
    /**
     * {
     *  tableLabel:存储表头信息和key（以官方传值为准）,
     *  tableData:传入的数据,
     *  ids:所有选中行的id集合,
     *  selected: 所有选中行信息的集合
     *  isAction: 是否自动加上操作栏
     *  total: 共有多少数据
     * }
    */
    tableOptions: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      selectedRowKeys: [],
    };
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.tableOptions.ids = selectedRows.map((item) => item.id);
          this.tableOptions.selected = selectedRows;
        },
      };
    },
  },
  created() {
    // 列中如果有type为tag则加上scopedSlots属性，以便展示
    this.tableOptions.tableLabel.forEach(item => {
      if (item.type === 'tag') {
        item.scopedSlots = { customRender: 'tags', };
      }
    })
    if (this.tableOptions.isAction) {
      let temp = this.tableOptions.tableLabel.every(item => item.key !== 'action')
      if(!temp) return;
      this.tableOptions.tableLabel.push({
        title: "操作", 
        key: "action",
        scopedSlots: { customRender: "action" },
      });
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>