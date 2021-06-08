<template>
  <div id="app">
    <!-- 不销毁 -->
    <keep-alive exclude="Detail">
      <!-- 路由展示 -->
      <router-view></router-view>
    </keep-alive>
    <!-- 切换tab栏 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar,
  },
}
</script>

<style>
@import './assets/css/base.css';
</style>
