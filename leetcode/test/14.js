// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
var longestCommonPrefix = function (strs) {
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 0; j < strs.length; j++) {
      if (strs[0][i] !== strs[j][i]) {
        return strs[0].slice(0, i)
      }
    }
  }
  return strs[0]
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight']))
