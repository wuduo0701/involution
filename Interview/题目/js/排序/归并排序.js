function mergeSort(nums) {
  if (nums.length < 2) return nums
  let middle = nums.length >> 1
  const left = nums.slice(0, middle)
  const right = nums.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
  const result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  return result.concat(left).concat(right)
}

console.log(mergeSort([49, 38, 65, 97, 76, 13, 27]))
