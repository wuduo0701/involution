# 微前端介绍及其应用

## 一、微前端概念及其使用场景

### 概念

> 微前端的概念是由 ThoughtWorks 在 2016 年提出的，它借鉴了微服务的架构理念，核心在于将一个庞大的前端应用拆分成多个独立灵活的小型应用，每个应用都可以独立开发、独立运行、独立部署，再将这些小型应用融合为一个完整的应用；或者将原本运行已久、没有关联的几个应用融合为一个应用。微前端既可以将多个项目融合为一，又可以减少项目之间的耦合，提升项目扩展性，相比一整块的前端仓库，微前端架构下的前端仓库倾向于更小更灵活。有一个基座应用（主应用），来管理各个子应用的加载和卸载。

注：微前端不是指具体的库，不是指具体的框架，不是指具体的工具，而是一种理念与架构模式。
![alt text](image.png)
图 1.1 微前端架构图

微前端的核心三大原则就是：**独立运行、独立部署、独立开发**  
https://micro-frontends.org/

### 优点

微前端的优点主要体现在以下几个方面：

- 模块化开发：微前端将前端应用程序拆分成多个小型应用程序，每个小型应用程序都是一个独立的模块，可以独立开发和测试，以提高开发效率和代码质量；
- 技术栈无关性：每个小型应用程序可以使用不同的技术栈和框架，不受限于单一的技术栈，以提高灵活性和可扩展性；
- 独立部署和升级：每个小型应用程序可以独立部署和升级，不会影响整个应用程序的运行，以提高部署和升级的效率和可靠性；
- 团队自治性：每个小型应用程序可以由不同的团队开发和维护，不会互相干扰，以提高团队协作效率和开发质量；
- 更好的性能和用户体验：微前端可以将前端应用程序拆分成多个小型应用程序，只加载必要的模块和组件，以提高应用程序的性能和用户体验；
- 可复用性和可测试性：每个小型应用程序都是一个独立的模块，可以被其他应用程序复用，也可以独立测试和调试，以提高代码质量和可维护性。

场景举例：
在我们研发日常工作中需要使用非常多的研发系统，例如：代码管理（coding）、代码构建（jdos 部署）、项目管理、应用发布、测试管理等等。站在整个公司研发的角度考虑，最好的产品形态就是将所有的研发系统都放置同一个产品内，用户是无法感知他在使用不同的产品，对于用户而言就是单个产品不存割裂感，也不需要去学习多个平台，仅仅需要学习和了解整个主应用产品即可（如：行云、泰山）。

以运营、分析师等使用我们数据平台的用户来说。那最好就是有一个平台入口，在这里能完整的满足他们所有的日常提数+分析需求。

参考链接：  
行云：http://xingyun.jd.com/codingRoot  
行云 npm：https://npm.m.jd.com/browse/keyword/jmodule  
行云微前端架构方式：https://jmodule.jd.com/guide/  
开源框架：https://github.com/jd-opensource/jmodule/tree/main  
泰山：https://taishan.jd.com/ducc/web/nswork?nsId=10109&nsName=adskanban_web&cId=65739&cName=adskanban_web_config&envId=95090&envName=online&defAppId=9736&dataType=0

## 二、架构模式及其框架

### 架构模式

#### 基于路由的微前端

将前端应用程序拆分成多个小型应用程序，并根据路由规则将它们组合成一个完整的应用程序。每个小型应用程序都有自己的路由和页面组件，可以独立开发和部署。这种方式通常使用前端框架的路由机制来实现。

#### 基于组件的微前端

将前端应用程序拆分成多个小型应用程序，并通过组件化的方式将它们组合成一个完整的应用程序。每个小型应用程序都有自己的组件和数据模型，可以独立开发和部署。这种方式通常使用 Web Components、React、Vue 等前端框架的组件化机制来实现。

#### 基于消息的微前端

将前端应用程序拆分成多个小型应用程序，并通过消息机制来进行通信和协作。每个小型应用程序都有自己的状态和数据模型，可以通过事件和消息来进行共享和协作。这种方式通常使用 Redux、MobX 等状态管理工具来实现数据共享。

#### 基于 API 的微前端

将前端应用程序拆分成多个小型应用程序，并通过 API 来进行通信和协作。每个小型应用程序都有自己的 API 接口和数据模型，可以通过 API 来进行共享和协作。这种方式通常使用 RESTful API、GraphQL 等 API 技术来实现数据共享。

### 微前端框架

#### 乾坤（qiankun）

> qiankun 孵化自蚂蚁集团， 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。
> https://qiankun.umijs.org/zh

1. 主子应用分离：乾坤将应用分为主应用和多个子应用。主应用负责全局的布局和导航，子应用则负责各自独立的功能模块。
2. 路由拦截：乾坤通过监听浏览器路由变化，来决定何时加载或卸载某个子应用。
3. JS 沙箱：为了防止子应用之间的全局变量污染，乾坤为每个子应用创建了一个 JavaScript 沙箱环境。这样，子应用内的全局变量和事件不会影响到其他子应用或主应用。
4. 资源加载：乾坤动态加载子应用的资源（如 JS、CSS），并确保资源在正确的时间被加载和执行。
5. 生命周期管理：乾坤定义了一套生命周期钩子，用于管理子应用的加载、挂载、更新和卸载过程。
6. 样式隔离：为了避免 CSS 冲突，乾坤提供了样式隔离的机制，比如使用 CSS Modules 或 Shadow DOM。
7. 通信机制：乾坤提供了主应用和子应用之间的通信机制，允许它们之间传递消息和数据。

#### 无界（wujie）

> 无界孵化自腾讯，主要通过继承 iframe 的优点，解决 iframe 的缺点。
> https://wujie-micro.github.io/doc/

#### micro app

> micro-app 出自京东集团。它并没有沿袭 single-spa 的思路，而是借鉴了 WebComponent 的思想，通过 CustomElement 结合自定义的 ShadowDom，将微前端封装成一个类 WebComponent 组件，从而实现微前端的组件化渲染。也是目前最轻量级的微前端框架，对系统的侵入最小，代价最低。
> https://micro-zoe.github.io/micro-app/

总结：微前端架构旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用(Frontend Monolith)后，随之而来的应用不可维护的问题

## 三、与传统 Iframe 的区别

Iframe 介绍：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe
iframe 应用：http://pre.flow.jd.com/crm/ad_assign
微前端的应用：http://jst2.jd.com/crm/views/ad_assign
postmessage 通信：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
iframe 是一种使用 HTML 结构的内嵌框架，是浏览器提供的隔离方案。借助此框架，可以将一个 HTML 文档插入另一个 HTML 文档中并使其显示为网页.它以<iframe>标记表示。

<iframe
  id="inlineFrameExample"
  title="Inline Frame Example"
  width="300"
  height="200"
  src="url"
>
</iframe>
iframe最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、JS隔离这类问题统统都能被完美解决。但这既是优点，也是缺点。由于它的隔离性导致其并不适合作为加载子应用的加载器。这就带来了以下的弊端：
- url不同步：浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用
- UI 不同步，DOM 结构不共享：弹窗只能在iframe内部展示，无法覆盖全局
- 全局上下文完全隔离，内存变量不共享：iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
- 加载慢：使用 Iframe 会大幅增加内存和计算资源，因为 iframe 内所承载的页面需要一个全新并且完整的文档环境，每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。
- 通信非常困难：只能通过 postmessage 传递序列化的消息，且非常繁琐
window.parent.postMessage({ switchScreen: this.state.maxScreen }, "\*");

## 四、具体应用实践

> 乾坤参考：https://qiankun.umijs.org/zh/guide/tutorial

运行原理步骤一：监听路由变化
步骤二：匹配子应用
步骤三：加载子应用
步骤四：渲染子应用

主应用-京数通技术栈：Vue3 + Antdv
安装 qiankun + 主应用中注册微应用
import { registerMicroApps, start } from 'qiankun'; // 加载相应依赖

// 注册子应用
registerMicroApps([
{
name: 'real-jst', // 实时看板
entry: microAppUrl.APP_SUB_REAL, // //jkanban.jd.com/
activeRule: '/real', // 匹配路由
container: '#subapp-container', // 子应用挂载的容器 ID
props: {
primaryColor: '#3075ff',
echartsColors,
routerBase: item.activeRule, // 下发路由路径前缀
getGlobalState: store.getGlobalState // 下发全局 store
}
},
{
name: 'crm-jst', // CRM
entry: microAppUrl.APP_SUB_CRM, // //j-crm.jd.com/
activeRule: '/crm' // 匹配路由
}
]);

start(); // 启动主应用
nginx 相应配置

# access 日志打印 cookie 信息

log_format jstmain escape=json '{"history_user":"$http_jstusererp","jst_user":"$http_erp","erp":"$cookie_erp","tab_id":"$http_tabid","jst_version":"$http_jst_version","timestamp":"$time_iso8601","uri":"$uri","referer":"$http_referer","request":"$request","args":"$args","status":"$status","app_key":"$http_appkey","req_body":"$request_body","resp_body":"$resp_body","size":"$body_bytes_sent","ua":"$http_user_agent","cookie":"$http_cookie","real_address":"$http_x_real_ip","remote_addr":"$remote_addr","http_x_forwarded_for":"$http_x_forwarded_for","domain":"$http_host","req_time":"$request_time","ip":"$http_x_forwarded_for","ups_status":"$upstream_status","ups_addr":"$upstream_addr","ups_res_time":"$upstream_response_time","yn_dynamic_refresh":"$http_yndynamicrefresh","jst-authorization":"$http_jst_authorization","jst_embed_access_token":"$http_jst_embed_access_token","jst_embed_access_origin":"$http_jst_embed_access_origin"}';

map $http_cookie $cookie_erp {
"~\*ads_app_user_erp=([^;]+)" $1;
}

# CRM 商机管理分流

upstream opp-manage-stream {
server dlaudit8-dlauditv8online1.daili.svc.ht2.n.jd.local weight=10 max_fails=2 fail_timeout=30s;
server dlaudit8-dlauditv8online2.daili.svc.lf10.n.jd.local weight=10 max_fails=2 fail_timeout=30s;
}

server {
listen 80;
server*name jst2.jd.com;
access_log /export/access_80.log jstmain;
error_log /export/error.log error;
location / {
try_files $uri $uri/ /index.html;
        root /www/wwwroot/;
         # 设置html禁用缓存
        if ($request_filename ~* ._.(html|htm|json)$) {
            expires -1s;
            add_header Cache-Control "no-cache, no-store";
        }
        if ($request_filename ~_ .\_.(gif|jpg|jpeg|png|bmp|swf)$) {
expires 30d;
}
} # 实时看板的接口代理地址
location /realApi/ {
proxy_buffering off;
proxy_connect_timeout 80s;
proxy_read_timeout 180;
proxy_send_timeout 6000;
proxy_pass http://j-kanban.jd.com/;
access_by_lua_block {
if ngx.var.uri == "/realApi/kanban/one_min" then
local json_data = "{"
json_data = json_data .. "\"timestamp\": \"" .. (ngx.var.time_iso8601 or "") .. "\","
json_data = json_data .. "\"domain\": \"" .. (ngx.var.host or "") .. "\","
json_data = json_data .. "\"uri\": \"" .. (ngx.var.uri or "") .. "\","
json_data = json_data .. "\"args\": \"" .. (ngx.var.args or "") .. "\","
json_data = json_data .. "\"erp\": \"" .. (ngx.var.cookie_erp or "") .. "\","
json_data = json_data .. "\"referer\": \"" .. (ngx.var.http_referer or "") .. "\","
json_data = json_data .. "\"req_body\": \"" .. (ngx.var.request_body or "") .. "\","
json_data = json_data .. "\"resp_body\": \"" .. (ngx.var.resp_body or "") .. "\","
json_data = json_data .. "\"ip\": \"" .. (ngx.var.http_x_forwarded_for or "") .. "\","
json_data = json_data .. "\"ups_status\": \"" .. (ngx.var.upstream_status or "") .. "\","
json_data = json_data .. "\"ups_res_time\": \"" .. (ngx.var.resp_body or "") .. "\""
json_data = json_data .. "}"
ngx.log(ngx.ERR, json_data)
end
}
} # 实时看板 DUCC
location /ducc_all/ {
proxy_pass http://ducc.jd.local/v1/namespace/adskanban_web/config/adskanban_web_config/profiles/online;
} # 实时看板埋点
location /point/ {
proxy_pass http://log-ads.jd.com/;
} # CRM 的接口代理地址
location /crmApi/ {
proxy_buffering off;
proxy_connect_timeout 75s;
proxy_read_timeout 240;
proxy_send_timeout 6000;
proxy_pass http://adscrm-online.adspros.svc.lf06.n.jd.local/;
body_filter_by_lua '
local zlib = require("zlib")
if type(ngx.arg[1]) == "string" then
local resp_body = string.sub(ngx.arg[1], 1, 5000000)
ngx.ctx.buffered = (ngx.ctx.buffered or "") .. resp_body
if ngx.arg[2] then
local inflate = zlib.inflate()
local ok, decoded = pcall(inflate, ngx.ctx.buffered)
ngx.var.resp_body = ok and decoded or ngx.ctx.buffered
end
else
ngx.var.resp_body = ""
end';
} # CRM-ducc 配置中心
location /ducc_config {
proxy_pass http://ducc.jd.local/v1/namespace/CRM_Web/config/ducc_config/profiles/master;
}
location /ducc_frequent {
proxy_pass http://ducc.jd.local/v1/namespace/CRM_Web/config/ducc_frequent/profiles/master;
} # CRM-商机模块（广告平台部后端）
location /business/ {
proxy_buffering off;
proxy_connect_timeout 75s;
proxy_read_timeout 240;
proxy_send_timeout 6000;
proxy_pass http://opp-manage-stream/;
body_filter_by_lua '
local zlib = require("zlib")
if type(ngx.arg[1]) == "string" then
local resp_body = string.sub(ngx.arg[1], 1, 5000000)
ngx.ctx.buffered = (ngx.ctx.buffered or "") .. resp_body
if ngx.arg[2] then
local inflate = zlib.inflate()
local ok, decoded = pcall(inflate, ngx.ctx.buffered)
ngx.var.resp_body = ok and decoded or ngx.ctx.buffered
end
else
ngx.var.resp_body = ""
end';
}
}

一旦浏览器的 url 发生变化，便会自动触发 qiankun 的匹配逻辑，所有 activeRule 规则匹配上的微应用就会被插入到指定的 container 中，同时依次调用微应用暴露出的生命周期钩子。
子应用-实时看板技术栈：React + Antd
在 src 目录新增 public-path.js：
if(window.**POWERED_BY_QIANKUN**){ **webpack_public_path** =window.**INJECTED_PUBLIC_PATH_BY_QIANKUN**;}
设置 history 模式路由的 base
<BrowserRouter basename={window.**POWERED_BY_QIANKUN** ? '/real' : '/'}>
修改 index.js，增加生命周期钩子。并修改 dom，为了避免根 id#root 与其他的 DOM 冲突，需要限制查找范围。
import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 渲染
function render(props) {
const { container } = props;
ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.**POWERED_BY_QIANKUN**) {
render({});
}

// 初始化
export async function bootstrap() {
console.log('[react16] react app bootstraped');
}
// 挂载
export async function mount(props) {
console.log('[react16] props from main framework', props);
render(props);
}
// 卸载
export async function unmount(props) {
const { container } = props;
watermark.set(""); // 卸载水印，防止影响 jst
ReactDOM.unmountComponentAtNode(container ? container.querySelector("#root") : document.querySelector("#root"));
console.log("[react16] kanban app has been unmounted");
}

nginx 打包配置
server {
listen 80;

# 定义访问的域名

server_name jkanban.jd.com;
access_log /export/jkanban.jd.com.log main;
error_log /export/jkanban.jd.com.error.log;

# 只允许京数通的线上环境访问(安全限制)

set $cors_origin "";
  if ($http*origin ~* "^http://jst.jd.com$") {
set $cors_origin $http_origin;
  }
  if ($http*origin ~* "^http://jst2.jd.com$") {
set $cors_origin $http_origin;
  }
  if ($http*origin ~* "^https://jst.jd.com$") {
set $cors_origin $http_origin;
  }
  if ($http*origin ~* "^https://jst2.jd.com$") {
set $cors_origin $http_origin;
  }
  if ($http_origin ~\* "^http://master.jst.jd.com$") {
set $cors_origin $http_origin;
}

# 允许跨域（内嵌 jst2.0 微服务改造）

add_header Access-Control-Allow-Origin $cors_origin;
add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
add_header Access-Control-Allow-Credentials true;
add_header Access-Control-Allow-Private-Network true;

location / {
try*files $uri $uri/ /index.html;
    root /www/wwwroot/jkanban.jd.com/;
    ## html不缓存 
    if ($request_filename ~* .\_\.(htm|html)$) {
expires -1s;
add_header Cache-Control "no-cache, no-store";

      ## location中的add_header会覆盖sever的，需要重新加上
      add_header Access-Control-Allow-Origin $cors_origin;
      add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
      add_header Access-Control-Allow-Credentials true;
      add_header Access-Control-Allow-Private-Network true;
    }
    if ($request_filename ~* .*.(gif|jpg|jpeg|png|bmp|swf)$) {
      expires 30d;
    }

}

# 请求后端接口转发规则(避免与 api 重名)

location /realApi/ {
proxy_buffering off;
proxy_connect_timeout 80s;
proxy_read_timeout 180;
proxy_send_timeout 6000;
proxy_pass http://j-kanban.jd.com/;
}
}
子应用-CRM 技术栈：Vue2 + ElementUI
在 src 目录新增 public-path.js
if(window.**POWERED_BY_QIANKUN**){ **webpack_public_path** =window.**INJECTED_PUBLIC_PATH_BY_QIANKUN**;}
设置 history 模式路由的 base
export default new Router({
mode: 'history',
base: window.**POWERED_BY_QIANKUN** ? '/crm/' : process.env.BASE_URL,
routes: [
{
path: '/views/no_auth', // 无权限页
component: () => import('@/views/no_page/no_auth.vue')
},
.....
]
})
修改 index.js，增加生命周期钩子。并修改 dom，为了避免根 id#root 与其他的 DOM 冲突，需要限制查找范围。
import './public-path';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';

Vue.config.productionTip = false;

let instance = null

function render(props: any = {}) {
const { container } = props
instance = new Vue({
router,
store,
render: (h) => h(app)
}).$mount(container ? container.querySelector('#app') : '#app')
}
// 独立运行时
if (!window.**POWERED_BY_QIANKUN**) {
render()
}

export async function bootstrap() {
console.log('[vue] micro crm app bootstraped')
}
export async function mount(props) {
console.log('[vue] props from main framework', props)
render(props)
}
export async function unmount() {
console.log('[vue] micro crm app has been unmounted')
instance.$destroy()
  instance.$el.innerHTML = ''
instance = null
streamJDJST()
}
打包配置修改（vue.config.js）：
const { name } = require('./package');
module.exports = {
devServer: {
headers: {
'Access-Control-Allow-Origin': '\*',
},
},
configureWebpack: {
output: {
library: `${name}-[name]`,
libraryTarget: 'umd', // 把微应用打包成 umd 库格式
jsonpFunction: `webpackJsonp_${name}`, // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
},
},
};
nginx 配置
server {
listen 80;

# 定义访问的域名

server_name j-crm.jd.com;
access_log /export/access_80.log crmmain;
error_log /export/error_80.log;

# 只允许京数通的线上环境访问(安全限制)

set $cors_origin "";
  if ($http*origin ~* "^http://jst.jd.com$") {
set $cors_origin $http_origin;
  }
  if ($http*origin ~* "^http://jst2.jd.com$") {
set $cors_origin $http_origin;
  }
  if ($http*origin ~* "^https://jst.jd.com$") {
set $cors_origin $http_origin;
  }
  if ($http*origin ~* "^https://jst2.jd.com$") {
set $cors_origin $http_origin;
  }
  if ($http_origin ~\* "^http://master.jst.jd.com$") {
set $cors_origin $http_origin;
}

# 允许跨域（内嵌 jst2.0 微服务改造）

add_header Access-Control-Allow-Origin $cors_origin;
add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
add_header Access-Control-Allow-Credentials true;
add_header Access-Control-Allow-Private-Network true;

# 限制只有大运营线上地址才能 Iframe

add_header Content-Security-Policy "frame-ancestors admin.ads.jd.com";

location / {
try*files $uri $uri/ /index.html;
    root /www/wwwroot/;
    autoindex off;
    # html不缓存 
    if ($request_filename ~* .\_\.(htm|html|js|css)$) {
expires -1s;
add_header Cache-Control "no-cache, no-store";

      # 允许跨域（内嵌jst2.0微服务改造）
      # location中的add_header会覆盖sever的，需要重新加上
      add_header Access-Control-Allow-Origin $cors_origin;
      add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
      add_header Access-Control-Allow-Credentials true;
      add_header Access-Control-Allow-Private-Network true;
      # 限制只有大运营才能Iframe
      add_header Content-Security-Policy "frame-ancestors admin.ads.jd.com";
    }
    if ($request_filename ~* .*.(gif|jpg|jpeg|png|bmp|swf)$) {
      expires 30d;
    }

}
set $resp_body "";

# 请求后端接口转发规则

location /crmApi/ {
proxy_buffering off;
proxy_connect_timeout 75s;
proxy_read_timeout 240;
proxy_send_timeout 6000;
proxy_pass http://adscrm-online.adspros.svc.lf06.n.jd.local/;
body_filter_by_lua '
local zlib = require("zlib")
if type(ngx.arg[1]) == "string" then
local resp_body = string.sub(ngx.arg[1], 1, 5000000)
ngx.ctx.buffered = (ngx.ctx.buffered or "") .. resp_body
if ngx.arg[2] then
local inflate = zlib.inflate()
local ok, decoded = pcall(inflate, ngx.ctx.buffered)
ngx.var.resp_body = ok and decoded or ngx.ctx.buffered
end
else
ngx.var.resp_body = ""
end';
}
.....
}
