if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const t={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return t;default:return e(r)}})).then(e=>{const r=n(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./css/main.86829.css",revision:"9ead02a55b14412326dd3fda877dc383"},{url:"./js/2.46cb2.js",revision:"dedc1c775ef0cb9dbd7d3e621f6704f4"},{url:"./js/main.924e2.js",revision:"061c4eab1fd1a9b50917027e50c946fd"},{url:"./js/runtime-main.cc616.js",revision:"3f93b78d1b7ffbd4dba3c77a5a2186bb"},{url:"index.html",revision:"d5083e191b39a282f72aff99e1091f86"}],{})}));
