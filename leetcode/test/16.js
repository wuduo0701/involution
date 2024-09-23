var threeSumClosest = function (nums, target) {
  let n = nums.length
  let closest = Number.MAX_VALUE
  let result = 0
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let left = i + 1,
      right = n - 1
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum === target) {
        return target
      } else if (sum > target) {
        if (sum - target < closest) {
          closest = sum - target
          result = sum
        }
        right--
      } else {
        if (target - sum < closest) {
          closest = target - sum
          result = sum
        }
        left++
      }
    }
  }
  return result
}
