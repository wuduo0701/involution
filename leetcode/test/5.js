function longestPalindrome(s) {
  if (s.length === 1) return s

  let ans = ''
  for (let i = 0; i < s.length; i++) {
    centerFn(i, i)
    if (s[i] === s[i + 1]) centerFn(i, i + 1)
  }
  function centerFn(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--
      right++
    }
    if (right - left + 1 - 2 > ans.length) {
      ans = s.slice(left + 1, right)
    }
  }
  return ans
}
console.log(longestPalindrome('babad'))

console.log(longestPalindrome('cbbd'))
