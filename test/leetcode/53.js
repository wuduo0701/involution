// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 子数组
// 是数组中的一个连续部分。

// 示例 1：
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
// -2  = -2
// -2,1 = -1
// -2,1,-3 = -2,1 = -1
// -2,1,-3,4 = -3,4 = 1
// -2,1,-3,4,-1 = 4,-1 = 3
// -2,1,-3,4,-1,2 = 4,-1,2 = 5
// -2,1,-3,4,-1,2,1 = 4,-1,2,1 = 6
// -2,1,-3,4,-1,2,1,-5 = 4,-1,2,1 = 6
// -2,1,-3,4,-1,2,1,-5,4 = 4,-1,2,1 = 6
// 示例 2：
// 输入：nums = [1]
// 输出：1
// 示例 3：

// 输入：nums = [5,4,-1,7,8]
// 输出：23
var maxSubArray = function (nums) {
  if (nums.length === 0) return 0
  if (nums.length === 1) return nums[0]
  let sum = nums[0],
    max = nums[0]
  for (let i = 1; i < nums.length; i++) {
    sum = Math.max(nums[i], sum + nums[i])
    max = Math.max(max, sum)
  }
  return max
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
