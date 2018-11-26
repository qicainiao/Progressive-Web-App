//skipwaiting 表示当前处在waitting状态的脚本进入active状态

// const cacheName ="yd-pwa-step-v1";
// const filesToCache = [
//    "./scripts/index.js",
//    "./scripts/test.js",
//    "/"
// ]
//
// //加入缓存列表 强制进行更新
// function updateStaticCache(){
//     return catches.open(cacheName)
//       .then((cache) => {
//         return catch.addAll(filesToCache);
//       }).then(() => {
//         self.skipwaiting();
//       })
//
// }
//
// self.addEventListener('install', event => {
//    event.waitUntil(updateStaticCache())
//    console.log("首次安装成功,缓存需要缓存的文件");
//    //如果所有的文件都成功缓存了，便会安装完成。如果任何文件下载失败了，那么安装过程也会随之失败。
// });
//
//
// self.addEventListener("activate",()=>{
//   console.log("激活成功");
//    event.waitUntil(catches.keys().then((keyList) => {
//       return Promise.all(keyList.map(key=>{
//         console.log("【ServiceWorker更换key】完毕");
//         if (key!=cacheName) {
//            return catches.delete(key);
//         }
//       }))
//    }))
// });
//
// /**
// 为 fetch 事件添加一个事件监听器。接下来，使用 caches.match() 函数来检查传入的请求 URL 是否匹配当前缓存中存在的任何内容。如果存在的话，返回缓存的资源。
// 如果资源并不存在于缓存当中，通过网络来获取资源，并将获取到的资源添加到缓存中。
// */
// self.addEventListener('fetch', function (event) {
//   event.respondWith(new Response("Hello World"));
// });


// workbox 2.x 是将 workbox 核心内容放在 workbox-sw node_modules 包里维护的
// workbox 3.x 开始是将 workbox 核心 lib 放在 CDN 维护
// 当然也可以挪到自己的 CDN 维护

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');

if (workbox) {
    console.log(`Yay! workbox is loaded 🎉`);
}
else {
    console.log(`Boo! workbox didn't load 😬`);
}
