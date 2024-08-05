Function.prototype.myApply = function (context) {
  // 判断调用着是否为函数
  if (typeof this !== 'function') {
    throw Error('not a function')
  }
  context = context || window // 是否有调用方，否则为window（context为nul或者undefined时，挂载到window）
  // context = context || globalThis // 如果是node环境，则使用 globalThis
  const symbolFn = Symbol() // 定义唯一函数
  context[symbolFn] = this // 创建临时函数，this指向这个函数

  // 因为apply传参为数组，所以判断第二个参数是否为数组
  // 如是，则把所有参数传递并执行
  // 否则执行这个函数
  let result = Array.isArray(arguments[1])
    ? context[symbolFn](...arguments[1])
    : context[symbolFn]()
  delete context[symbolFn] // 删除临时函数

  return result
}
var a = 1
var obj = {
  a: 3
}
function foo() {
  var a = 2
  console.log(this.a) // 1
}
foo.myApply(obj) // 3

function sum(a, b) {
  return a + b
}
const context = {}
const args = [5, 10]
console.log(sum.myApply(context, args)) // 验证传参为数组
