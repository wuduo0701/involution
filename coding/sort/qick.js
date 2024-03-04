// 快速排序

// 思路：
// 1.通过定义一个分割点，通常用数组第一个代替
// 2.通过分割点，把数组分层两部分，一边比分割点大，一边比分割点小
// 3.通过递归直至两边都不可分割为止，这样就变成有序序列了
function quickSort(Array) {
  const sort = (arr) => {
    if (arr.length <= 0) return arr
    let left = [],
      right = [],
      middle = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < middle) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return [...quickSort(left), middle, ...quickSort(right)]
  }
  return sort(Array)
}

let arr1 = [3, 2, 3, 1, 2, 4, 5, 5, 6]
console.log(quickSort(arr1))
