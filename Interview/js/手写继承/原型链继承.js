// 父类
function Animal(kind) {
  this.kind = kind
  this.color = ['red']
}
// 子类
function Dog(name) {
  this.name = name
}

// 更改子类的原型，使其指向父类的实例
// 这样通过Dog构造出来的实例，就会查找到父类Animal的原型对象上，即Animal.prototype
Dog.prototype = new Animal()

var dog1 = new Dog('dog1')
var dog2 = new Dog('dog2')

console.log(dog1 instanceof Dog) // true 表名继承 Dog
console.log(dog1 instanceof Animal) // true 表名继承 Animal

// 弊端1：父类不能通过传参更改构造函数属性

// 弊端2：父类上的属性如果是引用类型，会被所有子实例共享。如过更改其中一个子实例，其他的相应也会更改
dog2.color.push('yellow') // 更改其中一个实例的引用对象
console.log(dog1.color) // ["red", "yellow"]
console.log(dog2.color) // ["red", "yellow"]
