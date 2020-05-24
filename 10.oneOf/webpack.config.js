const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
// 提取css成单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/*
  默认情况下, 一个模块要被所有的loader都过一遍, 这样性能就比较差
  实际上, 我们只需要
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
    rules: [
      // loader
      {
        test: /\.js$/,
        // 只检测src目录下的文件
        include: path.resolve(__dirname, 'src'),
        enforce: 'pre', // 优先执行
        loader: 'eslint-loader',
        options: {
          cache: true // 开启缓存
        }
      },
      {
        // oneOf数组中的loader一旦匹配上, 后面就不看了
        oneOf: [{
            test: /\.css$/,
            // 只检测src目录下的文件
            include: path.resolve(__dirname, 'src'),
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
            ],
            sideEffects: true // 处理文件都有副作用, 但是css文件可以
          },
          {
            test: /\.js$/,
            // 只检测src目录下的文件
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true // 开启babel缓存
            }
          }
        ]
      }
    ]
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