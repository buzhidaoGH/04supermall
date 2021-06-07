<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
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
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowTop"></back-top>
  </div>
</template>

<script>
//components公共模块
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/TabControl'
import GoodsList from 'components/content/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/BackTop'

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
    Scroll,
    BackTop,
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
      currentType: 'pop',
      isShowTop: false,
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
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      // console.log('组件点击')
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
    contentScroll(position) {
      //scroll的x,y值
      //console.log(position);
      if (position.y < -1000) {
        this.isShowTop = true
      } else {
        this.isShowTop = false
      }
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
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
        // console.log(type, res.data.list)
        //上拉刷新监听的重置
        this.$refs.scroll.finishPullUp()
        //刷新异步后的容器高度(初始化)
        this.$refs.scroll.refresh()
      })
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
  /* overflow: hidden; */
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
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
