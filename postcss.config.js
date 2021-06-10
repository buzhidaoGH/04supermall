module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      // unitToConvert: 'px',//被转换的原px单位
      viewportWidth: 360,//视图宽度
      viewportHeight: 780,//视图高度
      unitPrecision: 5,//指定'px'转换的保留小数位
      // propList: ['*'],
      viewportUnit: 'vw',//需要转换的成的视图单位
      fontViewportUnit: 'vw',
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类型
      minPixelValue: 1,//小于1或等1px的单位不需要转换成视图
      mediaQuery: false,//允许在媒体查询中转换单位
      // replace: true,
      exclude: [/TabBar/],
      // landscape: false,
      // landscapeUnit: 'vw',
      // landscapeWidth: 568
    }
  },
}
