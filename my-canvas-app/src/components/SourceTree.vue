<template>
    <canvas ref="canvas" :style="{ 'border': 'solid 1px grey' }"></canvas>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import SourceTree from "/src/utils/SourceTree.js"
const canvas = ref(null)
const ctx = ref(null)


const resizeHandler = () => {
    canvas.value.width = document.documentElement.clientWidth;
    canvas.canvas.height = document.documentElement.clientHeight;
}


onMounted(() => {
    ctx.value = canvas.value.getContext('2d')
    canvas.value.width = document.documentElement.clientWidth;
    canvas.value.height = document.documentElement.clientHeight;
    window.addEventListener('resize', resizeHandler)
    new SourceTree(ctx.value, canvas.value)
})
onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
}) 
</script>