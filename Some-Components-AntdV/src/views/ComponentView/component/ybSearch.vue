<template>
  <div class="search">
    <yb-search
      :rule="rule"
      @handleSearch="search"
      @reset="reset"
      :layout="'fixed'"
      :labelStyle="{ width: '120px' }"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      rule: [
        {
          tag: "a-input",
          label: "名称",
          $bind: {
            placeholder: "xxx"
          },
          model: "name"
        },
        {
          tag: "a-select",
          label: "性别",
          $bind: {
            placeholder: "xxx",
            options: [
              {
                label: "全部",
                value: "",
              },
              {
                label: "男",
                value: "男",
              },
              {
                label: "女",
                value: "女",
              },
            ]
          },
          model: "sex"
        },
        {
          tag: "a-tree-select",
          label: "树",
          $bind: {
            placeholder: "请选择类别",
            "tree-data": [
              {
                title: "类别1",
                value: "value 1",
                key: "key 1",
                children: [
                  {
                    title: "类别1-1",
                    value: "value 1-1",
                    key: "key 1-1",
                  },
                  {
                    title: "类别1-2",
                    value: "value 1-2",
                    key: "key 1-2",
                  },
                ],
              },
              {
                title: "类别2",
                value: "value 2",
                key: "key 2",
              },
            ]
          },
          model: "tree"
        }, 
        {
          tag: "a-date-picker",
          label: "日期",
          $bind: {
            placeholder: "请选择日期",
            "show-time": true
          },
          model: "date"
        },
        {
          tag:"a-range-picker",
          label:"起止时间",
          $bind:{

          },
          model:"range"
        }

      ],
      searchParams: {

      }
    };
  },
  methods: {
    search(val) {
      const values = this.$deepClone(val);
      // Object.keys(values).forEach(v => {
      //   if (values[v]._isAMomentObject) {
      //     values[v] = this.$dealtime(values[v]._d, true)
      //   }
      // });
      this.searchParams = values;
      console.log(this.searchParams);
    },
    reset() {
      this.searchParams = {};
      console.log(this.searchParams);
    }
  },
};

</script>
<style scoped>
.search {
  background-color: #f0f2f5;
  width: 100%;
  height: 100vh;
  padding: 10px;
}
</style>
