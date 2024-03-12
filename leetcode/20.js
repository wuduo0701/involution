// 20.有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

// 示例 1：
// 输入：s = "()"
// 输出：true

// 示例 2：
// 输入：s = "()[]{}"
// 输出：true

// 示例 3：
// 输入：s = "(]"
// 输出：false

// NOTE:应该了进出栈的解题思路，括号在栈里肯定具有对称关系
// 只要遇到( { [都推进栈里，遇到 ] 判断下出栈的是不是[；同理 { （ 也是
// 最后求得栈的长度是不是0，如果不是则返回false
var isValid = function (s) {
  if (s.lenght < 2) return false
  if (s.length % 2 !== 0) return false

  let stack = []
  for (let item of s) {
    switch (item) {
      case '(':
      case '[':
      case '{':
        stack.push(item)
        break
      case ')':
        if (stack.pop() !== '(') return false
        break
      case ']':
        if (stack.pop() !== '[') return false
        break
      case '}':
        if (stack.pop() !== '{') return false
        break
    }
  }
  return !stack.length
}
console.log(isValid('()'))
console.log(isValid('()[]{}'))
console.log(isValid('(]'))
console.log(isValid('(([]){})'))
