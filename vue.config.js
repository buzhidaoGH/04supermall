module.exports = {
  configureWebpack: {
    resolve: {
      // extensions:['.js', '*', '.css'],
      alias: {
        // '@':'src',
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        //store和router不用配置调用只需要一次(获取是Vue中全局的)
        //可以使用this.$router(route)和this.$store拿到对象
      },
    },
  },
}
