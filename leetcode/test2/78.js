var subsets = function (nums) {
  let result = []
  function backTrack(path, index) {
    if (nums.length === index) {
      result.push([...path])
      return
    }
    path.push(nums[index])
    backTrack(path, index + 1)
    path.pop()
    backTrack(path, index + 1)
  }
  backTrack([], 0)
  return result
}
