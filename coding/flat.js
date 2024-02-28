/**
 * 1. 使用es6提供的语法，array.flat
 * @params array 需要扁平化的数组
 * @params deep 扁平化的层级，默认为彻底扁平化
 */
const flat1 = (array, deep = Infinity) => {
  return array.flat(deep)
}

/**
 * 2. 使用toString 彻底转化成string后，在通过split切割
 * FIXME: 无法自定义扁平化层级
 * @params array 需要扁平化的数组
 */
const flat2 = (array) => {
  return array.toString().split(',').map(Number)
}
/**
 * 3.1 【递归】for循环，利用递归来实现
 * FIXME: 无法自定义扁平化层级
 * @params array 需要扁平化的数组
 */
const flat3 = (array) => {
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(flat3(array[i]))
    } else {
      result.push(array[i])
    }
  }

  return result
}
// 3.2 【递归】利用reduce进行递归
const flat4 = (array) => {
  return array.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flat4(next) : next)
  }, [])
}
const array = [1, 2, 3, [2, 4, [3, 2]]]
/**
 * 4.1 【扩展运算符】利用扩展运算符，遇到数组进行数组拆分
 * FIXME: 无法自定义扁平化层级
 * @params array 需要扁平化的数组
 */
const flat5 = (array) => {
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(...array[i])
    } else {
      result.push(array[i])
    }
  }

  return result
}
/**
 * 4.2 【扩展运算符】reduce版本，利用扩展运算符
 * FIXME: 无法自定义扁平化层级，语法有问题
 * @params array 需要扁平化的数组
 */
// const flat6 = (array) => {
//   return array.reduce((prev, next) => {
//     return prev.concat(Array.isArray(next) ? ...next : next)
//   }, [])
// }

/**
 * 5. 通过JSON.stringify + JSON.parse 来实现
 * FIXME: 无法自定义扁平化层级，语法有问题
 * @params array 需要扁平化的数组
 */
const flat7 = (array) => {
  let str = JSON.stringify(array)
  str = str.replace(/(\[|\])/g, '')
  str = `[${str}]`
  return JSON.parse(str)
}
console.log(flat1(array, 3)) // es6 语法
console.log(flat2(array)) // toString + split。转成string后进行切割从新转化为数组
console.log(flat3(array)) // 利用递归进行处理，遇到数组就继续扁平化
console.log(flat4(array)) // (reduce版本)利用递归进行处理
console.log(flat5(array)) // 利用扩展运算符
// console.log(flat6(array)) // 【reduce版本】利用扩展运算符
console.log(flat7(array)) // 通过JSON.stringify + JSON.parse 来实现
