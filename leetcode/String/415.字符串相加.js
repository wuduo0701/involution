/*
 * @lc app=leetcode.cn id=415 lang=javascript
 *
 * [415] 字符串相加
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 * 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。
 */
// 示例 1：
// 输入：num1 = "11", num2 = "123"
// 输出："134"

// 示例 2：
// 输入：num1 = "456", num2 = "77"
// 输出："533"

// 示例 3：
// 输入：num1 = "0", num2 = "0"
// 输出："0"

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  if (!num1) return num2
  if (!num2) return num1

  let n1 = num1.length - 1,
    n2 = num2.length - 1
  let carry = 0, // 处理前面的进位
    result = []

  while (n1 >= 0 || n2 >= 0 || carry) {
    let digit1 = n1 >= 0 ? Number(num1[n1]) : 0,
      digit2 = n2 >= 0 ? Number(num2[n2]) : 0

    const sum = digit1 + digit2 + carry

    result.push(sum % 10) // 去进位完剩余的数，即余数
    carry = Math.floor(sum / 10) // 下一次的进位是对10除完后的

    // 各自移动下标
    n1--
    n2--
  }

  return result.reverse().join('')
}
// @lc code=end

console.log(addStrings('11', '123'))
console.log(addStrings('456', '77'))
console.log(addStrings('123', '789'))
