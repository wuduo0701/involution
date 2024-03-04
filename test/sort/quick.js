function quick(array) {
  let sort = (arr) => {
    let leftArr = [],
      rightArr = [],
      middle = arr[0]
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
  return sort(array)
}

let arr1 = [2, 3, 1, 5, 4, 8, 7]
console.log(quick(arr1))
