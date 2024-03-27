var obj = { a: 'b' }
function fc(p) {
  p = { a: 'c' }
}
fc(obj)
console.log(obj.a)
