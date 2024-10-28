alert(a) //function a(){alert(10)}
a() //执行alert(10)
var a = 3
function a() {
  alert(10)
}
alert(a) //3
a = 6
a()

// 1. 第一变量和函数声明提前
// 2. 第二函数声明优先于变量声明
