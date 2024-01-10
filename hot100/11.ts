// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 返回容器可以储存的最大水量。

// 说明：你不能倾斜容器。

// 示例 1：

// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
// 示例 2：

// 输入：height = [1,1]
// 输出：1

function maxArea(height: number[]): number {
  // const length = height.length
  // let maxLength = 0
  // for (let i = 0; i < length - 1; i++) {
  //   for (let j = i + 1; j < length; j++) {
  //     maxLength = Math.max(maxLength, Math.min(height[i], height[j]) * (j - i))
  //   }
  // }
  // return maxLength
  let ans = 0,
    left = 0,
    right = height.length - 1
  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right])
    ans = Math.max(ans, area)
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return ans
}
const nums1 = [1, 8, 6, 2, 5, 4, 8, 3, 7]
console.log(maxArea(nums1))
const nums2 = [1, 1]
console.log(maxArea(nums2))
