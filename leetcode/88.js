// 88. 合并两个有序数组
// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  // 解法1：
  // nums1.splice(m, nums1.length - m, ...nums2)
  // nums1.sort((a, b) => a - b)

  // 解法2：
  let p1 = m - 1, // num1截止的最后index
    p2 = n - 1, // num2截止的最后index
    p = m + n - 1 // num1 + nums2 最后的index
  while (p2 >= 0) {
    // nums2 还有要合并的元素
    // 如果 p1 < 0，那么走 else 分支，把 nums2 合并到 nums1 中
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p--] = nums1[p1--] // 填入 nums1[p1]
    } else {
      nums1[p--] = nums2[p2--] // 填入 nums2[p1]
    }
  }
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))
console.log(merge([1], 1, [], 0))
console.log(merge([0], 0, [1], 1))
