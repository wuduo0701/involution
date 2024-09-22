var mergeTwoLists = function (list1, list2) {
  let dummy = new ListNode()
  let curr = dummy
  while (list1 && list2) {
    if (list1.val < list2.val) {
      curr.next = list1
      list1 = list1.next
    } else {
      curr.next = list2
      list2 = list2.next
    }
    curr = curr.next
  }
  curr.next = list1 === null ? list2 : list1
  return dummy.next
}
