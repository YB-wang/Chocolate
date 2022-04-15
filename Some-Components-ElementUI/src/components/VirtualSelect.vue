<template>
  <el-select
    v-model="proxyValue"
    v-bind="$attrs"
    v-on="$listeners"
    :filter-method="filterMethod"
  >
    <template v-for="(item, index) in computedData">
      <el-option
        v-if="shouldRender(index)"
        ref="li"
        :key="item.value + index"
        :data-content="index"
        :label="item.label"
        :value="item.value"
        :style="{
          position: 'absolute',
          width: '100%',
          top: `${itemHeight * index}px`,
        }"
      />
    </template>
  </el-select>
</template>

<script>
export default {
  name: "VirtualSelect",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: [String, Array, Number],
      default() {
        return [];
      },
    },
    maxNum: {
      type: Number,
      default: () => {
        return 50;
      },
    },
    itemHeight: {
      type: Number,
      default: () => {
        return 34;
      },
    },
    druation: {
      type: Number,
      default: () => {
        return 5;
      },
    },
  },
  data() {
    return {
      currentScrollTop: 0,
      container: Object.create(null),
      scrollTimer: null,
      filterText: "",
    };
  },
  methods: {
    filterMethod(v) {
      this.filterText = v;
      let index = this.computedData.findIndex((item) => item.value.includes(v));
      this.scrollTo(index);
    },
    scrollHandler() {
      if (this.scrollTimer) clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.currentScrollTop = this.container.scrollTop;
        clearTimeout(this.scrollTimer);
      }, this.druation);
    },
    scrollTo(index) {
      if (index === -1) return;
      if (index < 0) index = 0;
      const px = index * this.itemHeight;
      this.container.scrollTop = px;
      this.currentScrollTop = px;
    },
    initSelect() {
      let index = this.options.findIndex((item) => item.value === this.value);
      this.scrollTo(index);
    },
  },
  computed: {
    proxyValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update:value", val);
      },
    },
    computedData() {
      return this.options.filter((item) =>
        item.value.includes(this.filterText)
      );
    },
    startIndex() {
      const index = Math.floor(
        Math.floor(this.currentScrollTop / this.itemHeight) / (this.maxNum / 2)
      );
      return index * (this.maxNum / 2);
    },
    shouldRender() {
      return (i) => i >= this.startIndex && i < this.endIndex;
    },
    endIndex() {
      return this.startIndex + this.maxNum;
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.container = this.$refs.li[0].$el.parentNode.parentNode;
        const ul = this.$refs.li[0].$el.parentNode;
        ul.style.height = this.options.length * this.itemHeight + "px";
        ul.style.position = "relative";
        ul.style["box-sizing"] = "border-box";
        this.container.addEventListener("scroll", this.scrollHandler);
        this.initSelect();
      }, 0);
    });
  },
  beforeDestroy() {
    this.container.removeEventListener("scroll", this.scrollHandler);
  },
};
</script>
