const {
  resolve
} = require('path')
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
  //入口
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, '../build'), //输出的目录
    filename: 'static/js/[name].js', // 输出的文件名
    publicPath: '/'
  },
  module: {
    rules: [
      // loader
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 11000,
            name: 'static/media/[hash:8].[ext]',
            esModule: false
          }
        }]
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
      },
      {
        //排除文件
        exclude: /\.(less|jpg|png|gif|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 新的html文件结构和一样, 自动引入js和less
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true, //去除换行符 / 空格
        removeComments: true, // 去除注释
        removeRedundantAttributes: true, // 去除默认值标签属性
        removeScriptTypeAttributes: true, // 删除script type
        removeStyleLinkTypeAttributes: true, // 删除link type
        useShortDoctype: true //使用doctype
      }
    })
  ],
  mode: 'production' //开发文件
}