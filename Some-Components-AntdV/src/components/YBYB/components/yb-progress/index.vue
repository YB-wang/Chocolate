<template>
    <div class="yb-progress" v-if="progress < 100" :style="{ 'width': width }">
        <a-result status="warning" title="文件上传中，请勿进行其他操作！">
            <template #extra>
                <div style="margin-bottom:15px">
                    <a-progress :percent="progress" status="active"/>
                </div>
                <a-button type="danger" @cancel="cancel">取消上传</a-button>
            </template>
        </a-result>
    </div>
    <div class="yb-progress" v-else :style="{ 'width': width }">
        <a-result status="success" title="上传成功！">
            <template #extra>
                <div style="margin-bottom:15px">
                    <a-progress :percent="progress" />
                </div>
                <a-button type="primary" @confirm="confirm">确定</a-button>
            </template>
        </a-result>
    </div>
</template>
<script>
export default {
    name: "yb-progress",
    props: {
        progress: {
            type: Number,
            default: () => {
                return 0
            }
        },
        width: {
            type: String,
            default: () => {
                return "100%"
            }
        }
    },
    computed: {

    },
    methods: {
        confirm() {
            this.$emit("confirm")
        },
        cancel() {
            this.$emit("cancel")
        }
    }
}
</script>
<style scoped>
</style>