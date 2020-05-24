import './index.css'
import( /* webpackChunckName: "math" */ './math')
  .then()

// 注册 servise worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

console.log('index.js加载');
console.log('index.js加载2');