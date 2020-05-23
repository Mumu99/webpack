const {
  resolve
} = require('path')
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //入口
  entry: './src/js/index.js',
  output: {
    path: resolve(__dirname, '../build'), //输出的目录
    filename: 'build.js' // 输出的文件名
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
            name: '[hash:8].[ext]',
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
  plugins: [new HtmlWebpackPlugin({
    // 新的html文件结构和一样, 自动引入js和less
    template: './src/index.html'
  })],
  mode: 'development', //开发文件
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true, //gzip压缩
    port: 3000, // 端口号
    host: "localhost",
    open: true, // 自动打开浏览器
    progress: true // 进度条
  }
}