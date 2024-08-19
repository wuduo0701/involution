/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 * 给你一个非负整数数组 nums 和一个整数 target 。
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  // 问题转化：数组里的数不是加负号就是加正号
  // 1. 假设所有加正号的和为P，所有加负号的和为N
  // 2. 则有两种：
  //     1. 正数和+负数和等于所有数和：P + N = sum
  //     2. 最终表达式的结果应该是 target：P - N = target
  // 3. 推到出公式：P = (sum + target) / 2
  const sum = nums.reduce((acc, num) => acc + num, 0)
  // 和不能小于target 或者 sum + target必须为偶数（因为公式：(sum + target) / 2）
  if (sum < Math.abs(target) || (sum + target) % 2 !== 0) {
    return 0
  }
  const newTarget = (sum + target) / 2 // 需要找到这个数
  const dp = new Array(newTarget + 1).fill(0) // 和为i的
  dp[0] = 1 // 和为 0 的组合数只有一种，即不选择任何元素
  for (const num of nums) {
    for (let j = newTarget; j >= num; j--) {
      dp[j] += dp[j - num]
    }
  }

  return dp[newTarget]
}
// @lc code=end
