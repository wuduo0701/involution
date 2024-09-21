let a = {
    b: 1
  },
  b = {
    c: 2222
  }

a.__proto__ = b
console.log(a.c)
