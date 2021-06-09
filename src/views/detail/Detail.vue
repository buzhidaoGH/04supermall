<!-------- template -------->
<template>
  <div class="detail">
    <!-- 导航栏 -->
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <!-- 详情栏 -->
    <scroll
      class="contentscroll"
      ref="scroll"
      :probe-type="3"
      @scroll="contenScroll"
    >
      <!-- 详情轮播图 -->
      <detail-swiper
        v-if="topImages != ''"
        :top-images="topImages"
      ></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品信息图片(bug解决了,style的问题) -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <!-- 商品信息段 -->
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <!-- 评论消息部分 -->
      <detail-comment-info
        ref="comments"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <!-- 商品推荐栏 -->
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <!-- 底部栏 -->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- 返回 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<!--------- script --------->
<script>
import DetailNavBar from './childrenComps/DetailNavBar'
import DetailSwiper from './childrenComps/DetailSwiper'
import DetailBaseInfo from './childrenComps/DetailBaseInfo'
import DetailShopInfo from './childrenComps/DetailShopInfo'
import DetailGoodsInfo from './childrenComps/DetailGoodsInfo'
import DetailParamInfo from './childrenComps/DetailParamInfo'
import DetailCommentInfo from './childrenComps/DetailCommentInfo'
import DetailBottomBar from './childrenComps/DetailBottomBar'

import { itemListenerMixin, backTomMixin } from 'common/mixin.js'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from 'network/detail.js'
import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/GoodsList'
import { debounce } from 'common/utils.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin, backTomMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      // itemImgListener: null,
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    // console.log(this.iid, '详情页')
    //2.根据iid请求详情页数据
    getDetail(this.iid).then((res) => {
      const data = res.result
      // console.log(res)
      //1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
      // console.log(this.topImages)
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services,
      )
      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo)

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo
      // console.log(this.detailInfo);

      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule,
      )
      //6.取出评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }

      //7也可以运用防抖来进行方法封装,最后在图片的地方调用

      //7在所有数据都渲染后,执行一次(dom渲染完成,但是图片并没有加载完成)
      // this.$nextTick(() => {
      //   //dom被渲染完了,图片并没有加载完
      //   //还有获取push的offsetTop
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })
    })
    //3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  methods: {
    //监听加入购物车
    addToCart() {
      // console.log('加入购物车');
      //1.获取购物车需要展示的信息,然后展示
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //2.将商品添加到购物车内
      // console.log(product);
      //this.$store.cartList.push(product)//不要这么做,建议mutations
      //通过commit操作mutations中函数
      // this.$store.commit('addCart',product)
      //通过Dispatcher分发给actions
      this.$store.dispatch('addCart',product)
    },
    //持续监听当前的x,y数据
    contenScroll(position) {
      // console.log(position);
      //1.获取Y值
      const positoinY = -position.y
      // console.log(positoinY)
      // console.log(this.themeTopYs)
      //2.再用positoinY和主题中的值进行对比
      if (positoinY < this.themeTopYs[1]) {
        // console.log(0)
        this.$refs.nav.currentIndex = 0
      }
      if (positoinY >= this.themeTopYs[1] && positoinY < this.themeTopYs[2]) {
        // console.log(1)
        this.$refs.nav.currentIndex = 1
      }
      if (positoinY >= this.themeTopYs[2] && positoinY < this.themeTopYs[3]) {
        // console.log(2)
        this.$refs.nav.currentIndex = 2
      }
      if (positoinY >= this.themeTopYs[3]) {
        // console.log(3)
        this.$refs.nav.currentIndex = 3
      }
      // for (const i in this.themeTopYs) {
      //   if (positoinY>this.themeTopYs[i]) {
      //   }
      // }
      this.contenBackScroll(position)
    },
    imageLoad() {
      // 图片加载完后刷新scroll
      console.log('调用了refresh哦')
      // setTimeout(() => {
      // console.log(this.$refs.scroll.refresh());
      // console.log(this.$refs.scroll);
      this.$refs.scroll.refresh()
      // }, 1000);
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs)
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
  },
  mounted() {
    //除了mixin混合
  },
  destroyed() {
    // console.log('嗯哼?');
    this.$bus.$off('itemImgLoad', this.itemImgLister)
  },
  updated() {
    // this.themeTopYs = []
    // //还有获取push的offsetTop
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)
  },
}
</script>
<!--------- style --------->
<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.contentscroll {
  height: calc(100vh - 44px - 55px);
}
</style>
