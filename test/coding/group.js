Array.prototype.group = function (fun) {
  let obj = {}
  this.forEach((item, index) => {
    let key = fun(item + 1, index, this)
    if (!obj[key]) {
      obj[key] = [item]
    } else {
      obj[key].push(item)
    }
  })
  return obj
}
let array = [0, 1, 2, 3, 4]

ruleFn = (item, index, array) => {
  return item % 2 == 0 ? 'odd' : 'even'
}
console.log(array.group(ruleFn))
