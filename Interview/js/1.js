// function testPerson(person) {
//   person.age = 52
//   person = {
//     name: '李四',
//     age: 18
//   }
//   return person
// }
// var p1 = {
//   name: '张三',
//   age: 23
// }
// var p2 = testPerson(p1)

// p1 = {
//   name: '张三',
//   age: 52
// }
// p2 = {
//   name: '李四',
//   age: 18
// }
// console.log(p1, p2) // 输出：{ name: '张三', age: 52 } { name: '李四', age: 18 }

// let a = {
//   value: 1,
//   valueOf() {
//     return this.value++ // return {}会报错
//   },
//   toString() {
//     return this.value++
//   },
//   [Symbol.toPrimitive]() {
//     console.log(222)
//     return this.value++
//   }
// }
// if (a == 1 && a == 2 && a == 3) {
//   console.log('true') // 输出true
// }
// var name = 'window'

// var person1 = {
//   name: 'person1',
//   foo1: function () {
//     console.log(this.name)
//   },
//   foo2: () => console.log(this.name),
//   foo3: function () {
//     return function () {
//       console.log(this.name)
//     }
//   },
//   foo4: function () {
//     return () => {
//       console.log(this.name)
//     }
//   }
// }

// var person2 = { name: 'person2' }

// person1.foo1() // person1 -> 隐式绑定
// person1.foo1.call(person2) // person2 -> 显示绑定

// person1.foo2() // window -> 箭头函数没有this指向，默认用父级作用域，父级作用域为window（person1对象没有块级作用域）
// person1.foo2.call(person2) // window -> 同理于上，箭头函数导致用的window作用域，call失效

// person1.foo3()() //window -> 返回的函数，在windows调用
// person1.foo3.call(person2)() // window -> 返回的函数，在windows调用
// person1.foo3().call(person2) // person2 -> 返回的函数，但是由于使用了call显示绑定

// person1.foo4()() // person1(箭头函数不绑定this, 上层作用域this是person1)
// person1.foo4.call(person2)() // person2 -> 先是给foo4这个方法绑定了一个this为person2  再次调用foo4()的时候为箭头函数 它的上层作用域被显示的绑定了一个person2
// person1.foo4().call(person2) //person1 -> 因为先执行了foo4 返回的结果是一个箭头函数 箭头函数是不可以绑定this的 所以当调用这个箭头函数的时候 以及寻找上层作用域 (上层找到person1)
for (var i = 1; i <= 5; i++) {
  ;(function (index) {
    setTimeout(function timer() {
      console.log(index)
    }, index * 1000)
  })(i)
}

/**
 * 隐式绑定题目
 * NOTE:口诀：this 永远指向最后调用它的那个对象
 */
// 在 doFoo 内部，this 指向 obj2，因为 doFoo 是作为 obj2 的方法调用的。
// doFoo 内部的第一个 console.log(this) 会打印 obj2，即 { a: 3, doFoo: [Function: doFoo] }。
// 然后调用 fn()，这里的 fn 是 obj.foo，即 foo 函数。
// 当调用 fn() 时，foo 内部的 this 没有绑定到任何对象，所以默认指向全局对象（在浏览器中是 window，在 Node.js 中是 global）。在严格模式下，this 会是 undefined。
function foo() {
  console.log(this.a)
}
function doFoo(fn) {
  console.log(this)
  fn() // 没有绑定this，则指向window
}
var obj = { a: 1, foo }
var a = 2
var obj2 = { a: 3, doFoo }

obj2.doFoo(obj.foo)

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
