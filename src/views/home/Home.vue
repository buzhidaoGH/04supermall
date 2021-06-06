<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 潮流 -->
    <feature-view></feature-view>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { getHomeMultidata } from "network/home.js";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from './childComps/FeatureView';
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    //1.请求多个数据(网络请求)
    getHomeMultidata().then((res) => {
      console.log("Home_res:", res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
#home{
  padding-top: 44px;
  padding-bottom: 49px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top:0;
  z-index: 9;
}
</style>