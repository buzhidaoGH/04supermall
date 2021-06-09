import Vue from 'vue'
import Vuex from 'vuex'

// 导入mutations
import mutations from './mutations'
// 导入actions
import actions from './actions'
// 导入getters
import getters from './getters'

//1.安装Vuex插件
Vue.use(Vuex)

const state = {
  cartList: [],
}
//2.创建Store对象
const store = new Vuex.Store({
  state,
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法尽可能只操作一件事情
  mutations,
  actions,
  getters,
})

//3.挂载到Vue实例上(导出)
export default store
