<template>
  <teleport to="body">
    <div class="wraper">
      <div class="layer top" :mode="mode"></div>
      <div class="layer bottom" :mode="mode"></div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue";
const mode = ref("show");
</script>
<style scoped>
.wraper {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
}
.layer {
  position: absolute;
  width: 100%;
  height: 100vh;
  pointer-events: none;
}
.top[mode="show"] {
  z-index: 9999;
}
.top[mode="hide"] {
  z-index: 9998;
}
.bottom[mode="show"] {
  z-index: 9999;
}
.bottom[mode="hide"] {
  z-index: 9998;
}
</style>
