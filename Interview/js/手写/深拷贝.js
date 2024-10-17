function deepClone(targetObj) {
  // 如果是null或者undefined 不进行拷贝操作
  if (typeof targetObj !== 'object') return targetObj
  if (targetObj === null || targetObj === undefined) return targetObj
  if (targetObj instanceof Date) return new Date(targetObj)
  if (targetObj instanceof RegExp) return new RegExp(targetObj)

  let newObj = Array.isArray(targetObj) ? [] : {}
  for (let key in targetObj) {
    if (targetObj.hasOwnProperty(key)) {
      let value = targetObj[key]
      newObj[key] = typeof value === 'object' ? deepClone(value) : value
    }
  }
  return newObj
}

let obj = {
  name: 'obj',
  arr: [1, 2]
}
let obj1 = deepClone(obj),
  obj2 = deepClone(obj)

obj1.name = 'obj1'
obj1.arr.push(3)

obj2.name = 'obj2'

console.log(obj1, obj2)
