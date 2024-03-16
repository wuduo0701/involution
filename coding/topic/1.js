//计算乘积除以当前项
//传参 [1,2,3,4]
//输出 [24,12,8,6]

function Area(arr) {
  let area = arr.reduce((pre, cur) => {
    return pre * cur
  }, 1)
  return arr.map((item) => area / item)
}

console.log(Area([1, 2, 3, 4]))
