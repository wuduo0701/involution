function deepClone(obj) {
  if (typeof obj !== 'object') return obj
  if (obj === null) return null
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)

  let newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
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
