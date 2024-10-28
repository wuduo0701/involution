1. 实例的 proto 指向构造函数的 prototype
2. `person.__proto__.__proto__`指向 Object。会顺着原型链查找属性和方法
3. 如构造函数定义了属性，后又返回了对象。则实例会继承这个对象里的属性
   ```js
   function Persion(name) {
     this.name = name
     // 这里会继承return里的对象
     return {
       a: 1,
       b: 2
     }
   }
   ```
4. 静态方法，实例无法继承。只有挂载在 prototype 上的属性和方法才能继承
5. 原型 prototype 只有构造函数拥有
6. 详情看 2.js
