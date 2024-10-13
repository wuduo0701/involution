const permute = (nums) => {
  let result = []
  let used = {}

  function backTrack(path) {
    if (path.length === nums.length) {
      result.push([...path])
      return
    }
    for (let num of nums) {
      if (used[num]) continue
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
