// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

// 你返回所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

// 示例 1：

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。
// 示例 2：

// 输入：nums = [0,1,1]
// 输出：[]
// 解释：唯一可能的三元组和不为 0 。
// 示例 3：

// 输入：nums = [0,0,0]
// 输出：[[0,0,0]]
// 解释：唯一可能的三元组和为 0

function threeSum(nums) {
  if (nums.length <= 2) return []
  nums.sort((a, b) => a - b)

  const result = []
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] === nums[i - 1]) {
      // 跳过重复的元素
      continue
    }
    let left = i + 1,
      right = nums.length - 1,
      target = -nums[i]
    while (left < right) {
      let sum = nums[left] + nums[right]

      if (target === sum) {
        result.push([nums[i], nums[left], nums[right]])

        while (nums[left] === nums[left + 1]) left++
        while (nums[right] === nums[right - 1]) right--
        left++
        right--
      } else if (target < sum) {
        right--
      } else {
        left++
      }
    }
  }
  return result
}
console.log(threeSum([-1, 0, 1, 2, -1, -4]))

console.log(threeSum([0, 1, 1]))
console.log(threeSum([0, 0, 0]))
