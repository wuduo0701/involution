/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 * 给定一个整数数组 temperatures ，表示每天的温度，
 * 返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，
 * 下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 */

// 示例 1:
// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]

// 示例 2:
// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]

// 示例 3:
// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]
// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  // 单调栈：离它最近的且比它大的数
  let result = new Array(temperatures.length).fill(0)
  let stack = []

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      // 如果当前温度高于栈顶索引对应的温度，则弹出栈顶温度
      // 此时当前温度所在天 ，即是栈顶温度的最高文档
      let index = stack.pop()
      result[index] = i - index // 计算索引差值，即是天数差距
    }

    stack.push(i)
  }

  return result
}
// @lc code=end
