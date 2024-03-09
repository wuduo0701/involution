// 5. 最长回文子串
// 给你一个字符串 s，找到 s 中最长的回文子串

// 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
// 示例 1：
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。

// 示例 2：
// 输入：s = "cbbd"
// 输出："bb"
// c c
// cb c/b
// cbb bb
// cbbd bb
// cbbdb bdb
// NOTE:使用中心回文法。(无论回文有多长，最终简化都是只要1个字符`a`和2个字符`aa`的情况，并向两边扩散)
// 回文的特性：分奇数和偶数的情况：奇数（中心肯定是单独的，且左右两边相等，如bab）、偶数（中心也是偶数，肯定是一样的字符串，且左右两边也是一样的字符串，如abba）
// 1. 以上说的两种情况，指针left和right都可以判断为相等，不相等则不满足回文
// 2. 循环变量字符串s，每个位置都有奇数(i, i)和偶数（i, i+1）的情况
// 3. 通过定义函数（）
var longestPalindrome = function (s) {
  let len = s.length
  if (len < 2) return s

  let longestStr = ''
  for (let i = 0; i < len; i++) {
    centerFn(i, i) // 奇数的情况
    if (s[i] === s[i + 1]) centerFn(i, i + 1) // 偶数的情况(自身两个也必须相等，否则不需要进行下一步)
  }
  function centerFn(left, right) {
    // 通过这样偏移左右指针，偏移后回文子串左右两边肯定也都是相等的。即s[left] === s[right]，否则就跳出循环，找到之前得回文串
    while (left >= 0 && right < len && s[left] === s[right]) {
      left--
      right++
    }
    // 跳出循环恰好是不满足的情况，所有左右两边的边界都要各自往回移动一个数，即（left+1, right-1）的字符串
    // 然后如果right-1-(left+1) +1，这里的+1是长度需要+1，如果长度比之前最大的长，则进行切割子串
    if (right - left - 1 > longestStr.length) {
      // 切割子串（left+1, right -1）,slice的特性是满足右边不进行切割，所有需要+1
      longestStr = s.slice(left + 1, right)
    }
  }
  return longestStr
}
console.log(longestPalindrome('babad'))
console.log(longestPalindrome('cbbd'))
console.log(longestPalindrome('bb'))
console.log(longestPalindrome('bbbb'))
