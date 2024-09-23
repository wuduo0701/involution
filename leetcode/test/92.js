function reserve(head, left, right) {
  if (!head || left === right) return head
  let dummy = new LinkList(-1, head)
  let prev = dummy
  for (let i = 0; i < left - 1; i++) {
    prev = prev.next
  }

  let curr = prev.next
  for (let i = 0; i < right - left; i++) {
    let next = curr.next
    curr.next = next.next
    next.next = prev.next
    prev.next = next
  }
  return dummy.next
}
