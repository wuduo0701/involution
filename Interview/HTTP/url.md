# 输入 url 到敲下回车发生了什么

总结：

- url 解析
- DNS 解析
- TCP 连接（三次握手）
- 发送 HTTP 请求
- 响应请求
- 页面渲染
- 断开 TCP 连接（四次挥手）

## url 解析

首先判断输入的是 url 还是搜索关键词，

- 如果是搜索关键词
  > 会对搜索内容进行编码转化成搜索内容
- 如果是 URL
  > 会判断 URL 是否合理，然后到对应的服务器拿相应 URL 的资源。即 协议 + 服务器/域名 +（端口）+ 资源路径 + 请求描述

## DNS 解析

> 简单来说就是将域名转化成 ip 的过程

### 域名

从上到下分为根域名、顶级域名、二级域名、三级域名。如`www.baidu.com`。www 为三级域名、xxx 为二级域名、com 为顶级域名，除此之外还有电脑默认的本地域名服务器（网络服务提供商自动提供的用于解析域名的服务器）

### 查询流程

> 简单总结：优先查缓存（浏览器缓存 -> 操作系统缓存 -> 本地服务器缓存）、向上级域名服务器查找（迭代查询）、缓存 IP 地址（本地服务器、操作系统、浏览器都缓存一遍）
> ！！分迭代和递归查询方式，迭代相比于递归更简单

1. 先搜寻浏览器的 DNS 缓存
2. 如为找到，继续搜索操作系统缓存
3. 还未找到，继续搜索本地服务器的缓存
4. 如都为命中缓存，则会由本地服务器向上级域名进行迭代查询（本地服务器发起 -> 根域名服务器，告诉.com 由哪一个顶级域名管理 -> 顶级域名服务器，告诉 baidu.com 由 xxx 管理 -> 直到最终能够找到这个域名的 IP 地址）。简单来说：也是一问一答式，如无法最终解析，就会返回下一个 DNS 服务器地址，让本地服务器继续查找，知道最终找到
5. 进行缓存。本地服务器、操作系统、浏览器都缓存一遍 IP 地址

## TCP 连接 - 三次握手

> TCP 协议（应用层、传输层、网络层、链路层）

1. 【SYN_SENT】客户端向服务器发送一个`SYN`报文给服务器，开始进行 TCP 连接，该`SYN`包含了客户端的`ISN`序列号(seq)。（发送：SYN: 1,Seq = x）
   > 客户端的发送能力、服务端的接收能力是正常的。
2. 【SYN_RCVD】服务器收到客户端的`SYN`报文后，会发生一个`SYN-ACK`报文作为相应，表示服务器收到了请求。（发送自己的 SYN：1,ACK:1,seq: y, 加上客户端的 seq：x+1 作为 ack 的值）
   > 服务器的发生能力、客户端的接收能力是正常的，不过服务器不能判断客户端的接收能力是否正常
   - 其中 SYN 是服务器自己的，ACK 是客户端的 ISN + 1（初始化序列号 + 1）
   - 会发送四个：自己的（SYN 标志、ACK 标志、isn 序列号）、客户端的（ack 值：客户端的初始化序列号 + 1）
3. 【ESTABLISHED】客户端在收到服务器发送的`SYN-ACK`报文后，会返回给服务器`ACK`字段，正式建立链接。（发送自己的 ACK、seq：x + 1, 服务器的：ack 值：服务器的 y+1）
   > 客户端的接收、发送能力正常，服务器的发送、接收能力也正常

## HTTP 请求 - 发送请求

> 浏览器通过 HTTP 请求发送到目标服务器。请求分了四部分：请求行、请求头、空行、请求体

### 请求行

> 用于描述客户端的请求方式（GET/POST 等），请求的资源名称(URL)以及使用的 HTTP 协议的版本号。如 `GET /index.html HTTP/1.1`

### 请求头

> 有关于客户端请求的信息

- 通用
  - Host 请求服务器的域名
  - User-Agent: 包含了发出请求的用户代理软件信息
  - Accept 客户端能够接收的内容类型
  - Referer 来源于哪个服务器
  - Cookie 服务端给客户端传的状态
  - Origin：告诉服务器请求从哪里发起的，仅包括协议和域名
  - Connection: keep-alive , 开启 HTTP 持久连接
- 缓存相关
  - Cache-Control 缓存相关
  - Pragma 用来包含指令，通常用于 no-cache 指令
  - If-Match / If-None-Match: 用于缓存 ETag
  - If-Modified-Since: 缓存相关
- 请求方法相关
  - Content-Type：请求体的 MIME 类型
  - Content-Length：请求体的长度。
  - Authorization：认证信息

### 空行

> 最后一个请求头之后是一个空行，发送回车符和换行符，通知服务器以下不再有请求

### 请求体

> 当使用 POST 等方法时，需要客户端向服务器传递数据，这些数据就存储在请求体中。或者上传文件、上传图片等，数据都是存储在这里

## 响应 HTTP 请求

> HTTP 响应报文主要由四部分组成：状态行、响应头、空行、响应数据

### 状态行

> 描述对本次服务器 HTTP 请求响应的状态。由三部分组成： 协议 状态码 状态码描述（HTTP/1.1 200 OK）

- 常见状态码
  1xx：指示信息–表示请求已接收，继续处理。如 100、101
  2xx：成功–表示请求已被成功接收、理解、接受。如 200、204（无返回内容）
  3xx：重定向–要完成请求必须进行更进一步的操作。如 301（永久重定向）、304（使用缓存）、305（临时重定向）
  4xx：客户端错误–请求有语法错误或请求无法实现。如 400（请求错误）、403（权限）、404（未找到）、
  5xx：服务器端错误–服务器未能实现合法的请求。如 500（服务器错误）、502（响应超时）、503（响应超时）

### 响应头

> 响应头用于描述服务器的基本信息

- 通用
  - Content-Type：请求体的 MIME 类型
  - Content-Length：请求体的长度。
  - Date: 服务器发送
- 缓存相关
  - Cache-Control：强缓存
  - Expires：强缓存
  - Last-Modified：协商缓存
  - Etag：协商缓存
- 跨域相关
  - Access-Control-Allow-Origin：哪些地址可以进行跨域资源共享
  - ccess-Control-Allow-Methods：GET,POST,PUT,DELETE 允许哪些方法来访问
  - Access-Control-Allow-Credentials：是否允许发送 cookie

### 空行

> 响应头和相应数据空开的一部分

### 响应体

> 接口请求、服务器返回的数据

## 页面渲染

### 资源解析

- 查看响应头的信息，根据不同的指示做对应处理，比如重定向，存储 cookie，解压 gzip，缓存资源等等
- 查看响应头的 Content-Type 的值，根据不同的资源类型采用不同的解析方式

页面在拿到 index.html 文件后开始解析里面代码，并遇到 js/css/image 等静态资源时，就向服务器端去请求下载（会使用多线程下载、但是每个资源的大小不一致，所以看起来不是顺序执行的）

### 页面渲染

> https://febook.hzfe.org/awesome-interview/book2/browser-render-mechanism
> 浏览器是边解析边渲染的过程，即构建 DOM 树和 CSS 树是同时进行的。在遇到 css 会同步解析 CSS 树。但是遇到 script 脚本则会阻塞渲染，会先下载 js 并执行完成后，再继续后续操作（防止修改 dom）。可用 async、defer、module

![alt text](/assets/images/HTTP/image.png)

1. 解析 HTML，构建 DOM 树
2. 解析 CSS ，生成 CSS 规则树
3. 合并 DOM 树和 CSS 规则树，生成 render 树
4. 布局 render 树（ Layout / reflow ），负责各元素尺寸、位置的计算 `涉及回流`
5. 绘制 render 树（ paint ），绘制页面像素信息 `涉及重绘`
6. 渲染

- Javascript 脚本
  ![alt text](/assets/images/HTTP/image1.png)
  由于 js 可以操作 dom，所以在 html 解析到 Javascript 脚本时会停止对 dom 的解析
  `解决办法`：

  1. 【async 异步执行】`<script src="./test1.js" async></script>`。适用于 js 与 dom 无关、或与其他 js 文件无关的情况。
     `！！特点`：添加此标签后，js 文件下载后会立即异步执行。所以最好不要和 dom 操作有关系，并且如果多个 js 脚本都添加`async`标签，也无法保证执行顺序，所以 js 之间不要有关系
  2. 【defer 延迟执行】`<script src="./test2.js" defer></script>`。适用于 js 中涉及到 dom 的操作或与其他的 js 有关系的情况
     `！！特点`：js 还是会立即下载，但是会延迟执行，等 dom 解析完成后，在按 js 的顺序执行。
  3. 【module 模块化加载】
     1. 默认是异步的，效果等同于 defer
     2. 会下载关联模块化导入的内容，但是执行还是会放在 dom 解析完成后
     3. 严格模式下运行
     4. 减少 tree sharking

- 回流
  > 发生在布局 render 树的步骤，浏览器需要重新计算并渲染部分文档的过程
  > 第一次渲染一定有回流
  > 回流一定涉及重绘
  - 回流的一些操作
    1. 页面首次渲染
    2. 浏览器窗口大小发生改变
    3. 手动操作 dom
    4. 激活伪类元素
    5. 元素尺寸或位置发生改变
    6. 元素字体大小、内容变化
    7. 查询某些属性或调用某些方法
  - 会导致回流的方法
    1. clientWidth、clientHeight、clientTop、clientLeft
    2. offsetWidth、offsetHeight、offsetTop、offsetLeft
    3. scrollWidth、scrollHeight、scrollTop、scrollLeft
    4. scrollIntoView()、scrollIntoViewIfNeeded()
    5. getComputedStyle()
    6. getBoundingClientRect()
    7. scrollTo()
- 重绘
  > 当页面中元素样式的改变，并重新绘制它的过程
  > 第一次渲染一定有重绘
- 如何提高渲染进程？
  - 减少渲染中的回流重绘（回流比重绘的代价高）
    - 透过 will-change 设定成独立的图层，因为独立的图层可以避免该节点渲染行为影像到其他节点
    - 使用 opacity 来改变元素的能见度
    - 避免频繁操作 dom
    - 使用 CSS Transforms 和 Animations
    - 减少 v-if 的使用
  - 优化影响渲染的资源
    - 为 JS 添加 async 和 defer 属性
    - JS 通常放在页面底部，防止阻塞渲染
    - 关键 CSS 资源放在头部加载
    - 减少回流和重绘的次数

## 断开 TCP 连接

![alt text](/assets/images/HTTP/image2.png)

1. 【FIN_WAIT_1】客户端向服务器发送一个 `FIN = M` 的标识，告诉服务器客户端没有数据发送了，但是服务器不着急断开，还可以继续发送。 ----> 相当于告诉服务器方，客户端数据传输完成了，你那边没了的话可以断
2. 【FIN_WAIT_2】服务器在收到 `FIN = M` 后，回先发送客户端一个 `ack=M+1` 标识。告诉客户端请求已经收到了，但是服务器还未准备好，请继续等待
3. 【LAST_ACK】当服务器的数据也发送完成后，则向客户端发送 `FIN = N` 标识。告诉客户端服务器这边的数据已经发送完成了，准备关闭连接了。
4. 【CLOSED】客户端在收到服务器的关闭通知后，向服务器发送它已经收到了，并发送`ACK = 1 ack=N+1`，ACK 为标头，ack 为真实数据。服务器收到后，就正式断开连接了。如果在此 2MSL 期间没收到服务器的回复，则代表服务器正常关闭了，客户端也可以关闭。否则还需要进行通信

# 补充

## 反向代理

> 【客户端不知道代理服务器的存在】客户端通过访问代理服务器，代理服务器去访问并获取目标服务器的资源给客户端。

方便统一管理，如果我们需要访问不同的服务器，就需要客户端一个个去连接。但是如果有反向代理的存在，客户端只需要和这个反向代理服务器连接就行，客户端去给我们请求

### 正向代理

> 【客户端知道代理服务器的存在，自己管理代理服务器的，如 `Clash` 这种翻墙代理】客户端通过访问代理服务器，代理服务器去访问并获取目标服务器的资源给客户端

## 负载均衡

> 应付业务负责，高请求等的业务。单台服务器以及很难满足需求了，需要多台服务器通过负载均衡的方式组成集群，进行性能扩展。而且多台服务器组成，如果其中有一个宕机的话也不会造成业务挂了。

```conf
# CRM商机管理分流
upstream opp-manage-stream {
  server dlaudit8-dlauditv8online1.daili.svc.ht2.n.jd.local weight=10 max_fails=2 fail_timeout=30s;
  server dlaudit8-dlauditv8online2.daili.svc.lf10.n.jd.local weight=10 max_fails=2 fail_timeout=30s;
}

location /business/ {
  proxy_pass http://opp-manage-stream/;
}
```
