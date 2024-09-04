## loader 是什么

> 解析器
> 用于对模块的"源代码"进行转换，在 import 模块时预处理文件
> 默认只支持对 js 和 json 文件打包。对现代的 ts、scss 等就无能为力，需要用到各种 loader
> 当 webpack 碰到不识别的模块的时候，webpack 会在配置的中查找该文件解析规则

## 特性

1. `loader` 支持链式调用，执行是以相反顺序。如定义是：`style-loader  -> scss-loader`，则执行顺序为：`scss-loader -> style-loader`
2. loader 可以是同步的，也可以是异步的
3. 插件(plugin)可以为 loader 带来更多特性
4. loader 运行在 Node.js 中，并且能够执行任何操作。

可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言翻译和更多其他特性

## 常见的 loader

1. css-loader 允许将 css 文件通过 require 的方式引入，并返回 css 代码
2. less-loader 处理 less
3. sass-loader 处理 sass
4. style-loader 把 CSS 插入到 DOM 中
5. file-loader 分发文件到 output 目录并返回相对路径
6. url-loader 和 file-loader 类似，但是当文件小于设定的 limit 时可以返回一个 Data Url
7. html-minify-loader 压缩 HTML
8. babel-loader 用 babel 来转换 ES6 文件到 ES

## 编写 loader

> 本质是一个函数，将相关类型的代码给它，根据我们规则，经过它的一系列加工处理后还给我们加工好的代码。
> 遵循原则：单一原则、链式调用、统一原则（输入和输出要一致）

1. 本质为函数。接收三个参数
   1. source：资源输入。如果是第二个，则是前一个 loader 执行的结果
   2. sourceMap: 可选参数，代码的 sourcemap 结构；
   3. data: 可选参数
2. 函数中有异步操作或同步操作，异步操作通过 this.callback 返回，返回值要求为 string 或者 Buffer
3. 需要 return 函数执行的结果，到第二个继续执行

```js
module.exports = function (source) {
  const content = doSomeThing2JsString(source)

  // 如果 loader 配置了 options 对象，那么this.query将指向 options
  const options = this.query

  // 可以用作解析其他模块路径的上下文
  console.log('this.context')

  /*
   * this.callback 参数：
   * error：Error | null，当 loader 出错时向外抛出一个 error
   * content：String | Buffer，经过 loader 编译后需要导出的内容
   * sourceMap：为方便调试生成的编译后内容的 source map
   * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
   */
  this.callback(null, content) // 异步
  return content // 同步
}
```
