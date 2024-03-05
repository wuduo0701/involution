function mergeSort(nums) {
  if (nums.length === 1) return nums
  let middleIndex = Math.floor(nums.length / 2),
    leftArr = nums.slice(0, middleIndex),
    rightArr = nums.slice(middleIndex)

  return merge(mergeSort(leftArr), mergeSort(rightArr))
}
function merge(leftArr, rightArr) {
  let result = []
  while (leftArr.length > 0 && rightArr.length > 0) {
    if (leftArr[0] < rightArr[0]) {
      result.push(leftArr.shift())
    } else {
      result.push(rightArr.shift())
    }
  }
  return result.concat(leftArr).concat(rightArr)
}

let Arr = [1, 3, 2, -2, 0, 7, 6, 4]
console.log(mergeSort(Arr))
