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
console.log('a:' + a)
const b = obj1.test1()
console.log('b:' + b)
obj1.test2 = fn
const c = obj1.test2.call()
console.log('c:' + c)
const d = obj1.test2()
console.log('d:' + d)

// function Person() {}
// var friend = new Person()
// Person.prototype = {
//   constructor: Person,
//   name: 'Nicholas',
//   age: 29,
//   job: 'Software Engineer',
//   sayName: function () {
//     alert(this.name)
//   }
// }
// friend.sayName()

// setTimeout(() => console.log(1))
// new Promise((resolve) => {
//   resolve()
//   console.log(2)
// }).then(() => {
//   setTimeout(() => console.log(3))
//   console.log(4)
//   Promise.resolve()
//     .then(() => {
//       console.log(5)
//     })
//     .then(() => {
//       Promise.resolve().then(() => {
//         console.log(6)
//       })
//     })
// })
// console.log(7)

// 实现一个泛型函数，接受一个数组并返回该数组的第一个元素

// 字母数字间隔排开，但不破坏字母顺序和数字顺序
// "abc12d3456ef789gh" -> "a1b2c3d4e5f6g7h89"
