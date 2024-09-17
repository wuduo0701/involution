// [2,7,11,15]
function twoSum(nums, target) {
  // const needNum
  const map = new Map()
  for (let index = 0; index < nums.length; index++) {
    const needNum = target - nums[index]
    if (map.get(needNum) === undefined) {
      map.set(nums[index], index)
    } else {
      return [index, map.get(needNum)]
    }
  }
}
console.log(twoSum([2, 7, 11, 15], 9))
console.log(twoSum([3, 2, 4], 6))
