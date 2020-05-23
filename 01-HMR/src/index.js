// 引入样式文件
import './index.css'
// 普通引入: HMR无效, 但是能看到效果
import add from './add.js'

// 判断当前有没有启动HMR功能
if (module.hot) {
  // add.js文件开启HMR功能 
  module.hot.accept("./add", () => {
    // 一旦发生变化, 其他的文件不会改变, 会执行当前的函数
    console.log('执行了！！！');
  })
}