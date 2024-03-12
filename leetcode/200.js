// 200.岛屿数量
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
// 此外，你可以假设该网格的四条边均被水包围。

// 示例 1：
// 输入：grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// 输出：1

// 示例 2：
// 输入：grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// 输出：3

// 时间复杂度O(m+n)
var numIslands = function (grid) {
  let rows = grid.length
  if (rows === 0) return
  let cols = grid[0].length,
    ans = 0

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 只有碰到的第一个岛屿1，才进行深度遍历
      if (grid[i][j] === '1') {
        dfs(grid, i, j, rows, cols)
        ans++
      }
    }
  }
  return ans
}
// DFS 深度优先遍历
var dfs = function (grid, i, j, rows, cols) {
  // 边界条件
  if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1 || grid[i][j] === '0')
    return

  grid[i][j] = '0' // 遍历过的，就置为0，防止多次计算
  // 向四周深度遍历
  dfs(grid, i - 1, j, rows, cols)
  dfs(grid, i + 1, j, rows, cols)
  dfs(grid, i, j - 1, rows, cols)
  dfs(grid, i, j + 1, rows, cols)
}

let grid1 = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
  ],
  grid2 = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
  ]
console.log(numIslands(grid1))
console.log(numIslands(grid2))
