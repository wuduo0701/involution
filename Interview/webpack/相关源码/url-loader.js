const loaderUtils = require('loader-utils')
const mime = require('mime')

module.exports = function (content) {
  const options = loaderUtils.getOptions(this)
  const limit = options.limit || 8192

  if (content.length < limit) {
    const mimetype = options.mimetype || mime.getType(this.resourcePath)
    return `module.exports = ${JSON.stringify(
      `data:${mimetype};base64,${content.toString('base64')}`
    )}`
  } else {
    const fileLoader = require('file-loader')
    return fileLoader.call(this, content)
  }
}

// 1. 读取源文件，如test，符合路径的文件会进行调用转化
// 2. 读取用户的配置options：如limit，小于多少才进行转化。进行转化：字符串拼接
// 3.
