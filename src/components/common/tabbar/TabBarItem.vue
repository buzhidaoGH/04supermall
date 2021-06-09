<template>
  <!-- 所有item展示同一种图片,同一种样式 -->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    <!-- <img slot="item-icon" src="./assets/img/tabbar/home.svg" alt=""> -->
    <!-- <div slot="item-text">首页</div> -->
  </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      detault: 'red',
    },
  },
  data() {
    return {
      // isActive: true,
      //path: '/home'
    }
  },
  methods: {
    itemClick() {
      console.log(this.path)
      //不可回退的路由
      this.$router.replace(this.path).catch((err) => {})
    },
  },
  computed: {
    isActive() {
      return !this.$route.path.indexOf(this.path)
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    },
  },
}
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>
