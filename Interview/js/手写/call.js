Function.prototype.myCall = function (context) {
  // 判断调用着是否为函数
  if (typeof this !== 'function') {
    throw Error('not a function')
  }
  context = context || window // 是否有调用方，否则为window（context为nul或者undefined时，挂载到window）
  let symbolFn = Symbol(), // 定义唯一函数
    args = [...arguments].splice(1) // 参数，去除第一个参数（this上下文指向）
  context[symbolFn] = this // 创建一个临时函数fn，this复制给fn

  let result = context[symbolFn](...args) // 执行结果
  delete context[symbolFn] // 删除零食函数

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
foo.myCall(obj)

function greet(greeting, other) {
  console.log(`${greeting},${this.name} ${other}`)
}
let person = {
  name: 'Lin'
}
greet.myCall(person, 'hi', '!') // 验证传参-为参数列表有没有问题
