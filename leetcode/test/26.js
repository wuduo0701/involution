function removeDuplicates(nums) {
  const len = nums.length
  let left = 1,
    right = 1
  while (right < len) {
    if (nums[right] !== nums[right - 1]) {
      nums[left] = nums[right]
      left++
    }
    right++
  }
  return left
}
