setTimeout(() => console.log(1))
new Promise((resolve) => {
  resolve()
  console.log(2)
}).then(() => {
  setTimeout(() => console.log(3))
  console.log(4)
  Promise.resolve()
    .then(() => {
      console.log(5)
    })
    .then(() => {
      Promise.resolve().then(() => {
        console.log(6)
      })
    })
})

console.log(7)

// 2 7 4 5 6 1 3
