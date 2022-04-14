<template>
  <div>
    <VirtualSelect :options="options" v-model="value"></VirtualSelect>
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
      value: "",
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
      for (let i = 0; i < 100; i++) {
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
