function lengthOfLongestSubstring(s) {
  if (s.length === 1) return 1
  let left = 0,
    right = 1,
    tempStr = '',
    ans = 0
  while (right < s.length) {
    tempStr = s.slice(left, right)
    if (tempStr.indexOf(s[right]) > -1) {
      left++
      continue
    } else {
      right++
    }
    ans = Math.max(ans, right - left)
  }
  return ans
}

console.log(lengthOfLongestSubstring('abcabcbb'))
console.log(lengthOfLongestSubstring('bbbbb'))
console.log(lengthOfLongestSubstring('pwwkew'))
