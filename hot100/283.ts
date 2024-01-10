// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。

// 示例 1:

// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 示例 2:

// 输入: nums = [0]
// 输出: [0]

// 提示:

// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1

// 进阶：你能尽量减少完成的操作次数吗？
function moveZeroes(nums: number[]): void {
  // if (nums.length === 1 || nums.length === 0) return
  // let nonZeroIndex = 0
  // // 将非零元素移到数组前面
  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] !== 0) {
  //     nums[nonZeroIndex] = nums[i]
  //     nonZeroIndex++
  //   }
  // }
  // // 将剩余位置填充为零
  // for (let i = nonZeroIndex; i < nums.length; i++) {
  //   nums[i] = 0
  // }
  nums.sort((a, b) => (b ? 0 : -1))
}
const nums1 = [0, 1, 0, 3, 12]
const nums2 = [0]

moveZeroes(nums1)
console.log(nums1)
moveZeroes(nums2)
console.log(nums2)
