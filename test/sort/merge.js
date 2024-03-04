// 堆排序

function mergeSort(arr) {
  if (arr.length === 1) return arr

  let middleIndex = Math.floor(arr.length / 2),
    leftArr = arr.slice(0, middleIndex),
    rightArr = arr.slice(middleIndex)

  return merge(mergeSort(leftArr), mergeSort(rightArr))
}
function merge(leftArr, rightArr) {
  let result = []
  while (leftArr.length > 0 && rightArr.length > 0) {
    if (leftArr[0] > rightArr[0]) {
      result.push(rightArr.shift())
    } else {
      result.push(leftArr.shift())
    }
  }

  return result.concat(leftArr).concat(rightArr)
}
let arr1 = [3, 2, 3, 1, 2, 4, 5, 5, 6]
console.log(mergeSort(arr1))
