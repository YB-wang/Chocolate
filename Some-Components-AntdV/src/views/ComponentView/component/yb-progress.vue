<template>
    <yb-progress :progress="percent" @loadend="loadend" :width="'50%'"></yb-progress>
</template>
<script>
export default {
    data() {
        return {
            percent: 0
        }
    },
    methods: {
        loadend(){
            this.$message.success('加载完毕')
        }
    },
    mounted() {
        setInterval(() => {
            if (this.percent < 100) {
                this.percent += 1
            }
        }, 50);
    }
}
</script>