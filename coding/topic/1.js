//写一个group函数可以对数组进行分类，接收一个函数作为参数，返回一个对象.

//调用如下

array = [0, 1, 2, 3, 4]

ruleFn = (item, index, array) => {
  return item % 2 == 0 ? 'odd' : 'even'
}

array.group(ruleFn)

//结果如下

// {odd:[1,3],even:[0,2,4]}
