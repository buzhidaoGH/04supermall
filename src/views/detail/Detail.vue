<!-------- template -------->
<template>
  <div class="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="contentscroll" ref="scroll">
      <!-- 详情轮播图 -->
      <detail-swiper
        v-if="topImages != ''"
        :top-images="topImages"
      ></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info> -->
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
    </scroll>
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

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from 'network/detail.js'
import Scroll from 'components/common/scroll/Scroll.vue'

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
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
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
    })

    //3.请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
    })
  },
  methods: {
    imageLoad() {
      // 图片加载完后刷新scroll
      console.log('调用了哦')
      // setTimeout(() => {
      // console.log(this.$refs.scroll.refresh());
      // console.log(this.$refs.scroll);
      this.$refs.scroll.refresh()
      // }, 1000);
    },
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
