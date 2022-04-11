<template>
  <div>
    <div>{{ value }}</div>
    <Com v-model="value" ref="com" multiple placeholder="请选择" collapse-tags></Com>
  </div>
</template>

<script>
import useSelect from "./useSelect"
const Com = useSelect()
export default {
  components: {
    Com
  },
  data() {

    return {
      value: [],

    }

  },
  mounted() {
    this.$refs.com.loadData()
  },
}
</script>

<style lang=''>

</style>