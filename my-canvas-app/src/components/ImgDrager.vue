<template>
    <div
        class="container-layer"
        :style="{
            'position': 'absolute',
            'z-index': '9999',
            'left': '0px',
            'top': '0px',
            'transform-origin': 'center center',
            'transform': 'rotate(' + this.rotate + 'deg)'
        }"
        ref="container"
        v-drag
    >
        <div class="operation-layer">
            <img
                :src="url"
                ref="img"
                :style="{
                    'width': `${this.imgW}px`,
                    'height': `${this.imgH}px`,
                    'transform-origin': 'center center',
                    'transform': 'scale(' + this.scale + ')'
                }"
                @load="imgLoaded"
            />
            <span class="p p1" ref="p1"></span>
            <span class="p p2" ref="p2"></span>
        </div>
    </div>
</template>

<script>


export default {
    props: {
        url: {
            type: String,
            default: () => {
                return "/src/assets/logo.png"
            }
        },
        el: {
            type: Object
        },
        map: {
            type: Object
        },
        'c-scale': {
            type: Number
        },
        'c-rotate': {
            type: Number
        },
        'c-left': {
            type: Number
        },
        'c-top': {
            type: Number
        }
    },
    directives: {
        drag: {
            mounted(el) {
                console.log('v-drag', el)
                const oDiv = el
                oDiv.addEventListener('mousedown', (e) => {
                    e.preventDefault()
                    oDiv.canDarg = true
                    oDiv.disX = e.clientX - oDiv.offsetLeft
                    oDiv.disY = e.clientY - oDiv.offsetTop
                })
                document.addEventListener('mousemove', (e) => {
                    e.preventDefault()
                    if (oDiv.canDarg) {
                        const l = e.clientX - oDiv.disX
                        const t = e.clientY - oDiv.disY
                        el.style.left = l + 'px'
                        el.style.top = t + 'px'
                    }
                })
                document.addEventListener('mouseup', (e) => {
                    e.preventDefault()
                    oDiv.canDarg = false
                })
            }
        }
    },
    data() {
        return {
            scale: 1,
            rotate: 0,
            isElLoaded: false,
            isMapLoaded: false,
            imgW: 0,
            imgH: 0,
            center: [0, 0],
            canDarg: false
        }
    },
    methods: {
        //获取p1  p2 相对于el的坐标
        getPoint(el) {
            let { left, top } = el.getBoundingClientRect()
            let { left: left2, top: top2 } = el.parentNode.getBoundingClientRect()
            return {
                x: left - left2,
                y: top - top2
            }
        },
        imgLoaded() {
            this.imgW = this.$refs.img.naturalWidth
            this.imgH = this.$refs.img.naturalHeight
            this.center = [this.imgW / 2, this.imgH / 2]
            console.log('img loaded')
        },
        init() {
            this['c-scale'] ? this.scale = this['c-scale'] : ""
            this['c-rotate'] ? this.rotate = this['c-rotate'] : ""
            this['c-left'] ? this.left = this['c-left'] : ""
            this['c-top'] ? this.top = this['c-top'] : ""
        },
        getImgUrl(img) {
            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            const url = canvas.toDataURL()
            return url
        },
        addLayer() {
            const p1 = this.getPoint(this.$refs.p1)
            const p2 = this.getPoint(this.$refs.p2)
            const pixel1 = new AMap.Pixel(p1.x, p1.y);
            const pixel2 = new AMap.Pixel(p2.x, p2.y);
            const lnglat1 = this.map.containerToLngLat(pixel1)
            const lnglat2 = this.map.containerToLngLat(pixel2)
            const bounds = new AMap.Bounds(lnglat1, lnglat2)
            console.log(pixel1, pixel2)
            const option = {
                bounds,
                url: this.getImgUrl(this.$refs.img), // 图片 Url
                zIndex: 999,
                zooms: [1, 20] // 设置可见级别，[最小级别，最大级别]
            }
            console.log(option)
            const imageLayer = new AMap.ImageLayer(option);
            this.map.add(imageLayer);
            this.$refs.img.style.display = 'none'
        }
    },
    watch: {
        el(val) {
            this.isElLoaded = true
            console.log('el:', val)
            if (this.isElLoaded && this.isMapLoaded) {
                this.init()
            }
        },
        map(val) {
            this.isMapLoaded = true
            console.log('map:', val)
            if (this.isElLoaded && this.isMapLoaded) {
                this.init()
            }
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.removeEvent()
    },
}
</script>

<style lang='scss'>
.container-layer {
    box-sizing: border-box;
    .operation-layer {
        box-sizing: border-box;
        position: relative;
        .p {
            box-sizing: border-box;
            width: 0;
            height: 0;
        }
        .p1 {
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 100%;
        }
        .p2 {
            box-sizing: border-box;
            position: absolute;
            left: 100%;
            top: 0;
        }
    }
}
</style>