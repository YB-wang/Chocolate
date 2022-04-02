<template>
    <div class="sign" :style="{ width: `${props.wdith}px` }">
        <canvas ref="canvas" :style="{ 'border': 'solid 1px grey' }"></canvas>
        <div class="op">
            <el-button type="primary" @click="getSign($event)">保存签名</el-button>
            <el-button @click="clearCanvas">重置</el-button>
        </div>
    </div>
</template>

<script setup>

import { onMounted, defineProps, ref, reactive, onBeforeUnmount } from 'vue';
import screenCapture from '/src/utils/screenCapture.js'
const props = defineProps({
    width: {
        type: Number,
        default: () => 700
    },
    height: {
        type: Number,
        default: () => 350
    }
})
let canvas = ref(null)
let ctx = ref(null)
let aleadyDraw = ref(false)
const canvaHandler = reactive({
    mousedown: (e) => {
        const { x, y } = canvas.value.getBoundingClientRect()
        canvas.value.canStorke = true
        ctx.value.beginPath()
        ctx.value.lineWidth = "5";
        ctx.value.strokeStyle = "black";
        ctx.value.moveTo(e.x - x, e.y - y);
    },
    mouseup: (e) => {
        ctx.value.closePath()
        canvas.value.canStorke = false
    },
    mousemove: (e) => {
        if (canvas.value?.canStorke) {
            if (!aleadyDraw.value) aleadyDraw.value = true;
            const { x, y } = canvas.value.getBoundingClientRect()
            ctx.value.lineTo(e.x - x, e.y - y);
            ctx.value.stroke()
        }
    },
    mouseleave: (e) => {
        ctx.value.closePath()
        canvas.value.canStorke = false

    }
})
const getSign = (e) => {

    if (!aleadyDraw.value) {
        alert('请先签名')
        return
    }
    //截图效果
    screenCapture(e,canvas.value,ctx.value)
    // const url = canvas.value.toDataURL();
    // const a = document.createElement("a");
    // a.download = "Signature";
    // a.href = url;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
}
const clearCanvas = () => {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    aleadyDraw.value = false
}
onMounted(() => {
    canvas.value.width = props.width;
    canvas.value.height = props.height;
    ctx.value = canvas.value.getContext('2d')
    canvas.value.addEventListener('mousedown', canvaHandler.mousedown)
    canvas.value.addEventListener('mouseup', canvaHandler.mouseup)
    canvas.value.addEventListener('mousemove', canvaHandler.mousemove)
    canvas.value.addEventListener('mouseleave', canvaHandler.mouseleave)
})
onBeforeUnmount(() => {
    canvas.value.removeEventListener('mousedown', canvaHandler.mousedown)
    canvas.value.removeEventListener('mouseup', canvaHandler.mouseup)
    canvas.value.removeEventListener('mousemove', canvaHandler.mousemove)
    canvas.value.removeEventListener('mouseleave', canvaHandler.mouseleave)
})
</script>

<style lang="scss">
.sign {
    display: inline-flex;
    flex-direction: column;
    .op {
        display: inline-flex;
        height: 75px;
        border: solid 1px grey;
        border-top: none;
        justify-content: center;
        align-items: center;
    }
}
</style>