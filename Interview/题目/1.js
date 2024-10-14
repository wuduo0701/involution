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

const a = obj1.test1.call() // 10
console.log('a:' + a)
const b = obj1.test1()
console.log('b:' + b)
obj1.test2 = fn
const c = obj1.test2.call()
console.log('c:' + c)
const d = obj1.test2()
console.log('d:' + d)

Promise.resolve(1)
.then(() => 2)
.then(3)
.then((value) => value * 3)
.then(Promise.resolve(4))
.then(console.log)
