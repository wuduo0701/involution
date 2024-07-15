/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
 * 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 */
// 示例 1：
// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

// 示例 2：
// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (!intervals.length) return []

  const sortArr = intervals.sort((a, b) => a[0] - b[0])
  const mergeArr = [sortArr[0]]
  for (let i = 1; i < sortArr.length; i++) {
    const prev = mergeArr[mergeArr.length - 1]
    const current = sortArr[i]

    // 如果当前比较对象的左边 <  合并的右边。则可以合并两个：prev因为是引用对象，则比较prev[1] 和 current[1]哪边大即可，大值进行替换
    if (current[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], current[1])
    } else {
      // current[0] > prev[1]的情况，则表示未存在重合
      mergeArr.push(current)
    }
  }
  return mergeArr
}
// @lc code=end
