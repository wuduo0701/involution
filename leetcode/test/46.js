function permute(nums) {
  if (nums.length === 1) return [nums]

  const result = []
  const used = {}
  function backTrack(path) {
    if (path.length === nums.length) {
      result.push([...path])
      return
    }
    for (const num of nums) {
      if (used[num]) {
        continue
      }
      path.push(num)
      used[num] = true
      backTrack(path)
      path.pop()
      used[num] = false
    }
  }
  backTrack([])

  return result
}
console.log(permute([1, 2, 3]))
