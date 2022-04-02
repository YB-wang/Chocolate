<template >
    <div class="virtualList" @scroll="scrollHandler">
        <div class="container" :style="{ height: `${props.list.length * 65 + 20}px` }">
            <div
                class="v-li"
                v-for="(li, index) in data"
                :key="li.id"
                :style="{ top: `${top + index * 65}px` }"
            >{{ li.value }}</div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, ref, computed, onMounted } from 'vue';

const props = defineProps({
    list: {
        type: Array,
        default: () => {
            const arr = []
            for (let i = 0; i < 10000; i++) {
                arr.push({
                    id: i,
                    value: i
                })
            }
            return arr
        }
    }
})

const top = ref(0)
const data = computed(() => {
    let start = Math.floor((top.value - 10) / 65);
    if (start < 0) start = 0
    return props.list.slice(start, start + 10)
})
const scrollHandler = (e) => {
    top.value = e.target.scrollTop;
    if ((e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight) {
        console.log('滚动到底')
    }
}
</script>
<style lang="scss">
.virtualList {
    position: relative;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 670px;
    max-height: 100vh;
    overflow-y: auto;
    .container {
        display: flex;
        width: 100%;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        .v-li {
            position: absolute;
            left: 10px;
            width: calc(100% - 20px);
            min-height: 45px;
            box-sizing: border-box;
            border: solid 1px grey;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
