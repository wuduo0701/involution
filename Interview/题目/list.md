# 2024.09.05 小公司

1. sse 好像并没有降低服务器资源？
2. 怎么说降低呢
3. 通过轮训也能做
4. 业务开销应该不大。如何量化指标，怎么就减少了业务消耗，没查缓存。
5. 微前端的踩坑点
6. 为什么用微前端
7. 微前端的原理，很多都没说好，结结巴巴的
8. 业务也介绍的不行。还得在练
9. sse 和 websocket 的区别，为什么采用了 sse
10. docker 的知识？
11. vue 的响应式原理。
12. 虚拟 dom，diff 操作
13. 在前端基建上做了哪些优化，提高了前端的价值
14. tcp 和 udp 的区别
15. http2 有哪些特性
16. 为什么 tcp 是可靠的，他做了哪些事情
17. typescript 的泛型是什么
18. babel 解析过程
19. 响应式原理
20. vue3 的 proxy
21. git 的操作

# 2024.09.06 去哪儿

1. this.$message 怎么让他弹窗，组件的行为？？ 自定义指令吗？
2. value，会加 10000 次，vue 做了哪些优化
3. 异步任务队列？得讲清楚，源码
4. promise 实现 queue 队列，限制 5 个，会进行排队机制，有一个成功或者失败，就加入结果数组，全部执行完成后返回结果
5. 截图大概的流程。怎么设计的
6. 实时看板 SSE 降低的指标？？？降了多少
7. 新技术？
8.

# 2024.09.11 牵手

1. 手写事件触发器类（类似 vue 的事件监听绑定）
2. 这三年遇到的最大挑战
3. 聊项目
4. 微前端的遇到的困难、挑战，怎么解决的
5. 为啥要做截图服务？
6. 限流排队策略。为啥不用高并发
7. vuex 和 pinia 的区别
8.

# 2024.09.20 去哪儿二面

1. 介绍下截图服务。

# 2024.09.23 美团一面

1. vue 事件循环机制
2. diff 和 patch 操作具体过程。 没说好
3. 怎么理解虚拟 dom 就更好
4. 为什么虚拟 dom 就更快了，做了哪些优化
5. 为什么团队基于这个选择 vue3 框架
6. vue3 比 vue2 好在哪，列举三点。
   1. 详细说说这三点
      1. composition API
      2. vite 的优点
      3. diff 的优化
   2. composition API 相对于 Options API 的好处
   3. 为什么 vue2 Options API 就不好了。除了自己组织业务代码有没有更好的方案
   4. vite 怎么更好的，他的热更新是怎么做到更快的，相比于 webpack 他有哪些优势
7. 事件循环机制
8. 浏览器渲染机制。 -> 一帧中浏览器做了哪些行为
9. 页面渲染中，哪些进程、线程参与了，具体有哪些行为
10. 微前端为什么要用，框架升级和使用微前端没什么关系吧
11. 说一个使用微前端的最大的好处，怎么让你抉择使用它的
12. 为什么微前端就更好了
13. 怎么让你做这个重构的
14. 为什么选用了 vue3，怎么衡量这个收益比的。相当于团队要从新使用一个框架及其生态，这其中会占用一大部分人力去做，为什么选新的就更好
15.

# 2024.09.24 豆包一面

1. 看你写了参与组内项目的小工具和业务组件库的工作，能举例说明吗？
2. es+sse 的在线小工具
3. 能介绍个你觉得写的最复杂的业务组件吗？
4. 微前端的优劣势
5. 微前端详细原理
6. 微前端有哪些弊端呢？
7. 相比于 iframe 来说，有哪些优劣势
8. JS 隔离除了上述说的还有哪些方法 -> 没答出来
9. 前端的优化手段。越多越好
10. http2 都有哪些特性
11. 浏览器缓存，说的越详细越好
12. 浏览器的 xss 攻击知道吗？如何预防
13. 为什么 httpOnly 能预防
14. 还知道哪些浏览器攻击吗？
15. csrf 是什么？如何预防
16. sameSite 的特性 + csrf-token 的策略
17. 场景题目：前端和后端做登录页面时，如何预防 XSS 攻击和 csrf
18. 算法：斐波那契+数组合并+返回最大的斐波那契数的合并后的数组 -> hard 自创

# 2024.09.24 高德一面

1. 介绍下最复杂的业务，怎么去解决的
2. 介绍下微前端架构前后，升级完有什么差距。具体优劣势分析
3. SSE 升级有什么用
4. 掉数问题，怎么做优化的
5. sse 有什么用
6. 和 websocket 的区别
7. vue 双向绑定原理
8. vue 的常见优化手段
9. vue2 和 vue3 的区别
10. 手写：promise 结合 文件流的输出题目

```js
// 1、请实现一个promisify函数 ，负责将一个接收回调函数参数的函数转换成一个返回 Promise的函数

var fs = require('fs');
fs.readFile('input.txt', function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log('异步读取: ' + data.toString());
});

function promisify(fs.readFile) {
  // ...代码实现
  return function(path) {
    return new Promise(
       (resolve, reject) => {
         fs.readFile('input.txt', function (err, data) {
  if (err) {
    reject(err)
    return console.error(err);
  }
  resolve(data)
  console.log('异步读取: ' + data.toString());
});
        // let result, error
        // await fs.readFile(path, function (err, data) {
        //   if (err) {
        //     error = err
        //   }
        //   result = data
        // })

        // if (result) {
        //   resolve(result)
        // }
        // if (error) {
        //   reject(error)
        // }
      }
    )
  }
}

promisify(fs.readFile)('input.txt')
  .then((data) => {
    console.log('异步读取: ' + data.toString());
  })
  .catch((err) => {
    console.error(err);
  });


```

12. 手写： reduce
13. 手写：数组链式调用问题。

```js
// 3、如下代码所示，使用 find 函数实现链式调用

const data = [
  { userId: 8, title: 'title1' },
  { userId: 11, title: 'other' },
  { userId: 15, title: null },
  { userId: 19, title: 'title2' }
]
// 查找data中，符合where中条件的数据，并根据orderBy中的条件进行排序
const result = find(data)
  .where({
    title: /\d$/ // 这里意思是过滤出数组中，满足title字段中符合 /\d$/的项
  })
  .orderBy('userId', 'desc') // 这里的意思是对数组中的项按照userId进行倒序排列

Array.prototype.find = function (nums) {
  return nums
}

Array.prototype.where = function ({}) {
  const nums = this

  let result = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i].title?.test(reg)) {
      result.push(nums[i])
    }
  }
  return result
}
Array.prototype.orderBy = function (a, b) {
  const nums = this
  nums.sort((a, b) => {
    return b.userId - a.userId
  })

  return nums
}
```

# 2024.10.17 shopee

1. 快排的时间复杂度
2. 最好最坏是多少
3. 最坏是什么情况
4. nlogn 怎么计算出来的
5. 浏览器缓存
6. 500 个节点的完全二叉树，有多少个叶子节点
   ```js
   500 = n0(度为0，没有子节点，即叶子节点) + n1(度为1，只有一个子节点) + n2(度为2，有2个子节点)
   完全二叉树的 n1 只能为1。
   二叉树的性质：n_0 = n_2 + 1
   则有 500 = 2n_2 +2，n2 = 249
   则500 = n0 + 1 + 249,所以n0 = 250
   所以叶子节点为250个
   ```
7. csrf 攻击及其防御手段
8. 进程间的通信协议
9. 实时看板最有挑战的事
10. 京数通-微前端框架
11. 截图服务的-性能优化（限流）
12. lc 原题 679
13.

# 2024.10.21 快手-效率工程

1. 项目-实时看板。
1. 实时看板-有没有考虑降级策略
1. 如果有用户连接不上 SSE，如何去做
1. 如果还是用短轮询，如何去做优化
1. 有哪些优化手段、兜底策略
   1. 弱网情况
   2. 分钟级的，你们怎么保证用户每次都收到，没收到怎么做处理
   3.

# 2024.10.22 百度

1. 微前端和 iframe 的优劣势，为什么用微前端
2. 微前端除了接子应用，他还能用在哪些地方
3. 乾坤是怎么做隔离的。JS 隔离、css 隔离
4. html 文档流指的什么
5. 为什么最终选用了 SSE，相比于其他的他有哪些优势。
6. 不用 SSE 你会做哪些性能优化
7. SSE 到底优化了哪些指标，有没有具体衡量
8. 不用 SSE 还是用短轮询，你会怎么去优化，用尽所有优化手段
9. 截图服务背景
10. html2canvas 为什么能提高性能，怎么就优化了。
11. 限流是怎么做的
12. 如何做到高并发。
13. 除了限流还能有哪些手段，我理解这个是异步的，怎么尽可能的优化，所有手段
14. 还能怎么去做更好的优化
15. 服务端能拿到 UA 的信息吗
16. 截图服务的 QPS 是多少
17. 了解 SSR 和 CSG 吗
18. 有一个场景，怎么根据用户的输入（比如用户在 PC、手机端），然后分发去不同的页面
19. 题目

# 10.30 阿里

1. 自我介绍
2. 为什么做微前端，怎么就最终选定了乾坤
3. 几个微前端框架对比。
4. 几个框架之间的底层原理有什么区别
5. 微前端怎么做到 js 和 css 隔离的
6. 介绍下截图服务
7. 怎么和后端做交互的
8. 有什么优化吗？
9. 为什么用 html2canvas
10. 为什么能提高性能
11. html2canvas 的原理是什么
12. canvas 怎么就比原生的截图好了
13. 限流怎么做的？
14. 怎么判断出 dom 就可以截图了？
15. 你说的虚拟滚动，怎么结合截图进行滚动截图。
16. 具体的截图流程
17. 截完怎么发邮件，具体的流程，详细一点
18. 怎么把截图发给用户的
19. 介绍下实时看板
20. SSE
21. 为什么不用 websocket
22. 做了哪些操作保持系统稳定嘛
23. 三小时无操作，在大促期间怎么做
24. 长时间的 SSE 会导致内存升高吧，network 会有很多数据，如何处理
25. 降级到短轮询有什么问题
26. 为什么会降级，有具体的 case 吗
27. 网络原因的话，sse 和短轮询都会失败吧
28. 心跳检测是怎么做的
29. 心跳检测有什么用
30. vite 为什么比 webpack 快
31. webpack 也是动态加载路由吧，怎么就快了
32. 为什么 vite 是 no bundle 的机制
33. 为什么 vite 本地和生产支持了两种架构（es build 和 rollup），有什么区别。
34. webpack 的热更新原理和 vite 的区别
35. vite 怎么就比 webpack 动态加载了
36. 有哪些性能优化的手段
37. 懒加载的原理
38. 图片懒加载的原理
39. 路由懒加载的原理
    1. 按需加载，将组件分割成独立模块，通过 import() 动态导入实现。切换到相应路由，才动态加载
    2. 结合 webpack 的分包原理。可以进行 chunk 拆分
40. script 脚本中 async、defer 的具体有什么作用
41. 前端怎么做缓存的，具体的缓存策略
42. flex
43. 盒子模型。怪异盒子模型、标准盒子模型
44. 反问
