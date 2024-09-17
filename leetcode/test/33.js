function search(nums, target) {
  if (nums.length === 1) return nums[0] === target ? 0 : -1

  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    const middle = (left + right) >> 1
    if (nums[middle] === target) return middle

    // 左边是有序的
    if (nums[left] <= nums[middle]) {
      if (target >= nums[left] && target < nums[middle]) {
        right = middle - 1
      } else {
        left = middle + 1
      }
    } else {
      if (target > nums[middle] && target <= nums[right]) {
        left = middle + 1
      } else {
        right = middle - 1
      }
    }
  }
  return -1
}
