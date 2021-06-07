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
    <!-- 本周流行/潮流 -->
    <feature-view></feature-view>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
    ></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>
  </div>
</template>

<script>
//components公共模块
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/TabControl'
import GoodsList from 'components/content/GoodsList'

//子组件模块
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

//插件模块(方法)
import { getHomeMultidata, getHomeGoods } from 'network/home.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    }
  },
  created() {
    //1.请求多个数据(网络请求)
    this.getHomeMultidata()
    //2.请求list的data数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /* 事件监听相关方法 */
    tabClick(){

    },

    /* 网络请求相关方法 */
    //1.请求home的tabbar数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //打印Home的tabbar数据
        //console.log('Home_res:', res)
        //存储banners 轮播图数据
        this.banners = res.data.banner.list
        //存储recommends 推荐数据
        this.recommends = res.data.recommend.list
      })
    },
    //2.请求list的data数据(按照type存入数据,取出数据)
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        //存储goods的pop流行数据
        //存储goods的new新款数据
        //存储goods的sell精选数据
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //打印
        //console.log(type, res)
      })
    },
  },
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
