/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原 IP 地址
 * 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
 */
// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址
// 但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
// 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，
// 这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const result = [] // 定义结果数组
  // 回溯法
  const backTracking = (path, start) => {
    if (path.length === 4) {
      if (start === s.length) {
        result.push(path.join('.'))
      }
      return
    }
    for (let i = 1; i <= 3; i++) {
      if (start + i > s.length) break // 长度大于s的长度，退出循环
      const segment = s.substring(start, start + i) // 本次循环的ip片段
      // 判断ip片段是否合法(不能含有前导 0 、且值小于255)，不合法则跳出本次循环
      if (
        (segment.length > 1 && segment[0] === '0') ||
        (i === 3 && +segment > 255)
      )
        continue
      path.push(segment) // 将当前片段加入
      backTracking(path, start + i)
      path.pop() // NOTE:【关键步骤】回溯，移除最后一个片段，尝试其他可能的片段组合
    }
  }
  backTracking([], 0)
  return result
}
// @lc code=end
