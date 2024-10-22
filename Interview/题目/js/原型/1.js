class foo {
  constructor(arr) {
    this.arr = arr
  }
  bar(n) {
    return this.arr.slice(0, n)
  }
}

var f = new foo([1, 2, 3, 4])

console.log(f.bar(1)) // [1]
console.log(f.bar(2).splice(1, 1)) // [2]
console.log(f.arr) // [1,2,3,4]

f.arr[1] = 3

console.log(f.arr) // [1,2,3,4]
