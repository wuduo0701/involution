console.log('1')
setTimeout(() => {
  console.log('2')
}, 0)
requestAnimationFrame(() => {
  console.log('3')
})
requestIdleCallback(() => {
  console.log('4')
})
new Promise((resolve) => {
  console.log('5')
}).then((value) => {
  console.log(value)
})
async function a() {
  console.log(await '7')
}
a()
console.log('8')
