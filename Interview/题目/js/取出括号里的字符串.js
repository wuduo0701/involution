// 1.取出括号中的字符串，比如(a+b)*(c+a*(d+e))
function extractParenthesesContent(str) {
  const regex = /\(([^()]+)\)/g
  const result = []
  let match = regex.exec(str)

  while (match !== null) {
    result.push(match[1])
    match = regex.exec(str)
  }

  return result
}

console.log(extractParenthesesContent('(a+b)*(c+a*(d+e))'))
