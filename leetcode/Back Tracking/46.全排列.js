/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 *
 * https://leetcode.cn/problems/permutations/description/
 *
 * algorithms
 * Medium (79.34%)
 * Likes:    2949
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 1.5M
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1]
 * 输出：[[1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 6
 * -10 <= nums[i] <= 10
 * nums 中的所有整数 互不相同
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
  let result = [],
    used = {}

  function backTrack(path) {
    // 个数选够了 结束本次递归
    if (path.length === nums.length) {
      result.push([...path])
      return
    }
    for (let num of nums) {
      // 使用过，跳过这次
      if (used[num]) continue
      used[num] = true // 标记为使用过
      path.push(num)
      backTrack(path) // 基于当前的数 进行递归
      path.pop() // 出栈
      used[num] = false // 重置为未使用
    }
  }
  backTrack([])
  return result
}
// @lc code=end
