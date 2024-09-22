var detectCycle = function (head) {
  let fast = head,
    slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      let ans = head
      while (ans !== slow) {
        slow = slow.next
        ans = ans.next
      }
      return ans
    }
  }
  return null
}
