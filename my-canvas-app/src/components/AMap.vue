<template>
    <div>
        <div class="map-container" ref="mapContainer">
            <div id="a-map"></div>
            <ImgDrager :map="map" :el="el" ref="img" />
        </div>
        <el-button @click="add">add</el-button>
    </div>
</template>

<script>
import ImgDrager from "./ImgDrager.vue";
export default {
    components: {
        ImgDrager
    },
    data() {
        return {
            map: null,
            el: null
        }
    },
    methods: {
        add() {
            this.$refs.img.addLayer()
        }
    },
    mounted() {
        const map = new AMap.Map('a-map', {
            center: [117.000923, 36.675807],
            zoom: 11
        });
        this.map = Object.freeze(map);
        this.el = this.$refs.mapContainer
    },
}
</script>

<style lang='scss'>
.map-container {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: calc(100vh - 100px);
    #a-map {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
}
</style>