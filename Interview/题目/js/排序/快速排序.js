function quickSort(Array) {
  const sort = (arr) => {
    if (arr.length <= 1) return arr
    let left = [],
      right = [],
      middle = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < middle) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return [...quickSort(left), middle, ...quickSort(right)]
  }
  return sort(Array)
}
