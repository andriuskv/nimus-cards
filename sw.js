if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,c,s)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const n={uri:location.origin+r.slice(1)};return Promise.all(c.map(r=>{switch(r){case"exports":return i;case"module":return n;default:return e(r)}})).then(e=>{const r=s(...e);return i.default||(i.default=r),i})}))}}define("./sw.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"0.js",revision:"a80498226779a4d655504b1be796fcaa"},{url:"1.js",revision:"727063066b80ec5066538d1cb1cec158"},{url:"2.js",revision:"93351504acef895d9e21cda16309f4f2"},{url:"2.js.LICENSE.txt",revision:"455f9f3ae849b1b7c9d5b5f2d351830a"},{url:"4.main.css",revision:"3fa0b7c4272d995ea7ca9e87f9b20ab2"},{url:"5.js",revision:"4692da256b71ac974168de02353cea6b"},{url:"5.main.css",revision:"dc7ecf589a51d1cfc76c24dc7c2c63a5"},{url:"6.js",revision:"a483b118966816245dfadd1e0c195388"},{url:"6.main.css",revision:"6848788ddd47c10f925b285d7f89ef3d"},{url:"7.js",revision:"de60fec2d1fd47f6fc775f9de004f0ab"},{url:"7.main.css",revision:"3c42cbf5819f5501ad4768f06f2a9a3a"},{url:"8.js",revision:"f26e26934d1cfb39629605ccab5d4ac9"},{url:"android-chrome-192x192.png",revision:"d14680e61691cf63bace18e70744e47c"},{url:"android-chrome-512x512.png",revision:"95f5432d81527a9ad1f70e8abdf78c23"},{url:"apple-touch-icon.png",revision:"d8882932d24e582f2614a81802f37f6c"},{url:"favicon-16x16.png",revision:"5a61ca8d9e3818b0e842fa87131f8eb6"},{url:"favicon-32x32.png",revision:"41ae843a6cb40619f71c17e2dd9104ee"},{url:"favicon.ico",revision:"976479122a08ebed5d89837f2ca3666d"},{url:"index.html",revision:"e8dd70ac35a33b72eee89c5313f80d63"},{url:"main.css",revision:"727a3abc54a480397789c7bc5b5a5eb8"},{url:"main.js",revision:"ac0334a87c22d0e69b4ff0d3a20f9f4d"},{url:"manifest.json",revision:"874e561c173176bdb24944f4e9fc0233"},{url:"vendor.js",revision:"f343f49343989728a2f4f6c8a141df6e"},{url:"vendor.js.LICENSE.txt",revision:"c64c486544348f10a6d6c716950bc223"}],{}),self.__WB_DISABLE_DEV_LOGS=!0}));
