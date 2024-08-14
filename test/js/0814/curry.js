function curry(fn, ...args) {
  let totalLen = fn.length

  return function () {
    let totalArgs = [...args, ...arguments]
    return totalArgs.length >= totalLen
      ? fn.call(this, ...totalArgs)
      : curry.call(this, fn, ...totalArgs)
  }
}

let fn = curry(function (a, b, c, d, e) {
  return a + b + c + d + e
})
console.log(fn(1)(2)(3)(4)(5))
