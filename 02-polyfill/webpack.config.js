const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * npm i webpack webpack-cli html-webpack-plugin style-loader css-loader babel-loader @babel/preset-env @babel/core -D
 * 配置JS的兼容: babel
 * {
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel-loader',
      options: {
        presets: ["@babel/preset-env"]
      }
    }
    问题:
      只能将一些普通的ES6语法转换成ES5以下,一旦一些复杂的语法, 如Promise,Async等就不会转换
    解决:
      在入口文件js引入@babel/polyfill
      npm i @babel/polyfill
    问题:
      但是打包后文件的体积扩大
    解决:
      core-js
      下载: npm i core-js
      不需要在index.js引入@babel/polyfill
      功能:
        按需加载
      options: {
        presets: ["@babel/preset-env", {
          useBuiltIns: 'usage', // 按需加载需要的ES6的高级语法就加载对应的语法polyfill(兼容性包)
          corejs: {
            version: 3
          },
          // targets: {
          //   ie: 8,
          //   chrome: 60,
          //   firefox: 50,
          //   safari: 10,
          //   edge: 13
          // }
          // 需要覆盖99.5%的浏览器, 不要死了的
          // 参考browserslist
          targets: '>0.5%, not dead',
          // 不要将ES6模块化转换为commonJS
          modules: false
        }]
      }
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
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                // 文档: https://www.babeljs.cn/docs/babel-preset-env#targets
                // 按需加载
                // 需要使用ES6的高级语法，就加载语法对应的polyfill，其他就不加载
                useBuiltIns: 'usage',
                // 使用兼容性的包，指定版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到什么程度
                // targets: { 
                //   ie: 8,
                //   chrome: 60,
                //   firefox: 50,
                //   safari: 10,
                //   edge: 13
                // }
                // 需要覆盖99.5%的浏览器，但是不要死了的
                // 参考：browserslist
                targets: '>0.5%, not dead',
                // 不要将ES6模块化装化成COMMONJS（cjs）
                modules: false
              }
            ]
          ],
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  mode: 'development'
}