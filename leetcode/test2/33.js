var search = function (nums, target) {
  if (nums.length === 1) return nums[0] === target ? 0 : -1
  const len = nums.length
  let left = 0,
    right = len - 1
  while (left <= right) {
    let middle = (left + right) >> 1
    if (nums[middle] === target) return middle

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
