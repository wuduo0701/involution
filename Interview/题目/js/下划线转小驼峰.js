function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (match, letter) => {
    return letter.toUpperCase()
  })
}

console.log(toCamelCase('example_variable_name'))
