// 找到最接近target的数
function findClosestIndex(nums, target) {
  let left = 0
  let right = nums.length - 1
  let closest = Infinity
  let result = -1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) return mid
    if (nums[mid] < target) {
      left = mid + 1
      if (target - nums[mid] < closest) {
        closest = target - nums[mid]
        result = mid
      }
    } else {
      right = mid - 1
      if (nums[mid] - target < closest) {
        closest = nums[mid] - target
        result = mid
      }
    }
  }

  return result
}

const nums = [-1, 0, 3, 5, 9, 12]
const target = 100

console.log(findClosestIndex(nums, target))
