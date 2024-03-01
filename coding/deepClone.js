function deepClone(obj) {
  // 如果是基础数据类型  直接返回
  if (typeof obj !== 'object') return obj
  // 如果是null或者undefined 不进行拷贝操作
  if (obj === null || obj === undefined) return obj
  // 如果是正则和日期 拷贝
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  const newObj = Array.isArray(obj) ? [] : {}
  // 如果是数组：key: index，对象：key: key
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      const value = obj[key]
      // 递归调用deepClone，value可能还是对象，所以递归调用
      newObj[key] = typeof value === 'object' ? deepClone(value) : value // 这里相当于用了又一层引用赋值给了新对象
    }
  }
  return newObj
}

const obj1 = {
  name: 'obj'
}
const obj2 = obj1 // 浅拷贝
const objDeepClone = deepClone(obj1) // 深拷贝
console.log(obj2, objDeepClone)

obj1.name = 'obj1'

console.log(obj2, objDeepClone)

const arr1 = [1, 2],
  arr2 = arr1
const arrDeepClone = deepClone(arr1)
console.log(arr2, arrDeepClone)
arr1[1] = 0
console.log(arr2, arrDeepClone)
