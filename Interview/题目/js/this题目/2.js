// This is a JavaScript Quiz from BFE.dev

const obj = {
  dev: 'bfe',
  a: function () {
    return this.dev
  },
  b() {
    return this.dev
  },
  c: () => {
    return this.dev
  },
  d: function () {
    return (() => {
      return this.dev
    })()
  },
  e: function () {
    return this.b()
  },
  f: function () {
    return this.b
  },
  g: function () {
    return this.c()
  },
  h: function () {
    return this.c
  },
  i: function () {
    return () => {
      return this.dev
    }
  }
}

console.log(obj.a()) // bfe
console.log(obj.b()) // bfe
console.log(obj.c()) // undefined
console.log(obj.d()) // bfe
console.log(obj.e()) // bfe
console.log(obj.f()()) // undefined
console.log(obj.g()) // undefined
console.log(obj.h()()) // undefined
console.log(obj.i()()) // bfe

// 1. 箭头函数只会定义时有关系，无论怎么调取c函数，都是确定的
// 如 obj.i()()。this.dev依赖父级i函数的this指向，而obj.i()，隐式指向了obj，所以箭头函数this指向obj
// 2. 作用域只有函数作用域、块级作用域、全局
