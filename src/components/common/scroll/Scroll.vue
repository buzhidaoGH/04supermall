<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    //ref如果绑定在组件中,那么this.$refs.refname获取的是一个对象(唯一性)
    //ref如果绑定在普通元素中,那么this.$refs.refname获取的是一个元素对象(唯一性)
    //1.新建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //点击事件
      click: true,
      //probeType支持监听scroll的x,y变动
      probeType: this.probeType,
      //上拉加载
      pullUpLoad: this.pullUpLoad,
      //鼠标滚轮
      mouseWheel: this.pullUpLoad,
      /* mouseWheel: true, */
      // observeDOM: true,
      // observeImage: true,
    })
    //打印一下this.scroll
    // console.log(this.scroll);
    //2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      //console.log(position)
      //将监听事件暴露给父组件
      this.$emit('scroll', position)
    })
    //3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        //将上拉加载的事件暴露给父组件
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    //封装一个滑轮指定位置方法
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    //封装一个上拉加载的重置事件
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      //刷新异步后的容器高度(初始化)
      // console.log('-----');
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    },
  },
}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
