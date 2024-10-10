// /**
//  * 将函数柯里化
//  * @param fn    待柯里化的原函数
//  * @param len   所需的参数个数，默认为原函数的形参个数
//  */
// function curry(fn) {
//   let len = fn.length
//   return _curry.call(this, fn, len)
// }

// /**
//  * 中转函数
//  * @param fn    待柯里化的原函数
//  * @param len   所需的参数个数
//  * @param args  已接收的参数列表
//  */
// function _curry(fn, len, ...args) {
//   return function () {
//     let totalArgs = [...args, ...arguments]
//     return totalArgs.length >= len
//       ? fn.call(this, ...totalArgs)
//       : _curry.call(this, fn, len, ...totalArgs)
//   }
// }
// let _fn = curry(function (a, b, c, d, e) {
//   console.log(a, b, c, d, e)
// })

// 柯里化思路：将多参数传入的函数拆成单参数（或部分）函数，内部再返回调用下一个单参数（或部分）函数，依次处理剩余的参数
// 1. 通过递归简化每次传参的需求，如不满足传参要求（args.length < fn.length），则继续递归curry柯里函数，继续接收函数
// 2. 如满足要求（args.length >= fn.length）,则调取传入的函数
function curry(fn, ...args) {
  let len = fn.length

  return function () {
    let totalArgs = [...args, ...arguments]
    return totalArgs.length >= len
      ? fn.call(this, ...totalArgs)
      : curry.call(this, fn, ...totalArgs)
  }
}
function curry(fn, ...args) {
  let len = fn.length
  return function () {
    let totalArgs = [...args, ...arguments]
    return totalArgs >= len
      ? fn.call(this, ...totalArgs)
      : curry.call(this, fn, ...totalArgs)
  }
}
let fn = curry(function (a, b, c, d, e) {
  return a + b + c + d + e
})
console.log(fn(1)(2)(3)(4)(5))
console.log(fn(1, 2, 3, 4, 5))
console.log(fn(1)(2)(3, 4, 5))
console.log(fn(1, 2)(3, 4)(5))
console.log(fn(1, 2, 3, 4, 5))
