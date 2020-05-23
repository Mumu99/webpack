const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
/**
 * code split 代码分割
 *  将输入一个JS文件 改成 输入多个JS文件
 * 
 * entry: String | Object | Array
 *  String: 单路口(从一个文件开始)
 *  Object: 多入口(从多个文件开始打包, 输出到多个文件中)
 *  Array: 多入口(从多个文件开始打包, 全部输出到一个文件中)
 * 
 * entry: {
    index: './src/index.js',
    main: './src/main.js'
  }
  有多少个入口文件, 就会有多少个输出结果
  问题: 
    每次加载都会加载公共资源, 
 */
module.exports = {
  entry: {
    index: './src/index.js',
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // [name]自动补充文件名
    filename: './js/[name].js'
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
    }),
    // 清除上一次的打包结构
    new CleanWebpackPlugin()
  ],
  mode: 'development'
}