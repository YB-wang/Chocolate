<template>
    <transition name="yb-message-fade" @after-leave="onDestroy" @before-leave="onClose(id)">
        <div class="yb-message" :style="coustomStyle" v-show="visible">{{ message }}</div>
    </transition>
</template>
<script>
export default {
    props: {
        id: {
            type: String
        },
        type: {
            type: String
        },
        message: {
            type: String
        },
        offset: {
            type: Number
        },
        onDestroy: {
            type: Function
        },
        onClose: {
            type: Function
        },
        delay: {
            type: Number,
            default: () => {
                return 1500
            }
        }
    },
    data() {
        return {
            visible: true,
            timer: null
        }
    },
    computed: {
        coustomStyle() {
            return {
                top: `${this.offset}px`
            }
        }
    },
    methods: {

    },
    beforeDestroy(){
        console.log("销毁");
    },
    mounted() {
        this.timer = setTimeout(() => {
            this.visible = false;
            clearTimeout(this.timer)
        }, this.delay)
    }
}
</script>

