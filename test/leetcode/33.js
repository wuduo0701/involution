function search(nums, target) {
  if (nums.length === 0) return -1
  if (nums.length === 1) return nums[0] === target ? 0 : -1

  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    let middle = Math.floor((left + right) / 2)
    if (nums[middle] === target) return middle

    if (nums[left] < nums[middle]) {
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

console.log(search([4, 5, 6, 7, 0, 1, 2], 0))
console.log(search([4, 5, 6, 7, 0, 1, 2], 3))
console.log(search([1], 0))
