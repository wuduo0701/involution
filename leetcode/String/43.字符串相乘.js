/*
 * @lc app=leetcode.cn id=43 lang=javascript
 *
 * [43] 字符串相乘
 * 给定两个以字符串形式表示的非负整数 num1 和 num2
 * 返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 * 注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。
 */
// 示例 1:
// 输入: num1 = "2", num2 = "3"
// 输出: "6"

// 示例 2:
// 输入: num1 = "123", num2 = "456"
// 输出: "56088"

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return '0'
  const n1 = num1.length
  const n2 = num2.length
  const arr = Array(n1 + n2).fill(0) // 最大长度，乘积需要最大 n1+n2 长度的数组存储

  for (let i = n1 - 1; i >= 0; i--) {
    for (let j = n2 - 1; j >= 0; j--) {
      // 依次计算乘积的每一位
      arr[i + j + 1] += +num1[i] * +num2[j]
    }
  }

  // 进位
  for (let i = arr.length - 1; i > 0; i--) {
    arr[i - 1] += Math.floor(arr[i] / 10) //计算进位+本身数
    arr[i] %= 10 // 保留当前的个位数
  }
  // 去除前导0。如'123' * '456' = [ 0, 5, 6, 0, 8, 8 ]
  // 需要前面第一位
  let i = 0
  while (i < arr.length && arr[i] === 0) {
    i++
  }
  return arr.slice(i).join('')
}
// @lc code=end
