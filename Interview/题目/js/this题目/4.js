function O() {
  this.x = 1
  this.print = function () {
    console.log(this.x)
  }
}
var o = new O()

var print = o.print
print() // undefined

var n = { x: 2, print: print }
n.print() // 2
