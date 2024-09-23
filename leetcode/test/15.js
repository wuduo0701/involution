var threeSum = function (nums) {
  const numsLen = nums.length
  if (numsLen < 3) return []

  nums.sort((a, b) => a - b)
  const result = []
  for (let i = 0; i < numsLen - 2; i++) {
    if (nums[i] === nums[i + 1]) {
      continue
    }

    let left = i + 1,
      right = numsLen - 1
    while (left < right) {
      const target = -(nums[left] + nums[right])
      if (nums[i] === target) {
        if (nums[left] === nums[left++]) left++
        if (nums[right] === nums[right--]) right--

        result.push([nums[i], nums[left], nums[right]])
        left++
        right--
      } else if (nums[i] < target) {
        left++
      } else {
        right--
      }
    }
  }
  return result
}
