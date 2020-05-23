document.getElementById('btn').onclick = function () {
  import( /* webpackChunkName: "math" */ './add')
    .then((math) => {
      console.log('成功');
      console.log(math.add(2, 3));
      console.log(math.mul(2, 3));
    })
    .catch((err) => {
      console.log('失败', err);
    })
}