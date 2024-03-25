function curry(fn, ...args) {
  let length = fn.length
  return function () {
    let totalArgs = [...args, ...arguments]
    return totalArgs.length >= length
      ? fn.call(this, ...totalArgs)
      : curry.call(this, fn, ...totalArgs)
  }
}
let curryFn = curry(function (a, b, c, d, e) {
  return a + b + c + d + e
})

console.log(curryFn(1)(2)(3)(4)(5))
