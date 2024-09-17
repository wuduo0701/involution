const findUnsortedSubarray = (nums) => {
  // const arr = [...nums]
  // arr.sort((a, b) => a - b)
  // let left = 0,
  //   right = arr.length - 1
  // while (left <= right && arr[left] === nums[left]) {
  //   left++
  // }
  // while (left <= right && arr[right] === nums[right]) {
  //   right++
  // }
  // return right - left + 1
  const arr = [...nums]
  arr.sort((a, b) => a - b)
  let [l, r] = [0, arr.length - 1]
  while (l <= r && arr[l] === nums[l]) {
    ++l
  }
  while (l <= r && arr[r] === nums[r]) {
    --r
  }
  return r - l + 1
}
console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]))
