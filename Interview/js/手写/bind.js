// bind也是接收参数列表，返回一个函数，需要手动执行
Function.prototype.myBind = function (context) {
  // 判断调用着是否为函数
  if (typeof this !== 'function') {
    throw new Error('not a function')
  }
  const args = [...arguments].splice(1) // 参数
  const self = this // 保存一个this指向为self
  // 返回一个函数
  return function Fun() {
    // 函数可能是某个构造函数new出来的，所有多一个判断(this instanceof F)
    if (this instanceof Fun) {
      return new self(...args, arguments)
    }
    // return self.call(context, ...args, ...arguments)
    return self.apply(context, [...args, ...arguments])
  }
}

function greet(greeting, other) {
  console.log(`${greeting}, ${this.name} ${other}`)
}
const Person = {
  name: 'Lin'
}
greet.bind(Person, 'hi', '!')() // hi, Lin !
