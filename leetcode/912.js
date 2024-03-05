// 912. 排序数组
// 给你一个整数数组 nums，请你将该数组升序排列。

// 示例 1：

// 输入：nums = [5,2,3,1]
// 输出：[1,2,3,5]
// 示例 2：

// 输入：nums = [5,1,1,2,0,0]
// 输出：[0,0,1,1,2,5]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  const sort = (arr) => {
    if (arr.length <= 1) return arr
    let middle = arr[0],
      leftArr = [],
      rightArr = []
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < middle) {
        leftArr.push(arr[i])
      } else {
        rightArr.push(arr[i])
      }
    }
    return [...sort(leftArr), middle, ...sort(rightArr)]
  }
  return sort(nums)
}
console.log(sortArray([5, 2, 3, 1]))
console.log(sortArray([5, 1, 1, 2, 0, 0]))

var mergeSort = function (nums) {
  if (nums.length <= 1) return nums
  let middleIndex = Math.floor(nums.length / 2),
    leftArr = nums.slice(0, middleIndex),
    rightArr = nums.slice(middleIndex)

  return merge(mergeSort(leftArr), mergeSort(rightArr))
}
var merge = function (leftArr, rightArr) {
  const result = []
  while (leftArr.length > 0 && rightArr.length > 0) {
    if (leftArr[0] < rightArr[0]) {
      result.push(leftArr.shift())
    } else {
      result.push(rightArr.shift())
    }
  }
  return result.concat(leftArr).concat(rightArr)
}
console.log(mergeSort([5, 2, 3, 1]))
console.log(mergeSort([5, 1, 1, 2, 0, 0]))
