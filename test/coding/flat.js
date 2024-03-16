function flatternArray(array, deep) {
  // 解法1：
  // return array.flat(deep)
  // 解法2：使用递归，在达到深度后，停止递归
  let result = []
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (Array.isArray(item) && deep > 0) {
      result = result.concat(flatternArray(item, deep - 1))
    } else {
      result.push(item)
    }
  }
  return result
  // 解法3：reduce版本的递归
  // return array.reduce((prev, cur) => {
  //   return prev.concat(
  //     Array.isArray(cur) && deep > 1 ? flatternArray(cur, deep - 1) : cur
  //   )
  // }, [])
}

console.log(flatternArray([1, 2, 3, [4, 5]], 1)) //[1,2,3,4,5]
console.log(flatternArray([1, 2, 3, [4, [5]]], 1)) //[1,2,3,4,[5]]
