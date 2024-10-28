function Person(name) {
  this.name = name
}
Person.prototype.getName = function () {
  console.log(this.name)
}
const person1 = new Person('lin')
person1.getName() // 正常继承

Person.prototype.getName2 = function () {
  console.log(2222)
}
person1.getName2() // 后续定义的也能获取到

const person2 = new Person('lin2') // 第二次定义，还是之前的，有（getName、getName2）
Person.prototype = {
  getName3: function () {
    console.log(333)
  }
}
person2.getName3() // 拿不到，相当于重写了原型

const person3 = new Person('lin3') // 第三次定义，只有getName3
person3.getName3() // 正常执行
person3.getName() // 报错
person3.getName2() // 报错
