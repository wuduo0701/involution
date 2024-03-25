Array.prototype.myMethod = () => {
  console.log(this)
}
// Array.prototype.myMethod = function () {
//   console.log(this)
// }

console.log([1].myMethod())
