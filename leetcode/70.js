// 70. 爬楼梯
// > 递归、动态规划
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 示例 1：

// 输入：n = 2
// 输出：2
// 解释：有两种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶
// 2. 2 阶

// 示例 2：

// 输入：n = 3
// 输出：3
// 解释：有三种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶

function jump(n) {
  if (n < 1) return
  if (n === 1) return 1
  if (n === 2) return 2
  return jump(n - 1) + jump(n - 2)
}
function jumpDP(n) {
  if (n < 1) return
  if (n === 1) return 1
  if (n === 2) return 2

  let n1 = 1,
    n2 = 2,
    num = 0
  for (i = 3; i <= n; i++) {
    num = n1 + n2
    n1 = n2
    n2 = num
  }
  return num
}
console.log(jump(2))
console.log(jump(3))
console.log(jump(8))

console.log(jumpDP(2))
console.log(jumpDP(3))
console.log(jumpDP(8))
