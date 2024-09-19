var maxProfit = function (prices) {
  let ans = 0,
    buy = prices[0]
  for (let i = 1; i < prices.length; i++) {
    const current = prices[i]
    if (current < buy) {
      buy = current
    } else {
      ans = Math.max(ans, current - buy)
    }
  }
  return ans
}
console.log(maxProfit([7, 1, 5, 3, 6, 4]))
