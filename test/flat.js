const flatArr = [1, 2, 3, [2, 3, [2]]]

const flat1 = (arr, deep) => {
  return arr.flat(deep)
}
const flat2 = (arr) => {
  return arr.toString().split(',').map(Number)
}
const flat3 = (arr) => {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flat3(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
const flat4 = (arr) => {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(...arr[i])
    } else {
      result.push(arr[i])
    }
  }
  return result
}

console.log(flat4(flatArr))
