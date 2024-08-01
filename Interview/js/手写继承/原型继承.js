const Animal = {
  name: 'Animal',
  color: ['red'],
  say: function () {
    console.log('my name is ' + this.name)
  }
}
// 实现原型继承（以一个现有对象作为原型，创建一个新对象）
const Dog = Object.create(Animal)

Dog.name = 'Dog'

// 测试继承
Dog.say() // 输出: my name is Dog

// 验证子对象的原型
console.log(Object.getPrototypeOf(Dog) === Animal) // 输出: true
// 缺点1：缺乏构造函数，不是真正的继承

const Dog2 = Object.create(Animal)
Dog2.color.push('yellow')
console.log(Dog.color) // [ 'red', 'yellow' ]

// 缺点2：共享引用类型属性，修改属性会被同步修改
