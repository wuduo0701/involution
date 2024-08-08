/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
 * 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
 */

// 示例 1:
// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。

// 示例 2:
// 输入: s = "abab", p = "ab"
// 输出: [0,1,2]
// 解释:
// 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
// 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
// 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const sLen = s.length,
    pLen = p.length
  if (sLen < pLen) return []
  const ans = []
  // 建立两个数组存放字符串中字母出现的词频，并以此作为标准比较
  const sCount = new Array(26).fill(0)
  const pCount = new Array(26).fill(0)

  // 当滑动窗口的首位在s[0]处时 （相当于放置滑动窗口进入数组）
  for (let i = 0; i < pLen; i++) {
    sCount[s[i].charCodeAt() - 'a'.charCodeAt()]++ // 记录s中前pLen个字母的词频
    pCount[p[i].charCodeAt() - 'a'.charCodeAt()]++ // 记录要寻找的字符串中每个字母的词频(只用进行一次来确定)
  }
  // 判断放置处是否有异位词
  if (sCount.toString() === pCount.toString()) {
    ans.push(0)
  }
  // NOTE:上面的逻辑相当于：设定了一个长度为pLen的初始滑动窗口，判断字符出现的次数，来判断是否是异位词

  // 开始让窗口进行滑动（i是滑动前的首位）
  for (let i = 0; i < sLen - pLen; i++) {
    // 相当于把窗口往后移动一位
    sCount[s[i].charCodeAt() - 'a'.charCodeAt()]-- // 将滑动前首位的词频删去
    sCount[s[i + pLen].charCodeAt() - 'a'.charCodeAt()]++ // 增加滑动后最后一位的词频（以此达到滑动的效果）

    // 判断滑动后（i+1）处，是否有异位词。
    if (sCount.toString() === pCount.toString()) {
      ans.push(i + 1)
    }
  }

  return ans
}
// @lc code=end
console.log(findAnagrams('cbaebabacd', 'abc'))
