//导入mutations-types
import { ADD_TO_CART, ADD_COUNTER } from './mutations-types'

export default {
  addCart(context, payload) {
    //新添加的商品,判断是否存在
    // let oldProduct = null
    // for (const item of context.state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    return new Promise((resolve,reject)=>{
      let oldProduct = context.state.cartList.find(
        (item) => item.iid === payload.iid,
      )
      //2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新商品')
      }
    })
  },
}
