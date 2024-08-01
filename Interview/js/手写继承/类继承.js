// 父类
class Animal {
  constructor(name) {
    this.name = name
    this.color = ['red']
  }
  eat() {
    console.log(this.name + ' is eat')
  }
}
// 子类
class Dog extends Animal {
  constructor(name) {
    super(name)
  }
}
var dog1 = new Dog('dog1')
var dog2 = new Dog('dog2')
dog1.color.push('yellow')
console.log(dog1.name) // 输出dog1
console.log(dog2.color) // 输出['red']
dog2.eat() // 输出dog2 is eat
