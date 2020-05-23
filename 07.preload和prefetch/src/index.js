document.getElementById('btn').onclick = function () {
  /*
    preload 预加载
      加载当前页面需要使用的资源(当前需要使用)
    prefetch 预加载
      加载下一个页面需要使用的资源(当前不需要是使用)
    等待页面其他资源加载完毕只会, 在偷偷的加载后面需要的资源

    页面加载JS资源的优先级
      普通 script
      其次 script 加上async defer 属性
      最后 preload prefetch

    preload和prefetch存在兼容性问题
  */
  import( /* webpackChunkName: "add", webpackPrefetch: true */ './add')
    .then((math) => {
      console.log('成功');
      console.log(math.add(2, 3));
      console.log(math.mul(2, 3));
    })
    .catch((err) => {
      console.log('失败', err);
    })
}
import( /* webpackChunkName: "math", webpackPreload: true */ './load')
  .then((math) => {
    console.log('load成功');
  })
  .catch((err) => {
    console.log('失败', err);
  })