import { debounce } from './utils'
import BackTop from 'components/content/BackTop'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 400)
    this.itemImgListener = () => {
      // console.log('图片加载完成刷新');
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log('我是混入的图片加载完成');
  },
}

export const backTomMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000
    },
  },
}
