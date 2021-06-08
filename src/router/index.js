import Vue from 'vue'
import VueRouter from 'vue-router'

//1.安装插件
Vue.use(VueRouter)

//配置对应的映射关系,然后加到router中
//(里面可以懒加载/也可以放外面)
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/category',
    component: () => import('../views/category/Category.vue'),
  },
  {
    path: '/cart',
    component: () => import('../views/cart/Cart.vue'),
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile.vue'),
  },
  {
    path: '/detail/:iid',
    component: () => import('../views/detail/Detail.vue'),
  },
]
//2.创建router
const router = new VueRouter({
  routes,
  mode: 'history',
})

//抛出接口
export default router
