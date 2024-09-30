/**
 * 将数字格式化为千分位表示法
 * @param {number} number - 需要格式化的数字
 * @returns {string} 格式化后的字符串
 */
function thoundNum(number) {
  // 分割整数和小数部分
  ;[intPart, decimalPart] = (number + '').split('.')

  let result = []
  // 反转
  for (let i = intPart.length - 1, j = 1; i >= 0; i--, j++) {
    result.push(intPart[i])
    if (j % 3 === 0 && i !== 0) {
      result.push(',')
    }
  }
  let intFormated = result.reverse().join('')
  return decimalPart ? `${intFormated}.${decimalPart}` : intFormated
}

console.log(thoundNum(222122122.6754))
