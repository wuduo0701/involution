var generateParenthesis = function (n) {
  if (n === 1) return ['()']
  let result = []

  function backTrack(s, left, right) {
    if (s.length === n * 2) {
      result.push(s)
      return
    }
    if (left < n) backTrack(s + '(', left + 1, right)
    if (right < left) backTrack(s + ')', left, right + 1)
  }
  backTrack('', 0, 0)
  return result
}
