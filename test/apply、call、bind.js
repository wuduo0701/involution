Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw TypeError('not function')
  }
  context = context || window
  const args = [...arguments].slice(1)
  let symbolFn = Symbol()
  context[symbolFn] = this

  let result = context[symbolFn](...args)
  delete context[symbolFn]
  return result
}
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context = context || window
  let symbolFn = Symbol()
  context[symbolFn] = this

  let result = arguments[1]
    ? context[symbolFn](...arguments[1])
    : context[symbolFn]()

  delete context[symbolFn]
  return result
}
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  const self = this
  const args = [...arguments].slice(1)
  return function fun() {
    if (this instanceof fun) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, [...args, ...arguments])
  }
}
let obj = {
  a: 1
}
var a = 2
let fn = function () {
  console.log(this.a)
}
fn.call(obj)
fn.myApply(obj)
fn.myCall(obj)
fn.myBind(obj)()
