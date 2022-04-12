<template>
  <a-layout id="app">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-sub-menu v-for="item in routes" :key="item.name">
          <span slot="title">
            <a-icon type="mail" />
            <span>{{ item.name }}</span>
          </span>
          <a-menu-item
            v-for="ru in item.children"
            :key="ru.name"
            @click="goTo(ru.path)"
          >
            {{ ru.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <router-view
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        ></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import routes from "@/router/route.js";
export default {
  data() {
    return {
      collapsed: false,
      routes,
    };
  },
  methods: {
    goTo(v) {
      if (this.$route.path !== v) {
        this.$router.push({ path: v });
      }
    },
  },
  watch: {
    
  },
  mounted() {
    console.log(routes);
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: auto;
}
</style>
