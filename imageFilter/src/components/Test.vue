<template>
  <div>
    <span>{{ value }}</span> <input v-model="value" />
  </div>
  <div>
    <span>{{ title }}</span> <input v-model="title" />
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps(["value", "title"]);
const emit = defineEmits(["update:value", "update:title"]);
const value = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit("update:value", val);
  },
});

const title = computed({
  get() {
    return props.title;
  },
  set(val) {
    emit("update:title", val);
  },
});
</script>
