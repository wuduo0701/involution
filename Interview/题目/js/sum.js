function sum(a) {
  let value = a
  // 内部函数，用于累积参数
  const inner = (b) => {
    value += b // 累加参数
    return inner // 返回自身以便继续调用
  }

  // 定义一个 `value` 属性，返回最终的结果
  inner.value = () => value

  return inner
}

// 使用时需要调用 `value` 方法来获取结果
console.log(sum(1)(2)(3).value()) // 输出 6
