<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { getHomeMultidata } from "network/home.js";
export default {
  name: "Home",
  components: {
    NavBar,
  },
  data() {
    return {
      banner: [],
      recommend: [],
    };
  },
  created() {
    //1.请求多个数据(网络请求)
    getHomeMultidata().then((res) => {
      console.log("Home_res:", res);
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend;
    });
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>