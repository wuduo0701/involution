function isValid(s) {
  if (s.length < 2) return false
  if (s.length % 2 !== 0) return false

  const stack = []
  for (str of s) {
    switch (str) {
      case '(':
      case '{':
      case '[':
        stack.push(str)
        break
      case ')':
        if (stack.pop() !== '(') return false
        break
      case '}':
        if (stack.pop() !== '{') return false
        break
      case ']':
        if (stack.pop() !== '[') return false
        break
    }
  }
  return !stack.length
}

console.log(isValid('()'))
