const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: './',
  // 后续开发直接改为生产包名
  outputDir: 'dist',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: 'true; @import "/src/assets/css/theme.less";',
        },
      },
    },
  },
  configureWebpack: (config) => {
    const con = config;
    con.name = 'ridecoupon';
    // config.resolve.alias.comps = require("path").join(__dirname, "src/components");
  },
  chainWebpack(config) {
    // 1、webpack中本来有处理svg的rule，需要过滤掉icons/svg
    config.module.rule('svg')
      .exclude.add(resolve('src/assets/icons'));
    // 2、svg-loader配置
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
    // 需要安装 style-resources-loader 与stylus一致
    const oneOfsMap = config.module.rule('less').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('style-resources-loader')
        .loader('style-resources-loader')
        .options({
          // 需要插入的文件路径
          patterns: './src/assets/css/var.less',
          // 需要插入的文件路径数组
          // patterns: ["./path/to/vars.less", "./path/to/mixins.less"]
        })
        .end();
    });
  },
  devServer: {
    // proxy: {
    //   '/': {
    //     target: 'http://22.11.236.69:8080/mlifeWeb/activity',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/': '',
    //     },
    //   },
    // },
    // app是一个express的实例

    before(app) {
      console.log(app);
    },
  },
};
