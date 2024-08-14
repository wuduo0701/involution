Array.prototype.myFlat = function (deep = 1) {
  const arr = this
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && deep > 0) {
      result = result.concat(arr[i].myFlat(deep - 1))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

console.log([1, 2, [3, [4, 5]]].myFlat())
