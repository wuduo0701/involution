// 父类
function Animal(name) {
  this.name = name
}
Animal.prototype.say = function () {
  console.log(this.name)
}
// 子类
function Dog(name, breed) {
  Animal.call(this, name) // 构造函数继承
  this.breed = breed
}
// 原型链继承
Dog.prototype = new Animal()

var dog1 = new Dog('dog1', 'breed1')
var dog2 = new Dog('dog2', 'breed2')

console.log(dog1)
console.log(dog2)
dog1.say()
