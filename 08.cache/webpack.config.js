const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
// 提取css成单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/*
  文件名 [name].js
    问题: 一旦文件被强制缓存起来, 在强制缓存期间内, 内容不可更改
  文件名 [name].[hash].js
    让文件名不一样, 就不会使用上次文件的强制缓存了
    问题: 当改动样式/js文件, 会导致其他没有变化的文件缓存失效
    原因: 所有文件共享一个hash值, 一旦文件发送变化, 就全部生成新的hash值, 导致所有缓存失效
    hash: 每次打包都会成功一个唯一的hash值
  文件名 [name].[chunkhash].js 
    chunkhash打包生成的每一个块都有唯一的chunkhash
    ./css/main.dccdf.css
    ./js/0.febe8.js  
    ./js/main.dccdf.js 

    打包生成的JS文件都会有自己的chunkhash, 但是打包生成的样式文件的chuankhash会和入口文件生成main chunk一致.
    因为, css-loader 会将样式文件打包到JS中, 此时JS和CSS就成一个chunk了

    问题: 入口文件和样式文件chunkhash值一样, 同样当修改文件内容时, 另外文件缓存失效

    文件名 [name].[contenthash:5].js
      contenthash根据文件内容来生成contenthash, 只要文件内容不一样, hash一定不一样

    问题: 当使用了动态导入语法对math.js进行代码分割
      一旦修改了math.js文件, 会导致index.js失效
    原因: index.js中会记录math.js的打包chunkId(contenthash生成的)
      当math.js文件发生变化(contenthash会改变), 导致index.js中的math.js的chunkId发生变化, 从而导致index.js也变化了(contenthash会改变)
    解决:
      将所有JS文件记录ID的内容, 提取成单独文件runtime文件, 运行时文件
    配置:
      runtimeChunk: {
      name: (entryPoint) => `runtime-${entryPoint.name}`
      }
    当math.js文件发送变化(contenthash会改变), 只会导致 runtime.js 文件发生变化而index.js不变 
 */
module.exports = {
  entry: './src/index.js',
  optimization: {
    splitChunks: {
      chunks: 'all', // 对所有模块进行处理
      // 以下为默认值
      // minSize: 300000, // 最小的处理的模块30kb
      // maxSize: 0, // 没有上线
      // minChunks: 1, // 模块最少引入1次
      // maxAsyncRequests: 5, // 最大异步加载模块数量
      // maxInitialRequests: 3, // 最大初次加载模块数量
      // automaticNameDelimiter: '~'
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime-${entryPoint.name}`
    }
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // [name]自动补充文件名
    filename: './js/[name].[contenthash:5].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      // 只检测src目录下的文件
      include: path.resolve(__dirname, 'src'),
      use: [
        MiniCssExtractPlugin.loader,
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
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash:5].css'
    })
  ],
  mode: 'development'
}