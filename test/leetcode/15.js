function threeSum(nums) {
  nums.sort((a, b) => a - b)
  let result = []
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1,
      right = nums.length - 1,
      target = -nums[i]

    while (left < right) {
      let sum = nums[left] + nums[right]
      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]])
        left++
        right--
      } else if (sum < target) {
        right--
      } else {
        left++
      }
    }
  }
  return result
}
console.log(threeSum([-1, 0, 1, 2, -1, -4]))

// for (let i = 0; i < 10; i++) {
//   if (i % 2 === 0) {
//     continue
//   }
//   console.log(i)
// }
