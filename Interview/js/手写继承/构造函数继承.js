// 父类
function Animal(name) {
  this.name = name
}

Animal.prototype.eat = function () {
  console.log(this.name + ' is eating.')
}

// 子类
function Dog(name, breed) {
  // 调用父类的构造函数，使得 Dog 实例也具有 name 属性
  Animal.call(this, name)
  this.breed = breed
}

var dog1 = new Dog('dog1', 'breed1')
var dog2 = new Dog('dog2', 'breed2')

console.log(dog1)
console.log(dog2)

// 弊端1: 无法继承父类原型对象上的属性和方法。
dog1.eat() // 报错
