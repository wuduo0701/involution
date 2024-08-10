// new的过程
// 1. 创建一个新对象，该对象的原型指向构造函数的原型
// 2. 调用该构造函数，构造函数的 this 指向新生成的对象
// 3. 判断是否有返回值，如果有返回值且返回值是一个对象或一个方法，则返回该值；否则返回新生成的对象

function myNew(Fun, ...args) {
  let obj = Object.create(Fun.prototype)
  let result = Fun.apply(obj, args)
  return result instanceof Object ? result : obj
}

function Person(name) {
  this.name = name
}
Person.prototype.say = function () {
  console.log('hello: ', this.name)
}

const person = myNew(Person, 'Alice')
console.log(person.name) // 应输出 'Alice'
console.log(person instanceof Person) // 应输出 true
person.say()

function CustomObject(value) {
  this.value = value
  return { custom: 'object' } // 显式返回一个对象
}

const obj = myNew(CustomObject, 'value')
console.log(obj) // 应输出 { custom: 'object' }
