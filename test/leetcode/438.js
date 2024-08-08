/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

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
  const result = []
  const sMap = Array.from({ length: 26 }).fill(0),
    pMap = Array.from({ length: 26 }).fill(0)

  for (let i = 0; i < p.length; i++) {
    sMap[s[i].charCodeAt() - 'a'.charCodeAt()]++
    pMap[s[i].charCodeAt() - 'a'.charCodeAt()]++
  }
  if (sMap.toString() === pMap.toString()) result.push(0)

  for (let i = 0; i < sLen - pLen; i++) {
    sMap[s[i].charCodeAt() - 'a'.charCodeAt()]--
    sMap[s[i + pLen].charCodeAt() - 'a'.charCodeAt()]++
    if (sMap.toString() === pMap.toString()) result.push(i + 1)
  }

  return result
}
// @lc code=end
console.log(findAnagrams('cbaebabacd', 'abc'))
