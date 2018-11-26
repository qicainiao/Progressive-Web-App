SW 是什么呢？这个是离线缓存文件。我们 PWA 技术使用的就是它！SW 是浏览器在后台独立于网页运行的脚本，它打开了通向不需要网页或用户交互的功能的大门，因为使用了它，才会有的那个 Reliable 特性吧，SW 作用于 浏览器于服务器之间，相当于一个代理服务器（ 用一张图来表示一下他的位置 ）。
                        
                                         

                为什么会用到 SW 呢？原声 App 拥有Web应用通常所不具备的富离线体验，定时默认更新，消息推送等功能，而 SW 标准让在 Web App 上拥有这些功能成为可能！
                跟 SW 相同的 API 还有 App Cache ，为什么不使用它呢？ App Cache 是有局限性的，比如说：它很容易得解决 single web page application （ 单页面应用 ）的问题，但是在多页面应用上会很麻烦， SW 解决的这个 App Cache 的缺点！

         下面我简单而详细的说一下 SW ：

              1、 浏览器支持
                        
                        顺便带一句：目前只能在 HTTPS 环境下才能使用SW，因为SW 的权利比较大，能够直接截取和返回用户的请求，所以要考虑一下安全性问题。

                        

               2、事件机制
                                                    
               3、 功能
                     SW的功能还是比较逆天的！
                     
后台数据的同步
从其他域获取资源请求
接受计算密集型数据的更新，多页面共享该数据
客户端编译与依赖管理
后端服务的hook机制
根据URL模式，自定义模板
性能优化
消息推送
定时默认更新
地理围栏
        
               4、 生命周期

                           
            
                      Parsed （ 解析成功 ）： 首次注册 SW 时，浏览器解决脚本并获得入口点，如果解析成功，就可以访问到 SW 注册对象，在这一点中我们需要在 HTML 页面中添加一个判断，判断该浏览器是否支持 SW 。
    
                      Installing （ 正在安装 ）：SW 脚本解析完成之后，浏览器会尝试进行安装，installing 中 install 事件被执行，如果其中有 event.waitUntil ( ) 方法，则 installing 事件会一直等到该方法中的 Promise 完成之后才会成功，如果 Promise 被拒绝，则安装失败，SW会进入 Redundant（ 废弃 ）状态。

                      Installed / Waiting （安装成功/等待中）：如果安装成功，SW 将会进入这个状态。

                      Activating （ 正在激活 ）：处于 waiting 状态的 SW 发生以下情况，将会进入 activating 状态中：
                                
                              当前已无激活状态的 worker 、 SW脚本中的 self.skipWaiting（）方法被调用 （ ps： self 是 SW 中作用于全局的对象，这个方法根据英文翻译过来也能明白什么意思啦，跳过等待状态 ）、用户已关闭 SW 作用域下的所有页面，从而释放了当前处于激活状态的 worker、超出指定时间，从而释放当前处于激活状态的 worker 

                      Activated （ 激活成功 ）：该状态，其成功接收了 document 全面控制的激活态 worker 。

                      Redundant （ 废弃 ）：这个状态的出现时有原因的，如果 installing 事件失败或者 activating 事件失败或者新的 SW 替换其成为激活态 worker 。installing 事件失败和 activating 事件失败的信息我们可以在 Chrome 浏览器的 DevTools 中查看：
    
                                                         （ ps：我这个是正常的状态下的 ，错误的话会有 error 提示的 ）
                        

              5、主要依赖

                    SW 作为现代浏览器的高级特性，依赖于 fetch 、promise 、CacheStorage、Cache、等浏览器的基础能力， Cache 提供了 Request / Response 对象对的存储机制。CacheStorage 则提供了存储 Cache 对象的机制。

                                                    

            6、安全性问题

                 跨域请求支持：  SW 可以拦截它作用域内的所有请求，跨域资源也不例外，但是浏览器默认对跨域资源发起的是 no-cors 请求，得到的 response 是 opaque 的， 所以会导致我们无法判断跨域请求是否成功，以便进行缓存，因此我们需要修改 fetch 请求头部信息，添加 mode：’cors’ 标记。

                （ 名词解释一下喽，这部分知识是关于 fetch API 的，想了解更多的同学，自行搜索相关的知识哈 ）
                no-cors：该模式允许来自 CDN 的脚本、其他域的图片和其他一些跨域资源，但是首先有个前提条件，就是请求的 method 只能是 HEAD 、GET 、POST 。此外，如果 ServiceWorkers 拦截了这些请求，它不能随意添加或者修改除这些之外 Header 属性。第三，JS 不能访问 Response 对象中的任何属性，这确保了跨域时 ServiceWorkers 的安全和隐私信息泄漏问题。
                opaque：Response 对象中 type 属性的值 ， 在 ‘no-cors’ 模式下请求了跨域资源，依靠服务端来做限制。

            分享给大家一个 SW 全面进阶的博文：

        Manifest （ 应用清单 ）

              Web App Manifest 是一个 W3C 规范，它定义了一个基于 JSON 的 List 。Manifest 在 PWA 中的作用有：
                   
                  能够将你浏览的网页添加到你的手机屏幕上
                  在 Android 上能够全屏启动，不显示地址栏 （ 由于 Iphone 手机的浏览器是 Safari ，所以不支持哦）
                  控制屏幕 横屏 / 竖屏 展示
                  定义启动画面
                  可以设置你的应用启动是从主屏幕启动还是从 URL 启动
                  可以设置你添加屏幕上的应用程序图标、名字、图标大小

        Push Notification （ 消息通知 ）

              Push 和 Notification 是两个不同的功能，涉及到两个 API 。

              Notification 是浏览器发出的通知消息。
            
              Push 和 Notification 的关系，Push：服务器端将更新的信息传递给 SW ，Notification： SW 将更新的信息推送给用户。

   缺点：
                
              1、浏览器的支持度问题，尤其是 Safari 浏览器，这样就会导致我们在 IOS 系统手机上没办法体验 PWA 。（ 谁让 ‘ 果果 ’ 不是开源的呢 ）
                
              2、根据国情来看哈，目前 Native App 的使用用户都已经习惯了，虽然会下载一下，但是现在 WiFi 到处都是了，毕竟 WiFi 的普及太快了。让用户使用 PWA 来替代 Native App 短时间会不适应的。
            
              3、消息推送问题，PWA的消息推送走的是 GCM（ FCM ）通道。而国内 Google 是无法访问的。（只能翻墙了，但是工信部已经禁止使用 VPN 了。） 
              总体来说：
                    Google 的技术在国内推进比较缓慢，所以 PWA 在国内的发展是有多困难吧。


参考文章 https://blog.csdn.net/qq_19238139/article/details/77531191


#Workbox 3
workbox的出现就是为了解决上面的问题的，它被定义为PWA相关的工具集合，其实围绕它的还有一些列工具，如workbox-cli、gulp-workbox、webpack-workbox-plagin等等，不过他们都不是今天的重点，今天想聊的就是workbox本身。

其实可以把workbox理解为Google官方PWA框架，它解决的就是用底层API写PWA太过复杂的问题。这里说的底层API，指的就是去监听SW的install, active, fetch事件做相应逻辑处理等。使用起来是这样的

// 首先引入workbox框架
<code>importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');
workbox.precaching([
  // 注册成功后要立即缓存的资源列表
])

// html的缓存策略
workbox.routing.registerRoute(
  new RegExp(''.*\.html'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  new RegExp('.*\.(?:js|css)'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://your\.cdn\.com/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('https://your\.img\.cdn\.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'example:img'
  })
);
</code>
上面的代码理解起来就容易的多了，通过workbox.precaching中的是install以后要塞进caches中的内容，workbox.routing.registerRoute中第一个参数是一个正则，匹配经过fetch事件的所有请求，如果匹配上了，就走相应的缓存策略workbox.strategies对象为我们提供了几种最常用的策略.


链接：https://www.imooc.com/article/40432

#LAVAS
https://lavas.baidu.com/
Lavas 是一套基于 Vue 的 PWA 解决方案，能够帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题，对提升用户体验，用户留存率等有明显提升，且开发者无须过多的关注 PWA 开发本身。

 ###Lavas 能做什么
Lavas 解决方案能够帮助开发者完成：

最基本的移动站点建设，包括 Vue, Vuex, Vue-router, webpack 等常用且成套的技术提供支持

允许站点添加至手机桌面，再次打开时全屏运行，摆脱浏览器的固定显示框架(地址栏，菜单栏等)

强化缓存，允许站点在弱网甚至离线的情况下继续显示内容

支持消息推送，帮助站长主动推送用户感兴趣的信息，提升业务指标

支持服务端渲染(SSR)，对搜索引擎更加友好

支持App Shell 模型，在正常情况下提升加载性能，在异常情况下优化错误显示。

总结起来，Lavas 除了能帮助开发者完成 Vue 能做的(搭建基本站点)之外，通过一些配置还能够快速赋予站点 PWA 的特性，且不需要开发者过多的关心 PWA 的详细开发技术和细节。

#Dart

语法学习
#https://www.jianshu.com/p/9e5f4c81cc7d
#flutter
https://flutterchina.club/
