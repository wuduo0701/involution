var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode()
  let curr = dummy
  let carry = 0
  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2.val || 0) + carry
    carry = Math.floor(sum / 10)
    curr.next = new ListNode(sum % 10)
    curr = curr.next

    l1 = l1?.next
    l2 = l2?.next
  }
  return dummy.next
}
