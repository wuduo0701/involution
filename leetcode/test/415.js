var addStrings = function (num1, num2) {
  if (!num1) return num2
  if (!num2) return num1

  let n1 = num1.length - 1
  let n2 = num2.length - 1
  let carry = 0
  let result = []
  while (n1 >= 0 || n2 >= 0 || carry) {
    let digit1 = n1 >= 0 ? Number(num1[n1]) : 0
    let digit2 = n2 >= 0 ? Number(num2[n2]) : 0

    let sum = digit1 + digit2 + carry

    result.push(sum % 10)
    carry = Math.floor(sum / 10)

    n1--
    n2--
  }
  return result.reverse().join('')
}
console.log(addStrings('11', '123'))
