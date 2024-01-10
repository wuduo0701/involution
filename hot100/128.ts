// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

// 示例 1：

// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
// 示例 2：

// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9

/**
 * 最长连续序列
 * NOTE: 解题思路
 * 1、先给数组去重+排序。得到一个唯一的顺序数组numsSort
 * 2、创建hashMap结构为【key：最开始的连续数字，value：连续的长度】
 * 3、循环数组numsSort。只要hashMap[数组当前value - 连续的长度value]存在，则长度+1；否则从新累计长度1
 * 4、对最后的hashMap-value求最大值
 */
const longestConsecutive = (nums: number[]): number => {
  const numsSort = [...new Set(nums)].sort((a, b) => a - b) // 去重 + 排序
  const numsMap = new Map<number, number>() // hashMap结构【key：最开始的连续数字，value：连续的长度】
  const numsLength = numsSort.length

  if (numsLength === 0) return 0
  if (numsLength === 1) return 1

  let i = 1,
    numTemp = 1

  numsMap.set(numsSort[0], 1)
  while (i < numsLength) {
    let numPrev = numsSort[i] - numTemp
    if (numsMap.get(numPrev)) {
      numTemp++
      numsMap.set(numPrev, numsMap.get(numPrev) + 1)
    } else {
      numTemp = 1
      numsMap.set(numsSort[i], 1)
    }
    i++
  }
  return Math.max(...numsMap.values())
}
const nums1 = [100, 4, 200, 1, 3, 2]
const nums2 = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
console.log(longestConsecutive(nums1))
console.log(longestConsecutive(nums2))
