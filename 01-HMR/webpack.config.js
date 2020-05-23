const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
/**
 * 1. 相关包
 *  webpack wepack-dev-server webpacj-cli -D
 *  html-webpack-plugin style-loader css-loader -D
 * 2. 在package.json中配置启动webpack指令
 *  "start": "webpack-dev-server"
 * 3. devServer
 *  可以热更新
 *  问题:
 *    默认的情况下, 改动一个文件, 会引起全部刷新, 会全部重新打包, 性能不好
 *  需求:
 *    改动一个文件, 只更新这一个文件, 其他的不变(性能好)
 *  解决方案:
 *    HMR(hot module replacement 热模块替换)
 *    只更新需要更新的模块, 其他的不变
 *    const webpack = require('webpack')
 *    添加支持HMR的插件
      new webpack.HotModuleReplacementPlugin()
      然后在server中写
      hot: true // 启动HMR功能
    新问题:
      默认的情况下, 样式文件有HMR功能, 但是js文件没有HMR功能
    解决:
      在入口js文件中
      // 判断当前有没有启动HMR功能
      if (module.hot) {
        module.hot.accept("./add", () => {
          console.log('执行了！！！');
        })
      }
    作用:
      在开发环境中重新编译的速度快
 */
module.exports = {
  entry: './src/index.js',
  output: {
    path: undefined,
    filename: './js/built.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      // 只检测src目录下的文件
      include: path.resolve(__dirname, 'src'),
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // 添加支持HMR的插件
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    open: true, // 自动打开浏览器
    host: 'localhost',
    port: 9527,
    compress: true, // gzip压缩
    hot: true // 启动HMR功能
  }
}