function longestConsecutive(nums) {
  let s = new Set(nums)
  let max = 0
  for (const x of nums) {
    if (!s.has(x - 1)) {
      let y = x + 1
      while (s.has(y)) {
        y++
      }
      max = Math.max(max, y - x)
    }
  }
  return max
}
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]))
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
