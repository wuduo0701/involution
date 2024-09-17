var findPeakElement = (nums) => {
  let left = 0,
    right = nums.length - 1
  while (left < right) {
    const middle = (left + right) >> 1
    if (nums[middle] > nums[middle + 1]) {
      right = middle
    } else {
      left = middle + 1
    }
  }
  return left
}
console.log(findPeakElement([1, 2, 3, 1]))
