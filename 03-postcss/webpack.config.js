const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 
 * npm i webpack webpack-cli html-webpack-plugin postcss-loader postcss-import postcss-cssnext-env autoprefixer cssnano -D
 * 
 * 配置
 * {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: (loader) => [
        require('postcss-import')({
          root: loader.resourcePath
        }),
        require('postcss-cssnext')(),
        require('autoprefixer')(),
        require('cssnano')()
      ]
    }
  }
  默认情况下, 能做一些css的兼容性处理, 但是不够全, 所以需要在package中配置
  "browserslist": {
    "development": [
      "last 1 Edge versions"
    ],
    "production": [
      "cover 99.5%, not deat, not op_mini all"
    ]
    还需要设置
    process.env.NODE_ENV = "production"
 */
process.env.NODE_ENV = "production"
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
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('postcss-import')({
                root: loader.resourcePath
              }),
              require('postcss-preset-env')(),
              require('cssnano')()
            ]
          }
        }
      ]
    }, ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  mode: 'development'
}