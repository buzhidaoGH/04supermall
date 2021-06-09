<!-------- template -------->
<template>
  <div class="CartList">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>
<!--------- script --------->
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList']),
  },
  activated() {
    //需要重新计算可滚动区域
    this.$refs.scroll.refresh()
  },
}
</script>
<!--------- style --------->
<style scoped>
.CartList {
  height: calc(100vh - 93px - 40px);
  /* background-color: aqua; */
}
.content {
  /* width: 100%; */
  height: 100%;
  overflow: hidden;
}
/* .CartList {
  background-color: aqua;
  height: 100%;
}
.content {
  height: calc(100% - 44px -49px);
} */
</style>
