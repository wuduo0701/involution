/*
 * @lc app=leetcode.cn id=442 lang=javascript
 *
 * [442] 数组中重复的数据
 * 给你一个长度为 n 的整数数组 nums ，其中 nums 的所有整数都在范围 [1, n] 内且每个整数出现 一次 或 两次 。
 * 请你找出所有出现 两次 的整数，并以数组形式返回。
 * 你必须设计并实现一个时间复杂度为 O(n) 且仅使用常量额外空间的算法解决此问题。
 */
// 示例 1：
// 输入：nums = [4,3,2,7,8,2,3,1]
// 输出：[2,3]

// 示例 2：
// 输入：nums = [1,1,2]
// 输出：[1]
// 示例 3：
// 输入：nums = [1]
// 输出：[]
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  const n = nums.length
  if (n < 2) return []

  // 把数组的某个下标的值设为负数来表示那个数字已经出现过一次
  let result = []
  for (let i = 0; i < n; i++) {
    // 比如数组中有两个2
    // 遍历到第一个2时，会访问index=1的元素，这时把这个元素改为负数表示已经访问过；
    // 遍历到第二个2的时候，又会访问index=1的元素，但此时这个元素已经被上一次遍历到2时访问过
    // 所以2为重复元素。
    let index = Math.abs(nums[i]) - 1 // 值做为索引

    // 判断索引下的值是否为负数，如是负数表示已经访问过
    if (nums[index] < 0) {
      result.push(index + 1)
    } else {
      nums[index] = -nums[index]
    }
  }
  return result
}
// @lc code=end

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]))
