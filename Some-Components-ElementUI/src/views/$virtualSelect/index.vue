<template>
  <div>
    <h1>{{ value }}</h1>
    <VirtualSelect
      :options="options"
      v-model="value"
      filterable
    ></VirtualSelect>
  </div>
</template>

<script>
import VirtualSelect from "../../components/VirtualSelect.vue";
export default {
  components: {
    VirtualSelect,
  },
  data() {
    return {
      options: [],
      value: "value500",
      v2: "",
    };
  },
  methods: {
    init() {},
  },
  mounted() {
    new Promise((resolve) => {
      resolve();
    }).then(() => {
      const data = [];
      for (let i = 0; i < 100000; i++) {
        data.push({
          label: "label" + i,
          value: "value" + i,
        });
      }
      this.options = data;
    });
  },
};
</script>

<style lang=""></style>
