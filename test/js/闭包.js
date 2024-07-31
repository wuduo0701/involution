var a = 1
function foo() {
  // var a = 2
  // baz就是闭包，在定义时已经记住了它所在的词法作用域，所以这里访问的事`foo函数块级作用域`的变量a
  // 如果这里的a没有定义，他会向上查找作用域，直到找到window对象
  function baz() {
    console.log(a)
  }
  bar(baz)
}
function bar(fn) {
  // 这就是闭包
  fn()
}
// 输出2，而不是1
foo()
