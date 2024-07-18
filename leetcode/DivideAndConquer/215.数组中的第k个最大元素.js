/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * 解法：https://suki.gitbook.io/notes/articles/dsa/quick_select
 */
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

// 示例 1:
// 输入: [3,2,1,5,6,4], k = 2
// 输出: 5

// 示例 2:
// 输入: [3,2,3,1,2,4,5,5,6], k = 4
// 输出: 4

// @lc code=start
/**
 * @param {number[]} nums - 整数数组
 * @param {number} k - 第 k 大的元素
 * @return {number} - 返回数组中第 k 大的元素
 */
var findKthLargest = function (nums, k) {
  function partition(arr, left, right) {
    let pivot = arr[right]
    let i = left

    for (let j = left; j < right; j++) {
      if (arr[j] <= pivot) {
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        i++
      }
    }
    ;[arr[i], arr[right]] = [arr[right], arr[i]]
    return i
  }
  function quickSelect(arr, left, right, index) {
    if (left === right) {
      return arr[left]
    }

    let pivotIndex = partition(arr, left, right)

    if (pivotIndex === index) {
      return arr[pivotIndex]
    } else if (pivotIndex < index) {
      return quickSelect(arr, pivotIndex + 1, right, index)
    } else {
      return quickSelect(arr, left, pivotIndex - 1, index)
    }
  }

  return quickSelect(nums, 0, nums.length - 1, nums.length - k)
}

// @lc code=end
