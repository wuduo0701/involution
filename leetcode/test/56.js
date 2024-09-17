var merge = function (intervals) {
  const sortArr = intervals.sort((a, b) => a[0] - b[0])
  const mergeArr = [sortArr[0]]

  for (let i = 1; i < sortArr.length; i++) {
    const prev = mergeArr[mergeArr.length - 1]
    const curr = sortArr[i]

    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(curr[1], prev[1])
    } else {
      mergeArr.push(curr)
    }
  }
  return mergeArr
}

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18]
  ])
)
