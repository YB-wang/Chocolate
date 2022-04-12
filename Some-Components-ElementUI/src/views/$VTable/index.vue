<template>
  <v-table2
    :columns="columns"
    :loadData="loadData"
    :format="format"
    stripe
    border
    card
    size="medium"
    ref="vTable"
  >
    <template slot="name" slot-scope="scope">{{ scope.row.name }}</template>
    <template slot="type" slot-scope="scope">
      <span v-if="scope.row.type === 1">入口</span>
      <span v-if="scope.row.type === 2">出口</span>
    </template>
    <template slot="isonline" slot-scope="scope">
      <span>{{ scope.row.isonline === 1 ? "在线" : "离线" }}</span>
    </template>
    <template slot="statusDetail" slot-scope="scope">
      <el-button @click="toDetail(scope.row)" type="text">明细</el-button>
    </template>
    <template slot="operation" slot-scope="scope">
      <el-button @click="editFun(scope.row)" type="text">编辑</el-button>
      <el-button @click="delFun(scope.row)" type="text">删除</el-button>
    </template>
  </v-table2>
</template>
<script>
import VTable2 from "@/components/VTable2.vue";
export default {
  components: {
    VTable2,
  },
  data() {
    return {
      columns: [
        {
          prop: "name",
          label: "设备名称",
          type: "slot",
        },
        {
          prop: "devsn",
          label: "设备编号",
        },
        {
          prop: "deviceTypeName",
          label: "设备类型",
        },
        {
          prop: "devModelName",
          label: "设备型号",
        },
        {
          prop: "supplier",
          label: "设备厂商",
        },
        {
          prop: "brand",
          label: "品牌",
        },
        {
          prop: "type",
          label: "出入口",
          type: "slot",
        },
        {
          prop: "isonline",
          label: "状态",
          type: "slot",
        },
        {
          label: "状态明细",
          type: "slot",
          slotName: "statusDetail",
        },
        {
          prop: "createTime",
          label: "创建时间",
          align: "center",
        },
        {
          label: "操作",
          type: "slot",
          fixed: "right",
          slotName: "operation",
        },
      ],
      format: {
        total: "total",
        tableData: "list",
      },
      tableData: [],
    };
  },
  methods: {
    toDetail(val) {
      console.log(val);
    },
    editFun(val) {
      console.log(val);
    },
    delFun(val) {
      console.log(val);
    },
    loadData(pageNo, pageSize) {
      const total = [];
      for (let i = 0; i < 95; i++) {
        total.push({
          id: i,
          devsn: "设备编号" + i,
          name: "name" + i,
          createTime: "2022/04/12",
        });
      }
      return new Promise((resolve) => {
        const arr = [];
        let start = (pageNo - 1) * pageSize;
        let end = start + pageSize - 1;
        for (let i = start; i <= end; i++) {
          const target = total[i];
          if (target) {
            arr.push(target);
          }
        }
        resolve({
          status: 1,
          data: {
            total: total.length,
            list: arr,
          },
        });
      });
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
