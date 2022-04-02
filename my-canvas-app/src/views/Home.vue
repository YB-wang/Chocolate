<template >
    <div class="Home">
        <component :is="typeComponentMap[cName]"></component>
    </div>
</template>
<script setup>
import flower from '/src/components/flower.vue'
import VirtualList from '/src/components/VirtualList.vue'
import Signature from '/src/components/Signature.vue'
import SourceTree from '/src/components/SourceTree.vue'
import AMap from '/src/components/AMap.vue'
import { ref } from 'vue';
const typeComponentMap = {
    1: flower,
    2: VirtualList,
    3: Signature,
    4: SourceTree,
    5: AMap
}
let cName = ref('5')
</script>
<style lang="scss">
.Home {
    width: 100%;
    height: 100vh;
}
</style>