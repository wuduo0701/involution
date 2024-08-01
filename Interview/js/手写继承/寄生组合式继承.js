// 父类
function Animal(name) {
  this.name = name
}
Animal.prototype.say = function () {
  console.log(this.name)
}

function Dog(name, breed) {
  Animal.call(this, name) // 构造函数继承
  this.breed = breed
}
Dog.prototype = Object.create(Animal.prototype) // 原型继承，子类继承父类原型上的属性
Dog.prototype.constructor = Dog // 重新设置 Dog.prototype.constructor 为 Dog，以修复 constructor 属性指向的问题。

var dog1 = new Dog('dog1', 'breed1')
var dog2 = new Dog('dog2', 'breed2')

console.log(dog1)
console.log(dog2)
dog1.say()
console.log(typeof dog1.constructor) // function
console.log(dog1 instanceof Dog) // true 表名继承 Dog
console.log(dog1 instanceof Animal) // true 表名继承 Animal
