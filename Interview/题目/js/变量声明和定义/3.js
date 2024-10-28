alert(a) //undefined
a() // 报错 a 不是一个函数，函数表达式函数必须在表达式之后调用
var a = 3
var a = function () {
  alert(10)
}
alert(a)
a = 6
a()
