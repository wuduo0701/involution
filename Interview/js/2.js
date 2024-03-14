// function Person(name, age, job) {
//   this.name = name
//   this.age = age
//   this.job = job
//   this.sayName = function () {
//     alert(this.name)
//   }
// }
// var person = new Person('ljh', 24, 'Engineer')

// console.log(person.constructor == Person) // person是Person函数对象构造出来的实例，通过constructor构造器链接
// console.log(Person.prototype) // 对象都有一个原型
// console.log(person.__proto__) // 对象都有一个原型

// console.log(person.__proto__ == Person.prototype) // 实例通过__proto__链接到对象的原型

// console.log(Person.prototype.__proto__) // Person这个函数对象是通过Function: Object构造出来的函数对象实例，所以Person本身也是实例，可以通过__proto__链接上层
// console.log(Person.prototype.__proto__.__proto__) // 直至链接到顶层对象null
// console.log(typeof Person.prototype)
// console.log(Person.__proto__)
// console.log(Function.prototype)
// console.log(person.__proto__)
// console.log(person.__proto__ === Person.prototype)
// console.log(person.__proto__)
// console.log(Person.__proto__ === Function.prototype)
// console.log(Function.__proto__ === Function.prototype) // Function 也是对象函数，也是通过new Function()创建，所以Function.__proto__指向Function.prototype。

// console.log(typeof Function.prototype) // function（函数对象） -- 这是顶层的构造函数，通过这个构造函数构建了根构造器Object以及其他自身创建的函数等
// console.log(typeof Person.prototype) // object（普通对象） --
// console.log(typeof Object.prototype)

// console.log(Person.prototype.__proto__ === Object.prototype)
// console.log(Object.prototype.__proto__ === null)

// console.log(Function.prototype.__proto__)
// console.log(Object.prototype)
// console.log(Function.prototype)
// console.log(Object.__proto__)
// console.log(typeof Function.prototype)
// console.log(typeof Object.__proto__)
/**
 * 原型链继承
 */
// function Animal() {
//   this.color = ['red']
// }
// function Dog(name) {
//   this.name = name
// }
// var dogOld = new Dog('dogOld')
// console.log(dogOld.constructor) // [Function: Dog]
// Dog.prototype = new Animal()
// var dog1 = new Dog('dog1')
// var dog2 = new Dog('dog2')
// console.log(dog1.constructor) // [Function: Animal]

// console.log(dog1.name)
// console.log(dog1.color)

// dog2.color.push('yellow')
// console.log(dog1.color) // ["red", "yellow"]
// console.log(dog2.color) // ["red", "yellow"]

// console.log(dog1 instanceof Dog) // true
// console.log(dog1 instanceof Animal) // true

/**
 * 构造函数继承
 */
// function Animal(kind) {
//   this.kind = kind
//   this.colors = ['red', 'blue']
//   this.eat = function () {
//     console.log(this.name + ' is eating!')
//   }
// }
// Animal.prototype.eat = function () {
//   console.log(this.name + ' is eating!')
// }
// function Dog(name, kind) {
//   this.name = name
//   Animal.call(this, kind)
// }

// var dog1 = new Dog('dog1', 'dog')
// var dog2 = new Dog('dog2', 'dog')
// console.log(dog1)
// console.log(dog2)
// dog1.eat()

/**
 * 组合（原型链，构造函数）继承
 */
// function Animal(kind) {
//   this.kind = kind
// }
// Animal.prototype.eat = function () {
//   console.log(this.name + ' is eat')
// }
// function Dog(name, kind) {
//   this.name = name
//   Animal.call(this, kind)
// }
// Dog.prototype = new Animal()

// var dog1 = new Dog('dog1', 'dog')
// var dog2 = new Dog('dog2', 'dog')

// console.log(dog1)
// console.log(dog2)
// dog1.eat()

/**
 * 组合（原型链，构造函数）继承
 */
// function Animal(kind) {
//   this.kind = kind
//   this.color = ['red']
// }
// Animal.prototype.eat = function () {
//   console.log(this.name + ' is eat')
// }
// function Dog(name, kind) {
//   this.name = name
//   Animal.call(this, kind)
// }
// Dog.prototype = Object.create(Animal.prototype)
// Dog.prototype.constructor = Dog
// var dog1 = new Dog('dog1', 'dog')
// var dog2 = new Dog('dog2', 'dog')
// console.log(dog1)
// console.log(dog2)
// dog1.color = ['red', 'green']
// console.log(dog1)
// console.log(dog2)
// dog1.eat()
// dog2.eat()
// console.log(typeof dog1.constructor) // function

// class Animal {
//   constructor(name) {
//     this.name = name
//     this.color = ['red']
//   }
//   eat() {
//     console.log(this.name + ' is eat')
//   }
// }
// class Dog extends Animal {
//   constructor(name) {
//     super(name)
//   }
// }
// var dog1 = new Dog('dog1')
// var dog2 = new Dog('dog2')
// dog1.color.push('yellow')
// console.log(dog1.name) // 输出dog1
// console.log(dog2.color) // 输出['red']
// dog2.eat() // 输出dog2 is eat

function myNew(Fun, ...args) {
  const obj = {}
  obj.__proto__ = Fun.prototype
  let result = obj.apply(Fun, args)
  // 4.根据返回值判断
  return result instanceof Object ? result : obj
}
