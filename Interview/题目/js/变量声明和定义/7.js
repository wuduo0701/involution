// This is a JavaScript Quiz from BFE.dev

function a() {}
const b = function () {}

const c = function d() {
  console.log(typeof d) // "function"。输出函数d的定义
  d = 'e'
  console.log(typeof d) // "function"。赋值会失败。因为 d 是一个函数名，不能被重新赋值。
}

console.log(typeof a) // "function"
console.log(typeof b) // "function"
console.log(typeof c) // "function"
console.log(typeof d) // "undefined"。命名函数表达式，函数名为 d，但它只能在函数内部访问。
c()
