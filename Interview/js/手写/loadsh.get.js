function _get(source, path, defaultValue = undefined) {
  // translate array case to dot case, then split witth .
  // a[0].b -> a.0.b -> ['a', '0', 'b']
  const keyList = path.replace(/\[(\d+)\]/g, '.$1').split('.') // a[0].b转换为点表示法（例如 a.0.b）

  const result = keyList.reduce((obj, key) => {
    return Object(obj)[key] // null undefined get attribute will throwError, Object() can return a object
  }, source)
  return result === undefined ? defaultValue : result
}

// 例子
const data = {
  user: {
    name: 'Alice',
    age: 30,
    address: {
      city: 'Wonderland',
      zip: '12345'
    },
    friends: [{ name: 'Bob' }, { name: 'Charlie' }]
  }
}
const name = _get(data, 'user.name') // 'Alice'
const city = _get(data, 'user.address.city') // 'Wonderland'
const friendName = _get(data, 'user.friends[1].name') // 'Charlie'
console.log(name, city, friendName)
