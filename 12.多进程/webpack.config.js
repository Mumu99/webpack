const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
  之前用happypack
  "thred-loader", // 启用多进程打包
  https://github.com/webpack-contrib/thread-loader
*/

module.exports = {
  // entry: "./src/index.js",  // 等价于下面这种
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: undefined,
    filename: "./js/[name].js",
  },
  module: {
    rules: [{
      // oneOf数组中的loader一旦匹配上，后面的就不看了
      oneOf: [{
          test: /\.css$/,
          include: path.resolve(__dirname, "src"),
          use: ["style-loader", "css-loader"],
          sideEffects: true, // 当前处理的文件都有副作用，不要进行tree shaking
        },
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, "src"),
          use: [
            "thred-loader", // 启用多进程打包
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-react"],
                cacheDirectory: true, // 开启babel缓存
              },
            }
          ],
        },
      ],
    }, ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "development",
  devServer: {
    open: true,
    port: 9527,
    hot: true,
  },
  resolve: {
    // 自动补全文件扩展名（后缀名）
    extensions: ['.js', '.jsx', '.json']
  },
  devtool: 'cheap-module-eval-source-map'
  /*
    开发环境: 为了让首次构建和重新构建速度更快
      cheap-module-eval-source-map
    生产环境: 为了让调试更友好，打包体积更小
      source-map
  */
};