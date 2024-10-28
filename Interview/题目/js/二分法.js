function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = (left + right) >> 1

    if (arr[mid] === target) {
      return mid // 找到目标元素，返回其索引
    } else if (arr[mid] < target) {
      left = mid + 1 // 在右半部分继续搜索
    } else {
      right = mid - 1 // 在左半部分继续搜索
    }
  }

  return -1 // 未找到目标元素，返回 -1
}

// 示例
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const target = 5
const result = binarySearch(arr, target)
console.log(result) // 输出: 4
