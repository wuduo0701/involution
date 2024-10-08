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
  // 边界条件检查，确保当前坐标在网格范围内且当前单元格未被访问过
  if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1 || grid[i][j] === '0')
    return // 如果超出边界或当前单元格为'0'，则返回

  grid[i][j] = '0' // 将当前单元格标记为'0'，表示已访问，防止重复计算
  // 向上方深度优先搜索
  dfs(grid, i - 1, j, rows, cols)
  // 向下方深度优先搜索
  dfs(grid, i + 1, j, rows, cols)
  // 向左方深度优先搜索
  dfs(grid, i, j - 1, rows, cols)
  // 向右方深度优先搜索
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
