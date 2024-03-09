Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  context = context || window
  context.fn = this
  var result = arguments[1] ? context.fn(...arguments[1]) : context.fn()
  delete context.fn
  return result
}

Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  var symbolFn = Symbol()
  var args = [...arguments].slice(1)
  context = context || window
  context[symbolFn] = this
  var result = context[symbolFn](...args)
  delete context[symbolFn]
  return result
}
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
    var self = this
    var args = [...arguments].slice(1)

    return function F() {
      if (this instanceof F) {
        return new self(...args, ...arguments)
      }
      return self.apply(context, args.concat(...arguments))
    }
  }
}

let obj = { name: 'a' }
function foo() {
  console.log(this.name)
}
foo.apply(obj)
foo.call(obj)
foo.bind(obj)()
