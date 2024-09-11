webpack 整个生命周期暴露了很多钩子函数，插件可以理解为基于这些钩子的自定义函数。在其原型上暴露了 apply 方法，如果特定钩子函数触发，就会调用插件去干我们想要干的事情。如`imagemin-webpack-plugin` 在 emit 阶段，把生成的资源，进行拦截、压缩图片、替换图片资源。达到压缩的目的

# plugin 解决了什么问题？常见的 plugin

> 插件
> plugin 赋予其各种灵活的功能，例如打包优化、资源管理、环境变量注入等，它们会运行在 webpack 的不同阶段（钩子 / 生命周期），贯穿了 webpack 整个编译周期
> 本质是一个具有 apply 方法 javascript 函数。
> Webpack 在启动时会调用插件的 apply 函数，并以参数方式传递核心对象 `compiler` ，以此为起点，插件内可以注册 `compiler` 对象及其子对象的钩子 Hook 回调

```js
class SomePlugin {
  apply(compiler) {
    // compiler  为 Hook 挂载的对象
    // thisCompilation 为 Hook 名称
    // tap 调用方式
    compiler.hooks.thisCompilation.tap('SomePlugin', (compilation) => {
      compilation.addModule(/* ... */)
    })
  }
}
```

## 生命周期钩子

初始化 option -> run 运行 -> complire 编译 -> 生成编译产物 compilation -> make 开始递归 build -> after-compile 编译完成 -> emit 输出编译产物到目录 -> after-emit 输出完成 -> done / failed

entry-option ：初始化 option
run 运行
compile： 真正开始的编译，在创建 compilation 对象之前
compilation ：生成好了 compilation 对象
make 从 entry 开始递归分析依赖，准备对每个模块进行 build
after-compile： 编译 build 过程结束
emit ：在将内存中 assets 内容写到磁盘文件夹之前
after-emit ：在将内存中 assets 内容写到磁盘文件夹之后
done： 完成所有的编译过程
failed： 编译失败的时候

## 插件源码举例

[imagemin-webpack-plugin 源码](./相关源码/imagemin-webpack-plugin.js)

1. 用于实现图像压缩的插件，提交 `emit` 时触发
2. 该钩子在 Webpack 完成代码构建与打包操作，准备将产物发送到输出目录之前执行
3. 关键优化：在将打包产物输出到目录时，调用了 `optimizeWebpackImages` 函数
   1. 读取产物列表 `compilation.assets` ；
   2. 调用优化函数 imagemin 压缩图片；
   3. 修改 compilation.assets，使用优化后产物替换原始产物。

```js
export default class ImageminPlugin {
  optimizeWebpackImages(throttle, compilation) {
    const {
      // 用于判断是否对特定文件做图像压缩操作
      testFunction,
      // 缓存目录
      cacheFolder
    } = this.options

    // 遍历 `assets` 产物数组
    return map(compilation.assets, (asset, filename) =>
      throttle(async () => {
        // 读取产物内容
        const assetSource = asset.source()
        if (testFunction(filename, assetSource)) {
          // 尝试从缓存中读取
          let optimizedImageBuffer = await getFromCacheIfPossible(
            cacheFolder,
            assetSource,
            () => {
              // 调用 `imagemin` 压缩图片
              return optimizeImage(assetSource, this.options)
            }
          )

          // 之后，使用优化版本替换原始文件
          compilation.assets[filename] = new RawSource(optimizedImageBuffer)
        }
      })
    )
  }
}
```

## 常见的插件

1. HtmlWebpackPlugin 打包生成一个 html 文件，并把打包生成的 js 模块引⼊到该 html 中
2. mini-css-extract-plugin 提取 CSS 到一个单独的文件中
