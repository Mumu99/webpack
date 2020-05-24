const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, 'build'), {
  maxAge: 3600000 // 资源的强制缓存时间
}))

app.listen(9527, 'localhost', err => {
  if (err) {
    console.log(err);
  }
  console.log('服务器启动成功');
})