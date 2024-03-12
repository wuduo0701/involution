// 33. 搜索旋转排序数组
// > 二分查找
// 整数数组 nums 按升序排列，数组中的值 互不相同 。
// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
// 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
// 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

// 示例 1：
// 输入：nums = [4,5,6,7,0,1,2], target = 0
// 输出：4

// 示例 2：
// 输入：nums = [4,5,6,7,0,1,2], target = 3
// 输出：-1

// 示例 3：
// 输入：nums = [1], target = 0
// 输出：-1

var search = function (nums, target) {
  if (nums.length === 0) return -1
  if (nums.length === 1) return nums[0] === target ? 0 : -1

  let left = 0,
    right = nums.length - 1

  while (left <= right) {
    let middle = Math.floor((left + right) / 2)
    if (nums[middle] === target) return middle

    // 左边是有序的
    if (nums[middle] >= nums[left]) {
      // target出现在左边有序数组，进行指针移动
      if (target >= nums[left] && target < nums[middle]) {
        right = middle - 1
      } else {
        // target出现在右边
        left = middle + 1
      }
    } else {
      // 右边是有序的
      // target出现在右边
      if (target > nums[middle] && target <= nums[right]) {
        left = middle + 1
      } else {
        // target出现在左边
        right = middle - 1
      }
    }
  }
  return -1
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0))
console.log(search([4, 5, 6, 7, 0, 1, 2], 3))
console.log(search([1], 0))
