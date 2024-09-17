function rotate(nums, k) {
  if (k === 0) return nums

  const reverse = (arr, start, end) => {
    while (start < end) {
      ;[arr[start], arr[end]] = [arr[end], arr[start]]
      start++
      end--
    }
    return arr
  }
  k = (k % nums.length) - 1 // 处理k大于数组长度的情况

  reverse(nums, 0, nums.length - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, nums.length - 1)
}
