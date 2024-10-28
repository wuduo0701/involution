let a = 1
function foo(a) {
  return (a = a + 1)
}
b = foo(a)
function foo(a) {
  return (a = a + 2)
}
c = foo(a)

console.log(a, b, c) // 1 3 3
// 1. 这里 a 传进去的都是引用关系。所以a不会变
// 2. foo函数的定义会取最后一个。 即a + 2
// 3. 所以b和c都用的 a+2

// 小记
// 1. 函数声明会提前。
// 2. 传进去是引用
