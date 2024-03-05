// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

// 你返回所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

// 示例 1：

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。
// 示例 2：

// 输入：nums = [0,1,1]
// 输出：[]
// 解释：唯一可能的三元组和不为 0 。
// 示例 3：

// 输入：nums = [0,0,0]
// 输出：[[0,0,0]]
// 解释：唯一可能的三元组和为 0

// 解法：
// 1.先给nums从小到大排序
// 2.设定循环，i = 0；i< nums.length - 2 (因为已知两种值，需减二)。其中left = i+1, right = nums.length - 1
// 3. 通过比较num[i] === -(nums[left] + nums[right])是否相等，即可得解；接着通过循环变化i的位置,同时移动left和right的值。
// 4.详细可见下面的映射。【已经排序了的前提】如sum < target，需移动right,减小nums[right]，同理sum > target,需移动left,增大nums[left]
// i  left        right
// -4  -1  -1 0 1 2
// NOTE: for循环中，continue会跳过当前循环
function threeSum(nums) {
  nums.sort((a, b) => a - b)
  let result = []

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      // 跳过重复的元素
      continue
    }

    let left = i + 1
    let right = nums.length - 1
    const target = -nums[i]

    while (left < right) {
      const sum = nums[left] + nums[right]

      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]])

        // 跳过重复的元素
        // while (left < right && nums[left] === nums[left + 1]) left++
        // while (left < right && nums[right] === nums[right - 1]) right--

        left++
        right--
      } else if (sum < target) {
        left++
      } else {
        right--
      }
    }
  }

  return result
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
console.log(threeSum([0, 1, 1]))
console.log(threeSum([0, 0, 0]))
