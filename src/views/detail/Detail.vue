<!-------- template -------->
<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3">
      <!-- 详情轮播图 -->
      <detail-swiper
        v-if="topImages != ''"
        :top-images="topImages"
      ></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <!-- {{ topImages }} -->
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

import { getDetail, Goods, Shop, GoodsParam } from 'network/detail.js'
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
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
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
    })
  },
  methods: {
    imageLoad() {
      // 图片加载完后刷新scroll
      // console.log('调用了哦');
      this.$refs.scroll.refresh()
    },
  },
}
</script>
<!--------- style --------->
<style scoped>
#detail {
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
.content {
  height: calc(100vh - 44px - 55px);
}
</style>
