const path = require('path')
module.exports = {
    publicPath: './',
    //编译打包存放的目录默认dist
    outputDir: 'dist',
    productionSourceMap: false,
    devServer: {
        port: 9527
    },
    // 关闭生产环境console
    configureWebpack(config) {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
    chainWebpack: (config) => {
        config.module
        .rule('myrule')
        .test(/\.md$/)
        .use('myLoader')
        .loader('myLoader')
        .end()
    }

}