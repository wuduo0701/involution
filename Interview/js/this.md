## this 指向

> 函数执行的上下文环境，共分下面四种：默认绑定、隐式绑定、显示绑定、new 绑定。优先级从左往右依次递增

### 默认绑定

> 函数调用时无任何调用前缀的情景，即区别于其他的情况
> ！！默认指向全局 window 对象（非严格模式），严格模式环境中，默认绑定的 this 指向 undefined

### 隐式绑定

> 可以作为某个对象方法调用，这时候指向这个对象上一级。

```js
// 特殊情况
var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a) //undefined
      console.log(this) //window
    }
  }
}
var j = o.b.fn
o.b.fn() // 正常fn是被b调用的，会正常输出a
j() // this指向的是window，这里的大家需要记住，this永远指向的是最后调用它的对象
```

### new 绑定

> 通过构建函数 new 关键字生成一个实例对象，此时 this 指向这个实例对象

### 显示绑定

> 通过 call、apply、bind 显示的改变 this 指向。它的第一个参数就表示改变后的调用这个函数的对象

### 箭头函数

> 箭头函数不会受显示绑定影响，this 在创建时就已经确定，它继承自外围（定义位置的）上下文。

### 相关题目

```js
var name = 'window'

var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }

person1.foo1() // person1 -> 隐式绑定
person1.foo1.call(person2) // person2 -> 显示绑定

person1.foo2() // window -> 箭头函数没有this指向，默认用父级作用域，父级作用域为window（person1对象没有块级作用域）
person1.foo2.call(person2) // window -> 同理于上，箭头函数导致用的window作用域，call失效

person1.foo3()() //window -> 返回的函数，在windows调用
person1.foo3.call(person2)() // window -> 返回的函数，在windows调用
person1.foo3().call(person2) // person2 -> 返回的函数，但是由于使用了call显示绑定

person1.foo4()() // person1(箭头函数不绑定this, 上层作用域this是person1)
person1.foo4.call(person2)() // person2 -> 先是给foo4这个方法绑定了一个this为person2  再次调用foo4()的时候为箭头函数 它的上层作用域被显示的绑定了一个person2
person1.foo4().call(person2) //person2 -> 因为先执行了foo4 返回的结果是一个箭头函数 箭头函数是不可以绑定this的 所以当调用这个箭头函数的时候 以及寻找上层作用域 (上层找到person1)
```

```js
var name = 'window'

function Person(name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = () => {
    return console.log(this.name)
  }
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

// person1/person都是对象(实例instance)
var person1 = new Person('person1')
var person2 = new Person('person2')

// 面试题目:
person1.foo1() // person1
person1.foo1.call(person2) // person2

person1.foo2() // person1
person1.foo2.call(person2) //person1

person1.foo3()() // window
person1.foo3.call(person2)() // window
person1.foo3().call(person2) // person2

person1.foo4()() // person1
person1.foo4.call(person2)() // person2     ！！！！！（关注这两区别）链式调用到foo4时，foo4未执行，返回的是一个函数，通过call指针绑定到person2上面，再次执行的话。返回的是一个箭头函数，则会查找上层作用域，为上面绑定的call对象，即person2
person1.foo4().call(person2) // person1     ！！！！！（关注这两区别）链式调用到foo4时，foo4执行了，则会查找上层作用域。此时上层作用域为隐式调用的person1，后续的call绑定失效，返回最终结果person1
```

### apply、call、bind 的区别

- 三者都可以改变函数的 this 对象指向
- 三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window
- 三者都可以传参，但是 apply 是数组，而 call 是参数列表，且 apply 和 call 是一次性传入参数，而 bind 可以分为多次传入
- bind 是返回绑定 this 之后的函数，apply、call 则是立即执行

### new 操作符具体干了什么

1. 创建了一个新对象
2. 将新对象与构建函数通过原型链连接起来
3. 将构建函数中的 this 绑定到新建的对象 obj 上
4. 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

```js
function myNew(Fun, ...args) {
  const obj = {}
  obj.__proto__ = Fun.prototype
  let result = obj.apply(Fun, args)
  // 4.根据返回值判断
  return result instanceof Object ? result : obj
}
```
