// 总结：NOTE:apply、call、bind都是在Function的原型链上的，所有手写第一步都需要判断他们是不是函数

// NOTE:apply会在绑定后立即执行，且传参为一个数组
// 1.函数是设立在Function的原型链上的，传递一个参数context，代表环境，也就是this指向
// 2.首先判断是否this是否为函数，否则抛出异常
// 3.判断this指向是否传了，否则指向window。并创建一个临时函数fn，this复制给fn
// 4.需要返回一个result。判断调用apply的第二个参数，如果传了则进行透传（使用扩展运算符，因为传的是参数数组），即context.fn(...arguments[1])；如果没传，则直接调用fn，context.fn()
// 5.删除临时函数fn，并返回result
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

// NOTE:call会在绑定函数立即执行，且传参为参数列表
// 1.判断是否为函数，不为函数抛出异常
// 2.用symbol定义一个fn，保证唯一性
// 3.剔除出来要传递给fn的参数，去除第一个参数，命名为args
// 4.判断参数context的上下文环境，并把this赋值给上述定义的临时函数context[symbolFn]
// 5.定义result为context[symbolFn](...args)
// 6.删除上面的临时函数

Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  const symbolFn = Symbol() // 用symbol保证唯一，防止与上下文属性重合
  const args = [...arguments].slice(1)
  context = context || window
  context[symbolFn] = this
  const result = context[symbolFn](...args)
  delete context[symbolFn]
  return result
}
// NOTE:bind会返回一个函数，需手动执行。且bind可以分多次参数传递
// 1.判断是否为函数，不为函数抛出异常
// 2.保存一个this指向为self
// 3.定义一个剔除第一个参数的args
// 4.返回一个函数。这里有个特殊：函数可能是某个构造函数new出来的，所有多一个判断(this instanceof F)
// 5.是new构造的话，然后new self(...args, ...arguements)
// 6.不是的话，返回self.apply(context, args.concat(...arguements))
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw TypeError('error')
  }
  const self = this
  const args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, args.concat(...arguments))
  }
}

const obj = {
  name: 'obj'
}
function foo() {
  console.log(this.name)
}
foo.myApply(obj) // obj
