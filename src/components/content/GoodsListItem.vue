<template>
  <div class="goods-item" @click="itemClick">
    <!-- :width="goodsItem.show.w" -->
    <!-- :height="goodsItem.show.h" -->
    <img v-lazy="showImage" @load="imgageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    showImage() {
      // console.log(this.goodsItem);
      return this.goodsItem.image || this.goodsItem.show.img
    },
  },
  methods: {
    //原生js监听图片(img.onload=function(){})
    //Vue中监听图片(@load="方法名")
    imgageLoad() {
      // console.log('imageLoad+1')
      // 事件总线发送事件
      // console.log('发送成功');
      this.$bus.$emit('itemImgLoad')
      // if (this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('itemImageLoad')
      // }
      // if (双向事件各自监听) {
        
      // }
    },
    //跳转到详情页
    itemClick() {
      // console.log('跳转详情页')
      this.$router.push('/detail/' + this.goodsItem.iid)

      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //   }
      // })
    },
  },
}
</script>

<style>
.goods-item {
  width: 50%;
  padding: 0px 5px 40px 5px;
  position: relative;
}
.goods-item img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>
