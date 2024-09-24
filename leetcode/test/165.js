var compareVersion = function (version1, version2) {
  let num1 = version1.split('.'),
    num2 = version2.split('.')

  let n1 = 0,
    n2 = 0
  const maxLen = Math.max(num1.length, num2.length)
  while (n1 < maxLen || n2 < maxLen) {
    const v1 = num1[n1] ? Number(num1[n1]) : 0
    const v2 = num2[n2] ? Number(num2[n2]) : 0

    if (v1 > v2) return 1
    if (v1 < v2) return -1
    n1++
    n2++
  }
  return 0
}
let version1 = '1.0',
  version2 = '1.0.0.0'
console.log(compareVersion(version1, version2))
