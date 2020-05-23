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
    输出的多个文件, 每次加载都会加载公共资源
  解决:
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  功能:
    将入口js文件中node_modules中大于30kb的打包到单独模块vendors
    将一个大于30kb的至少在两个入口分别引入一次的模块打包到单独模块default
  问题:
    开发时一般都是单路口
    将入口js文件中node_modules中大于30kb的打包到单独模块vendors(没问题)
    将一个大于30kb的至少在两个入口分别引入一次的模块打包到单独模块default(问题就是只有单入口不可能被引入两次, 这个配置就不可能生效)
    最终的结果:
      只能打包node_modules代码到单独文件
      但是其他代码还是汇总到一个文件中, 代码体积仍然很大

  解决：
    如果你想代码一起打包到入口js文件中, 正常引入即可
    如果想代码被单独打包成一个文件, 将来单独加载, 需要使用动态导入

    开发中什么样的文件需要被单独打包?
      node_modules可以通过optimization被打包到单独文件中
      路由组件需要单独打包, 使用动态导入

      在React中, 可以使用Suspence + lazy 来实现路由组件的动态导入
      const Foo = lazy(() => import('./Foo.jsx'))
        <Suspence fallback={<Loading />}>
          <Router>
            <Router path="/foo" component={foo}/>
          </Router>
        </Suspence>
      在Vue中, 
        cosnt Foo = () => import('./Foo.vue')
        const router = new VueRouter({
          routes: [
            {path: '/foo', component: Foo}
          ]
        })
    
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
    }
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