<template>
  <div class="comprehensive-rank">
    <div class="header">
      <el-form
        :inline="true"
        :model="formConfig"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item label="统计纬度">
          <el-select v-model="formConfig.mode" placeholder="统计纬度">
            <el-option
              v-for="item in modeData"
              :label="item.label"
              :value="item.value"
              :key="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="formConfig.region" placeholder="区域">
            <el-option
              v-for="item in regionData"
              :label="item.label"
              :value="item.value"
              :key="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="formConfig.city" placeholder="城市">
            <el-option
              v-for="item in cityData"
              :label="item.label"
              :value="item.value"
              :key="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统计周期">
          <el-date-picker
            v-model="formConfig.cycle"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="标段状态">
          <el-select v-model="formConfig.status" placeholder="标段状态">
            <el-option
              v-for="item in blockStatusData"
              :label="item.label"
              :value="item.value"
              :key="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="success" @click="exportFn">导出晾晒报表</el-button>
        </el-form-item>
      </el-form>
      <div class="operation"></div>
      <div class="filter">
        <div class="filter-option">
          <label>排名指标</label>
          <div class="filter-el" v-for="op in series" :key="op.name">
            <el-checkbox v-model="op.checked">{{ op.name }}</el-checkbox>
            <span
              :style="{
                background: op.color,
                width: '30px',
                height: '15px',
                margin: '0 10px 0 0',
              }"
            ></span>
          </div>
        </div>
        <div class="filter-option">
          <label>达标条件</label>
          <div class="filter-el" v-for="op in reachCondition" :key="op.name">
            <el-checkbox v-model="op.checked">{{ op.name }}</el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="chart" ref="chart" style="border: solid 1px grey;"></div>
  </div>
</template>

<script>
import { sortByColumns, base64ToBlob } from "@/utils/index.js";
const orignList = [
  [
    50,
    60,
    40,
    70,
    90,
    120,
    30,
    40,
    75,
    50,
    60,
    70,
    30,
    45,
    65,
    90,
    100,
    55,
    22,
    66,
    77,
  ],
  [
    50,
    60,
    40,
    70,
    90,
    120,
    30,
    40,
    75,
    50,
    60,
    70,
    30,
    45,
    65,
    90,
    100,
    55,
    22,
    66,
    77,
  ],
  [
    50,
    60,
    40,
    70,
    90,
    120,
    30,
    40,
    75,
    50,
    60,
    70,
    30,
    45,
    65,
    90,
    100,
    55,
    22,
    66,
    77,
  ],
  [
    50,
    60,
    40,
    70,
    90,
    120,
    30,
    40,
    75,
    50,
    60,
    70,
    30,
    45,
    65,
    90,
    100,
    55,
    22,
    66,
    77,
  ],
  [
    50,
    60,
    40,
    70,
    90,
    120,
    30,
    40,
    75,
    50,
    60,
    70,
    30,
    45,
    65,
    90,
    100,
    55,
    22,
    66,
    77,
  ],
  [
    50,
    60,
    40,
    70,
    90,
    120,
    30,
    40,
    75,
    50,
    60,
    70,
    30,
    45,
    65,
    90,
    100,
    55,
    22,
    66,
    77,
  ],
];
console.log(orignList.length, orignList[0].length);
const dataList = sortByColumns(orignList);
const barWidth = 50;
let series = [
  {
    name: "person1",
    type: "bar",
    stack: "出勤率",
    barWidth: barWidth,
    label: {
      show: true,
      position: "insideRight",
    },
    color: "#1F6ED5",
    data: dataList[0],
    checked: true,
  },
  {
    name: "person2",
    type: "bar",
    stack: "出勤率",
    barWidth: barWidth,
    label: {
      show: true,
      position: "insideRight",
    },
    color: "#98CEB4",
    data: dataList[1],
    checked: true,
  },
  {
    name: "person3",
    type: "bar",
    stack: "出勤率",
    barWidth: barWidth,
    label: {
      show: true,
      position: "insideRight",
    },
    color: "#FF8C5D",
    data: dataList[2],
    checked: true,
  },
  {
    name: "person4",
    type: "bar",
    stack: "出勤率",
    barWidth: barWidth,
    label: {
      show: true,
      position: "insideRight",
    },
    color: "#CCCCCC",
    data: dataList[3],
    checked: true,
  },
  {
    name: "person5",
    type: "bar",
    stack: "出勤率",
    barWidth: barWidth,
    label: {
      show: true,
      position: "insideRight",
    },
    color: "#FCB74C",
    data: dataList[4],
    checked: true,
  },
  {
    name: "person6",
    type: "bar",
    stack: "出勤率",
    barWidth: barWidth,
    label: {
      show: true,
      position: "insideRight",
    },
    color: "#D4554D",
    data: dataList[5],
    checked: true,
  },
];

const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  yAxis: [
    {
      show: false,
    },
  ],
  xAxis: {
    type: "category",
    data: [
      "a区域",
      "b区域",
      "c区域",
      "d区域",
      "e区域",
      "f区域",
      "g区域",
      "h区域",
      "i区域",
      "j区域",
      "k区域",
      "l区域",
      "m区域",
      "n区域",
      "o区域",
      "p区域",
      "q区域",
      "e区域",
      "s区域",
      "t区域",
      "u区域",
    ],
  },
  dataZoom: {
    show: true,
    type: "slider", //滑动块
    rangeMode: "value",
    start: 0,
    end: 30,
  },
  series: series,
};
let chart = null;

export default {
  data() {
    return {
      series,
      reachCondition: [
        { name: "专项前10名", checked: true },
        { name: "专项前五名", checked: true },
      ],
      formConfig: {
        mode: "all",
        region: "all",
        city: "all",
        cycle: "",
      },
      form: () => Promise.resolve(this.formConfig),
      modeData: [
        { label: "全部", value: "all" },
        { label: "区域", value: "area" },
        { label: "城市", value: "city" },
        { label: "标段", value: "block" },
      ],
      regionData: [
        { label: "全部", value: "all" },
        { label: "南方区域", value: "south" },
        { label: "北方区域", value: "north" },
        { label: "西北区域", value: "westNorth" },
      ],
      cityData: [
        { label: "全部", value: "all" },
        { label: "上海", value: "shanghai" },
        { label: "杭州", value: "hangzhou" },
      ],
      blockStatusData: [
        { label: "全部", value: "all" },
        { label: "在建", value: "1" },
        { label: "停工", value: "2" },
        { label: "竣工", value: "3" },
        { label: "未开工", value: "4" },
        { label: "预交付", value: "5" },
      ],
    };
  },
  methods: {
    exportFn() {
      const res = chart.getDataURL({
        type: "png", // 导出的格式，可选 png, jpeg
        pixelRatio: 20, // 导出的图片分辨率比例，默认为 1。
        backgroundColor: "#ffffff", // 导出的图片背景色，默认使用 option 里的 backgroundColor
        excludeComponents: ["toolbox"], // 忽略组件的列表，例如要忽略 toolbox 就是 ,一般也忽略了'toolbox'这栏就够了
      });

      // const blob = base64ToBlob(res);
      // const url = window.URL.createObjectURL(blob);
      const img = document.createElement("img");
      img.src = res;
      img.style.width = "100%";
      document.body.appendChild(img);
    },
    onSubmit() {
      this.form().then((res) => {
        console.log(res);
      });
    },
    setOption(op) {
      chart.setOption(op, true);
    },
    initChart() {
      this.$nextTick(() => {
        let el = this.$refs.chart;
        chart = this.$echarts.init(el);
        chart.on("dataZoom", function(event) {
          if (event.batch) {
            console.log(event.batch[0]);
          } else {
            console.log(event.start);
          }
        });
        window.addEventListener("resize", this.resizeChart);
        this.setOption(option);
      });
    },
    resizeChart() {
      chart.resize();
    },
  },
  watch: {
    series: {
      deep: true,
      handler: function(val) {
        const op = Object.assign(option, {
          series: val.filter((item) => item.checked),
        });
        chart.setOption(op, true);
      },
    },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    chart = null;
  },
};
</script>

<style lang="scss">
.comprehensive-rank {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f2f2;
  .header {
    box-sizing: border-box;
    .demo-form-inline {
      text-align: start;
    }
    .filter {
      display: flex;
      flex-direction: column;
      .filter-option {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin: 0 0 10px 0;
        label {
          margin: 0 10px 0 0;
        }
        .filter-el {
          display: flex;
          align-items: center;
          margin: 0 10px 0 0;
          .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #606266;
          }
        }
      }
    }
  }
  .chart {
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;
  }
}
</style>
