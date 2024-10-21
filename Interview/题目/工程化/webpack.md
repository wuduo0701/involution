# webpack 除了打包还能干什么

1. 模块加载
   Webpack 支持各种模块格式（如 CommonJS、ES6 模块等），并能够处理不同类型的模块（JavaScript、CSS、图片等）。
2. 资源管理
   Webpack 可以处理非 JavaScript 文件（如样式表、图像、字体等），通过 loaders 将它们转换为可以被浏览器识别的格式。
3. 代码分割
   Webpack 允许将代码分割成多个小块，以便按需加载，从而提高性能。可以通过动态导入实现更高效的加载。
4. 热模块替换（HMR）
   在开发过程中，Webpack 支持热模块替换，可以在不刷新页面的情况下更新模块，提升开发体验。
5. 优化和压缩
   Webpack 提供了多种优化手段，如压缩 JavaScript 和 CSS、去除未使用的代码、图片压缩等，帮助减小文件体积，提高加载速度。
6. 生成 HTML 文件
   通过 HtmlWebpackPlugin 插件，Webpack 可以自动生成 HTML 文件，并将打包后的资源自动插入到 HTML 中。
7. 环境变量管理
   Webpack 支持通过定义环境变量来管理不同环境（开发、生产等）的配置。
