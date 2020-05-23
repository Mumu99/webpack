// 引入加载所有的资源包
// import '@babel/polyfill'

// 引入样式文件
import './index.css'
// 普通引入: HMR无效, 但是能看到效果
import add from './add.js'
const promise = new Promise(() => {});
console.log(promise);
console.log(add(1, 2));