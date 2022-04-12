<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" class="aside">
        <div class="asideItem" v-for="item in route" :key="item.path">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </div>
      </el-aside>
      <el-container>
        <el-main style="background:grey">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vue from "vue";
import { route } from "./router/route.config.js";
export default {
  provide() {
    return {
      officeUrl: "http://192.168.1.164:3000/sys/common/static", //上传地址
      callBackUrl: "http://192.168.1.164:3000/onlyfile/file/editCallBack", //编辑器回调地址
      theme: this.theme,
      changeColor: this.changeThemeColor,
    };
  },
  data() {
    return {
      route,
      name: "APP",
      theme: {
        color: "#e74c3c",
      },
    };
  },
  methods: {
    goEditor(id) {
      let routeUrl = this.$router.resolve({
        path: "/OnlyOffice/" + id,
      });
      window.open(routeUrl.href, "_blank");
    },
    changeThemeColor(color) {
      console.log(color);
      this.$set(this.theme, "color", color);
    },
  },
  computed: {},
  created() {
    Vue.ls.set("userInfo", {
      id: 9527,
      realname: "Wang",
    });
    Vue.ls.set("token", "9527");
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  .asideItem {
    width: 100%;
    padding: 20px 0;
    &:hover {
      background-color: #ecf0f1;
    }
  }
}
/deep/.el-main {
  height: calc(100vh - 30px);
  overflow: scoll;
  // &::-webkit-scrollbar {
  //   width: 0;
  //   height: 0;
  // }
}

/deep/.pc-designer,
/deep/.yb-FcDesigner {
  .el-form--label-top {
    .el-form-item {
      .el-form-item__label {
        width: 100%;
      }
    }
  }
}
/deep/.mobile-designer {
  .form-create {
    .el-form-item {
      width: 100%;
      display: flex !important;
      flex-direction: column !important;
      .el-form-item__label {
        width: 100% !important;
      }
      .el-form-item__content {
        width: 100% !important;
      }
    }
  }
}
</style>
