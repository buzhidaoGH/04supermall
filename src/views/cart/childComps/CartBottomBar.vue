<!-------- template -------->
<template>
  <div class="CartBottomBar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
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
    isSelectAll() {
      //return !this.cartList.filter((item) => !item.checked).length
      return (
        !!this.cartList.length && !this.cartList.find((item) => !item.checked)
      )
    },
  },
  methods: {
    //全选按钮点击事件
    checkClick() {
      // console.log('-----全选点击')
      //1.全部选中的状态
      // if (this.isSelectAll) {//全部选中状态
      //   this.cartList.forEach((element) => (element.checked = false))
      // }else{//部分或者全部未选中
      //    this.cartList.forEach((element) => (element.checked = true))
      // }
      //2.全部未选中状态
      // if (!this.isSelectAll && this.cartList.length != 0) {
      //   this.cartList.forEach((element) => (element.checked = true))
      // }else{
      //   this.cartList.forEach((element) => (element.checked = false))
      // }
      //3.第三种方法
      const tTof = !this.isSelectAll
      this.cartList.forEach((element) => (element.checked = tTof))
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
