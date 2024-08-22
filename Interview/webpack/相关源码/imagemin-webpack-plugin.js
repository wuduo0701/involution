// 插件 imagemin-webpack-plugin 源码
// https://github1s.com/Klathmon/imagemin-webpack-plugin/blob/master/src/index.js

export default class ImageminPlugin {
  constructor(options = {}) {
    // init options
  }

  apply(compiler) {
    // ...
    const onEmit = async (compilation, callback) => {
      // ...
      await Promise.all([
        ...this.optimizeWebpackImages(throttle, compilation),
        ...this.optimizeExternalImages(throttle)
      ])
    }

    compiler.hooks.emit.tapAsync(this.constructor.name, onEmit)
  }

  optimizeExternalImages(throttle) {}

  // 关键优化
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
