/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */
// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列

// 示例 1：
// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。

// 示例 2：
// 输入：nums = [0,1,0,3,2,3]
// 输出：4

// 示例 3：
// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法：https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485269&idx=1&sn=571a6366b0b592f103971ae3e119998b&scene=21#wechat_redirect
var lengthOfLIS = function (nums) {
  let result = 0,
    len = nums.length

  const dp = new Array(len).fill(1) // 所有都初始化为1
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1)
    }
    result = Math.max(dp[i], result)
  }
  return result
}
// @lc code=end
