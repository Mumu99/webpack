const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 
 * tree shaking(树摇)
 * 作用:
 *   去除无用的代码
 * 使用:
 *   使用ES6模块化
 *   使用webpack production环境
 * 注意:
 *  使用babel时, @babel/preset-env会自动转换ES6模块化成COMMONJS, 不能让他转换, 一旦转换, 就会失效, 所以配置了modules: false
 * 在package.json配置,  "sideEffects": false
 * 标记所有的代码没有副作用, 都可以进行tree shaking
 * 但是这样css会挂掉, 所有可以配置
 * 1. "sideEffects": [
    "*.css" // 样式文件是有副作用的, 不能进行tree shaking
  ]
 * 2. sideEffects: true 
      use: [
        'style-loader',
        'css-loader',
      ],
      sideEffects: true 
 */
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: './js/built.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      // 只检测src目录下的文件
      include: path.resolve(__dirname, 'src'),
      use: [
        'style-loader',
        'css-loader',
      ],
      sideEffects: true // 处理文件都有副作用, 但是css文件可以
    }, ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  mode: 'production'
}