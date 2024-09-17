const sortColors = (nums) => {
  let n0 = 0,
    n1 = 0
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    nums[i] = 2
    if (num < 2) {
      nums[n1++] = 1
    }
    if (num < 1) {
      nums[n0++] = 0
    }
  }
}
