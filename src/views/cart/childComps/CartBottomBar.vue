<!-------- template -------->
<template>
  <div class="CartBottomBar">
    <div class="check-content">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>
<!--------- script --------->
<script>
import CheckButton from 'components/content/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        '¥' +
        this.cartList
          .filter((item) => {
            return item.checked
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.checked
      }).length
    },
  },
}
</script>
<!--------- style --------->
<style scoped>
.CartBottomBar {
  background-color: #eee;
  height: 40px;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60;
}
.price {
  margin-left: 20px;
}
.calculate {
  margin-left: auto;
  width: 90px;
  text-align: center;
  color: #eee;
  background-color: red;
}
</style>
