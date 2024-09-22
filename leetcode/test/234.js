var isPalindrome = function (head) {
  let fast = head,
    slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }

  let prev = null
  let curr = slow
  while (curr) {
    let next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  let left = head,
    right = prev
  while (right) {
    if (left.val !== right.val) return false
    left = left.next
    right = right.next
  }
  return true
}
