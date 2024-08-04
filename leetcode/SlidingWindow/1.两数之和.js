/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 */
// 示例 1：
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 示例 2：
// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]

// 示例 3：
// 输入：nums = [3,3], target = 6
// 输出：[0,1]

// @lc code=start
// 题解：
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  if (nums.length <= 1) return []
  let map = {} // 记住需要的num及其此时数的下标。
  // 举例：如所需 target = m + n
  // 1. 则 needNum = target - m， value 为 m 的下标
  // 2. 则只需要判断map[needNum]是否为空即可，因为这个找的就是 n。如之前map已经存过这个数，则代表之前遇到另一半的数了，返回[map[needNum], i]即可
  for (let i = 0; i < nums.length; i++) {
    // 找出需要的数 needNum
    let needNum = target - nums[i]
    if (map[needNum] === undefined) {
      map[nums[i]] = i
    } else {
      return [map[needNum], i]
    }
  }
}
// @lc code=end
