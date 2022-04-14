<template>
  <el-select
    ref="elSelectRef"
    v-model="proxyValue"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(item, i) in options">
      <el-option
        v-if="isRender(i)"
        ref="li"
        :key="item.value + i"
        :data-content="i"
        :label="item.label"
        :value="item.value"
      />
    </template>
  </el-select>
</template>

<script>
const maxNum = 50;
const itemHeight = 34;
export default {
  name: "BaseSelect",
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
  },
  data() {
    return {
      currentScrollTop: 0,
      observer: Object.create(null),
      startIndex: 0,
      ul_Element: Object.create(null),
    };
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
    // 判断当前项是否符合插入DOM的条件
    isRender() {
      return (i) => i >= this.startIndex && i < this.endIndex;
    },
    // 通过startIndex + 一屏渲染数计算当前最大显示的index
    endIndex() {
      return this.startIndex + maxNum;
    },
  },
  methods: {},
  mounted() {
    setTimeout(() => {
      const container = this.$refs.li[0].$el.parentNode.parentNode;
      const ul = this.$refs.li[0].$el.parentNode;
      ul.style.height = this.options.length * itemHeight + "px";
      ul.style["box-sizing"] = "border-box";
      let cache = 0;
      container.addEventListener("scroll", (e) => {
        const scrollTop = container.scrollTop;
        const range = Math.floor(
          container.scrollTop / (itemHeight * (maxNum / 2))
        );
        //向下滚动
        if (scrollTop > this.currentScrollTop) {
          this.currentScrollTop = scrollTop;
          if (range > cache) {
            cache += 1;
            this.startIndex += maxNum / 2;
            ul.style.paddingTop = this.currentScrollTop + 6 + "px";
            return;
          }
        }
      });
    });
  },
};
</script>
<style></style>
