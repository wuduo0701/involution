/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 轮转数组
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 */

// 示例 1:
// 输入: nums = [1,2,3,4,5,6,7], k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]

// 示例 2:
// 输入：nums = [-1,-100,3,99], k = 2
// 输出：[3,99,-1,-100]
// 解释:
// 向右轮转 1 步: [99,-1,-100,3]
// 向右轮转 2 步: [3,99,-1,-100]

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  /**
   * 方法一：
   * 1. 用新数组深拷贝一份 arr
   * 2. 把arr[i] 下放至数组nums[i+k]上
   * 3. 求余会在超出部门回到前面
   */
  // if (k === 0) return nums
  // let arr = [...nums],
  //   len = nums.length
  // for (let i = 0; i < arr.length; i++) {
  //   nums[(i + k) % len] = arr[i]
  // }
  /**
   * 方法一：
   * 定义反转函数reverse
   * 解题思路：定义nums为: ----->-->
   * 1. 翻转整个数组：<--<-----
   * 2. 反转前k个元素：--><-----
   * 3. 反转剩下的元素：-->----->
   */
  if (k === 0) return nums
  const len = nums.length
  const reverse = (arr, start, end) => {
    while (start < end) {
      ;[arr[start], arr[end]] = [arr[end], arr[start]]
      start++
      end--
    }
    return arr
  }
  k = k % len // 处理k大于数组长度的情况
  reverse(nums, 0, len - 1) // 反转整个数组
  reverse(nums, 0, k - 1) // 反转前k个元素
  reverse(nums, k, len - 1) // 反转剩下的元素
}
// @lc code=end
rotate([1, 2, 3, 4, 5, 6, 7], 3)
rotate([-1, -100, 3, 99], 2)
