// 46. 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 示例 2：
// 输入：nums = [0,1]
// 输出：[[0,1],[1,0]]

// 示例 3：
// 输入：nums = [1]
// 输出：[[1]]

/**
 * https://leetcode.cn/problems/permutations/solutions/247052/chou-xiang-cheng-jue-ce-shu-yi-ge-pai-lie-jiu-xian/
 * NOTE:
 * 1. 使用回溯进行递归，把数组想象成一棵树，每个子树都有nums.length的选择。如[1, 2, 3]，如第一个是1的话，下一个也有三种选择
 * 2. 使用map记录过已经出现过的数，如1已经出现，则置为true，下一次再出现1则不使用，重复以上过程，递归调用
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
  let result = [],
    used = {}
  function dps(path) {
    // 个数选够了 结束本次递归
    if (path.length === nums.length) {
      result.push(path) // 加入结果数组
      return
    }
    // for枚举出每个可选的选项
    for (let num of nums) {
      if (used[num]) continue // 使用过，跳过这次
      // path.push(num)
      used[num] = true // 标记为使用过
      dps(path.concat(num)) // 基于当前的数 进行递归
      // path.pop() // 出栈
      used[num] = false // 重置为未使用
    }
  }
  dps([]) // 递归入口，传递空数组
  return result
}

console.log(permute([1, 2, 3]))
