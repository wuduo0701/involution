function quick(nums) {
  const sort = (arr) => {
    let middle = arr[0],
      leftArr = [],
      rightArr = []
    if (arr.length <= 1) return arr
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < middle) {
        leftArr.push(arr[i])
      } else {
        rightArr.push(arr[i])
      }
    }
    return [...sort(leftArr), middle, ...sort(rightArr)]
  }
  return sort(nums)
}

let Arr = [1, 3, 2, -2, 0, 7, 6, 4]
console.log(quick(Arr))
