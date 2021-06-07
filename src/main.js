import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false
//创建一个$bus总线(在原型中添加,用来全局监听与发射)
Vue.prototype.$bus = new Vue()
//vue3.x可以用这个
// Vue.config.globalProperties.$bus = new Vue()
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
