// 动态导入
import('./math')
  .then((math) => {
    // 函数体
    console.log('成功');
    console.log(math.add(1, 2));
    console.log(math.mul(1, 2));
  })
  .catch(err => {
    // 函数体
    console.log('模块加载失败', err);
  })