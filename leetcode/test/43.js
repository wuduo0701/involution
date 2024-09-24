var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return '0'
  let n1 = num1.length,
    n2 = num2.length
  let arr = new Array(n1 + n2).fill(0)
  for (let i = n1 - 1; i >= 0; i--) {
    for (let j = n2 - 1; j >= 0; j--) {
      arr[i + j + 1] += +num1[i] * +num2[j]
    }
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i - 1] += Math.floor(arr[i] / 10)
    arr[i] %= 10
  }
  let i = 0
  while (i >= 0 && arr[i] === 0) {
    i++
  }
  return arr.slice(i).join('')
}
let num1 = '123',
  num2 = '456'
console.log(multiply(num1, num2))
