# Cookie

> 解决 HTTP 的无状态请求的问题

- 用于会话状态管理
- 个性化设置（如用户自定义设置、主题等）
- 分析用户行为

## 生命周期

1. Expires 即过期时间点
2. max-age 过期相对时间

## 安全相关

1. secure 只能 HTTPS 协议传输 cookie
2. HttpOnly。预防 XSS 攻击
3. SameSite
   1. Strict 严格模式。完全禁止第三方请求携带 Cookie
   2. Lax。只能在 get 方法提交表单况
   3. None。请求会自动携带上 Cookie

## 缺点

1. 容量缺陷。大小限制 4k。
2. 性能缺陷。每次请求都会带上
3. 安全缺陷。以纯文本的形式在浏览器和服务器直接传递

# webStorage

> 挂载在 window 对象下
> 是本地存储，数据不是由服务器请求传递的

## localStorage

> 永久存储，永不失效，除非手动删除

## sessionStorage

> 会话级别的缓存。标签关闭，或者关闭浏览器都会导致缓存消失

## indexedDB

> 非关系型数据库，使用的事 noSQL，数据形式使用的是 json

# cookie 和 session 的区别

1. Cookie 数据存放在客户的浏览器上，Session 数据放在服务器上
2. Cookie 不是很安全，Session 更加安全
3. Cookie 容量更小。4KB，session 更大，有 5MB。
4. 有效期。cookie 有过期时间，sessionStorage 仅在当前浏览器窗口关闭前有效。
