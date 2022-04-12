<template>
    <div>
        <div class="container">
            <Tree
                v-for="index in 3"
                :key="index"
                :ref="`tree${index}`"
                :permissions="permissions[index - 1]"
            />
        </div>
        <a-row>
            <a-button @click="submit">submit</a-button>
        </a-row>
    </div>
</template>
<script>
import Tree from "@/components/Tree.vue"
export default {
    components: {
        Tree
    },
    data() {
        return {
            permissions: [
                ['0-0', '0-0-0', '0-0-0-0', '0-0-0-1', '0-0-0-2'],
                ['0-0', '0-1', '0-1-0-0'],
                ['0-0', '0-0-1', '0-0-1-1']
            ]
        }
    },
    methods: {
        submit() {
            let arr = []
            Object.keys(this.$refs).forEach((item) => {
                if (this.$refs[item][0].getAllKeys()) {
                    console.log(this.$refs[item][0].getAllKeys());
                    arr = arr.concat(this.$refs[item][0].getAllKeys())
                }
            })
            arr = [...new Set(arr)];
            console.log(arr);
        }
    },
    beforeCreate() {
        console.log("父组件：beforeCreate");
    },
    created() {
        console.log("父组件：created");
    },
    beforeMount() {
        console.log("父组件：beforeMount");
    },
    mounted() {
        console.log("父组件：mounted");
    }
}
</script>
<style>
.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
}
</style>