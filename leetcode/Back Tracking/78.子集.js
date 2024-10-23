/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。
 * 返回该数组所有可能的子集（幂集）。
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 */

// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

// 示例 2：
// 输入：nums = [0]
// 输出：[[],[0]]

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let result = []
  function backTrack(list, index) {
    // 指针越界
    if (index === nums.length) {
      result.push(list.slice()) //加入题解
      return
    }
    // 基于每个数，都可以选择和不选择的情况。往下递归
    list.push(nums[index]) // 选择这个数
    backTrack(list, index + 1) // 基于选择这个数，往下递归
    list.pop() // 不选这个数
    backTrack(list, index + 1) // 基于不选择这个数，往下递归
  }
  backTrack([], 0)
  return result
}
// @lc code=end
