#### Object

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics

* `.` `[]` 可以get和set对象属性和方法，除了可以set已存在的对象属性和方法之外，还可以set新的属性和方法
* `[]` 可以用来set属性和方法的key值，而 `.` 只能用来set属性和方法的value
```
dot notation can only accept a literal member name, not a variable value pointing to a name.
```
* `.` 只能接受字面量，而`[]`可以接受变量

##### 自动创建对象实例

比如，`let str = '123';` 创建一个字符串，字符串会自动被创建为字符串（String）的实例，所以str变量可以像对象一样使用`.` `[]`进行一些操作，比如`str.length`

# 类似字符串的内键对象和API有哪些？

不是所有内键的对象和API都会自动创建对象的实例，比如Notification，在使用时，需要调用new创建对象的实例 `let myNotification = new Notification('Hello')`
