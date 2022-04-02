<template >
    <div class="flower">
        <canvas id="flower"></canvas>
    </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { Circle } from '/src/utils/circle.js'

onMounted(() => {
    const canvas = document.getElementById("flower");
    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    window.addEventListener("resize", () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    });
    let collection = []
    let startTime = Date.now()
    const tempCanvas = document.createElement('canvas'); // 新建一个 canvas 做为缓存 canvas
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    function tick() {
        ctx.save()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.restore()
        let currentTime = Date.now()
        if ((currentTime - startTime) > 100) {
            collection.push(new Circle(ctx, canvas))
            startTime = Date.now()
        }
        if (collection.length > 20) {
            collection.shift()
        }
        collection.forEach((circle, index) => {
            if (circle.angle >= 720) {

                collection.splice(index, 1)
                return
            }
            circle.draw()
        })

        requestAnimationFrame(tick)
    }
    tick()
})
onBeforeUnmount(() => {
    const canvas = document.getElementById("flower");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);


});
</script>
<style lang="scss">
.flower {
    width: 100%;
    height: 100vh;
}
</style>