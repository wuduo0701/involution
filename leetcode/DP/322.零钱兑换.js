/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
// 你可以认为每种硬币的数量是无限的。

// 示例 1：
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1

// 示例 2：
// 输入：coins = [2], amount = 3
// 输出：-1

// 示例 3：
// 输入：coins = [1], amount = 0
// 输出：0
// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

// dp[i]: 凑成金额i所需的最少硬币数
// 状态转移方程：dp[i] = min(dp[i], dp[i - coin] + 1)

// 1. 凑成i，可能有无数解法，需要取min
// 2. 最少硬币数，可能是dp[i]本身，或者从需要一个金额coin的才能凑成，则从dp[i - coin]中取得个数，在加上本身
var coinChange = function (coins, amount) {
  if (coins.length === 0) return -1
  coins.sort((a, b) => b - a)
  let dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}
// @lc code=end
console.log(coinChange([1, 2, 5], 11))
