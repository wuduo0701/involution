// 归并排序

// 相当于拆解
// 递归拆解，拆解到最小单元格
function mergeSort(arr) {
  if (arr.length === 1) return arr
  let middleIndex = Math.floor(arr.length / 2)
  let leftArr = arr.slice(0, middleIndex),
    rightArr = arr.slice(middleIndex)

  // console.log(leftArr, rightArr)
  console.log('mergeSort', mergeSort(leftArr), mergeSort(rightArr))
  return merge(mergeSort(leftArr), mergeSort(rightArr))
}
// 合并
function merge(leftArr, rightArr) {
  let result = []
  while (leftArr.length > 0 && rightArr.length > 0) {
    if (leftArr[0] < rightArr[0]) {
      result.push(leftArr.shift())
    } else {
      result.push(rightArr.shift())
    }
  }
  console.log('merge', result, leftArr, rightArr)
  return result.concat(leftArr).concat(rightArr)
}

let arr1 = [3, 2, 3, 1, 2, 4, 5, 5, 6]
console.log(mergeSort(arr1))
