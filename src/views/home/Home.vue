<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 吸顶效果 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      ref="tabControl1"
      @tabClick="tabClick"
      v-show="isTabFixed"
    ></tab-control>
    <!-- @pullingUp="loadMore" -->
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行/潮流 -->
      <feature-view></feature-view>
      <!-- 吸顶效果 -->
      <!-- :class="{ fixed: isTabFixed }" -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
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
// import { debounce } from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin.js';

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
  mixins:[itemListenerMixin],
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImgListener: null,
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
  mounted() {
    //创建防抖动函数包装(图片加载监听)
    // const refresh = debounce(this.$refs.scroll.refresh, 400)
    // //3.监听item中每一个图片加载完成
    // //对监听的事件进行保存
    // this.itemImgListener = () => {
    //   // console.log('监听成功')
    //   //加载一次图片就刷新一下scroll
    //   //this.$refs.scroll && this.$refs.scroll.refresh()
    //   //防抖函数处理后的使用
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
  activated() {
    //活跃调用一次
    // console.log('活跃')
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //不活跃调用一次
    console.log('首页不活跃')//保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    //2.取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    /* 事件监听相关方法 */
    //防抖函数处理
    debounce(func, delay) {
      let timer = null
      return function (...args) {
        // console.log('次数')
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    //点击商品切换栏
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      // console.log('组件点击')
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
    contentScroll(position) {
      //1.scroll的x,y值(判断BackTop是否显示)
      //console.log(position);
      if (position.y < -1000) {
        this.isShowTop = true
      } else {
        this.isShowTop = false
      }
      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    //swiper图片轮播图加载
    swiperImageLoad() {
      //2.获取tabContorl的offsetTop
      //(所有的组件都有一个属性$el:用于获取组件对象中的元素)
      //图片加载后再获取正确的值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
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
        //存储goods的pop流行,new新款,sell精选数据
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //打印
        // console.log(type, res.data.list)
        //上拉刷新监听的重置(scroll被封装)
        this.$refs.scroll.finishPullUp()
        //刷新异步后的容器高度(初始化)
        // this.$refs.scroll.refresh()
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
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  /* overflow: hidden; */
}
.home-nav {
  background-color: var(--color-tint);
  /* color: #fff; */
  /* 
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* .tab-control {
  //无效了
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
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
