var length = 10
function fn() {
  return this.length + 1
}
var obj1 = {
  length: 5,
  test1: function () {
    return fn()
  }
}

const a = obj1.test1.call()
console.log('a:' + a) // 11
// obj1.test1.call()的执行，因为call没传参，导致this指向了window。返回 window.length + 1 = 11
const b = obj1.test1()
console.log('b:' + b) // 11
// obj1.test1() 也是返回的是fn()。也就是直接调用，相当于window调用，即window.length + 1 = 11
obj1.test2 = fn
const c = obj1.test2.call()
// obj1.test1.call()的执行，因为call没传参（同样在非严格模式下，undefined 会被隐式转换为全局对象）
console.log('c:' + c) // 11
const d = obj1.test2()
console.log('d:' + d) // 6
