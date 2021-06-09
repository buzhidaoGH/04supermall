import Vue from 'vue'
//导入根路径
import App from './App.vue'
//导入路由插件
import router from './router'
//导入Vuex插件
import store from './store/index'

Vue.config.productionTip = false
//创建一个$bus总线(在原型中添加,用来全局监听与发射)
Vue.prototype.$bus = new Vue()
//vue3.x可以用这个
// Vue.config.globalProperties.$bus = new Vue()
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
