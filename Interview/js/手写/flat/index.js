// 1. 挂载在数组的原型对象上
// 2. 默认递归深度为1
Array.prototype.myFlat = function (deep = 1) {
  const arr = this
  let result = []
  if (deep === 0) return arr // deep 为0，结束递归
  for (let i = 0; i < arr.length; i++) {
    // 判断为数组并且扁平深度 > 0
    if (Array.isArray(arr[i]) && deep > 0) {
      // 递归扁平化
      result = result.concat(arr[i].myFlat(deep - 1))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
