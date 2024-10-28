// This is a JavaScript Quiz from BFE.dev

;(() => {
  // 函数作用域内部无fn，所以为true
  if (!fn) {
    function fn() {
      console.log('2')
    }
  }
  fn() // 执行内部的fn，输出2
})()

function fn() {
  console.log('1')
}
