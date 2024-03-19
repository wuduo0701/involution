function longest(str) {
  if (str.length <= 1) return str
  let max = 0,
    right = 0,
    maxStr = ''

  for (let i = 0; i < str.length; i++) {
    right = i + 1
    while (str[i] === str[right]) {
      right++
    }
    if (right - i > max) {
      max = right - i
      maxStr = str.slice(i, right)
    }
  }
  return maxStr
}

console.log(longest('aabbbcccc'))
