//封装axios
import axios from 'axios'
//第四种方式
export function request(config) {
  //1.创建实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000,
  })

  //2.instance实例拦截器,请求(发送),拦截了要放行
  instance.interceptors.request.use(
    (config) => {
      // console.log(config)
      //1.如果config中的一些信息不符合服务器要求,
      //2.或者发送网络请求的时候,页面显示一个请求的图标
      // 比如转圈圈等待~

      //3.某些网络请求(比如登录的token),必须携带一些特殊信息
      //如果没有,就显示需要登录的弹窗,然后跳转到登录页面
      //放行 config
      return config
    },
    (err) => {
      console.log(err)
    },
  )
  //2.instance实例拦截器,响应(接收),接收拦截了也要处理后放行
  instance.interceptors.response.use(
    (res) => {
      // console.log(res)
      return res.data
    },
    (err) => {
      console.log(err)
      return err
    },
  )

  //3.发送真正的网络请求
  return instance(config)
}

// export function request(config) {
//		//第三种方式
//   return new Promise((resolve, reject) => {
//     //1.创建实例
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000,
//     })
//     //发送真正的网络数据
//     instance(config)
//       .then((res) => {
//         //成功,调用成功函数,返回值
//         resolve(res)
//       })
//       .catch((err) => {
//         //失败,调用失败函数,返回值
//         reject(err)
//       })
//   })
// }
//1.创建axios实例
// const instance = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000,
// })

//调用实例模板
// instance({
// 	url:'xxxxxx'
// }).then(成功).catch(失败)

//2. 第一种使用实例,发送真正的网络请求
// instance(config)
//   .then((res) => {
// 		//成功,调用成功函数,返回值
//     success(res)
//   })
//   .catch((err) => {
// 		//失败,调用失败函数,返回值
//     error(err)
//   })

//2. 第二种使用实例(单个对象,对象中包含对象,和成功方法,失败方法),发送真正的网络请求
// instance(config.baseConfig)
//   .then((res) => {
//     config.success(res)
//   })
//   .catch((err) => {
//     config.failure(err)
//   })
// }
