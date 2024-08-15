let pending = false
let callbacks = [] // 定义nextTick回调队列

function flushCallbacks() {
  callbacks.forEach((cb) => cb())
  callbacks = []
  pending = false
}

//定义异步方法，优先使用微任务实现
let timerFunc

// 优先使用方法 Promise -> MutationObserver -> setInterval -> setTimeout
if (Promise) {
  timerFunc = () => {
    return Promise.resolve().then(flushCallbacks)
  }
} else if (MutationObserver) {
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode('1')
  observer.observe(textNode, { characterData: true })

  timerFunc = () => {
    textNode.textContent = '2'
  }
} else if (setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// 定义nextTick方法
export function nextTick(cb) {
  callbacks.push(cb) // 推入异步队列
  if (!pending) {
    pending = true
    timerFunc()
  }
}
