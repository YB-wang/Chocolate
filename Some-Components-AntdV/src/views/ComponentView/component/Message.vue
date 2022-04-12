<template>
    <a-row>
        <a-button @click="$msg.error('没有权限')">Tips</a-button>
    </a-row>
</template>
<script>
export default {
    props:["type"],
    data(){
        return {

        }
    },
    methods:{

    },
    mounted(){
        console.log(this.type);
    }
}
</script>