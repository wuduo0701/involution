function myNew(fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype
  const result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}

// 示例使用
function Person(name, age) {
  this.name = name
  this.age = age
}

const person = myNew(Person, 'Alice', 25)
console.log(person.name) // Alice
console.log(person.age) // 25
