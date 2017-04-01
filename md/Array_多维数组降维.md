### 多维数组降维

#### 方法一：reduce + concat方法

##### 实现

```javascript
const flatten = (arr) => {
    return arr.reduce((acc, val) => {
        return acc.concat(Array.isArray(val) ? flatten(val) : val);
    }, []);
};
```

##### `arr.reduce(callback, [initialValue])`

###### 参数

`callback`方法有四个参数

* `accumulator` 上一次调用callback返回的值，或者是`initialValue`
* `currentValue` 数组中正在处理的元素
* `currentIndex` 数组中正在处理的元素的索引，如果提供了`initialValue`，从0开始，否则从1开始
* `array` 调用`reduce`的数组

`initialValue`，可选值，作为第一次调用callback的第一个参数

###### 返回值

函数累计处理的结果，即`accumulator`

##### `arr.concat(val1, [val2, [val3, ...]])`

用于合并两个或多个数组。不改变现有数组，返回一个新数组

###### 参数

参数可以是数组或者非数组值，可以为多个

当参数为非数组时，会插入到arr中，并返回arr

当参数为数组时，会将数组中的元素插入到arr中，并返回arr

#### 方法二：apply + concat方法

> 只能处理二维数组

> reduce或者常规方法都是利用循环遍历的方式实现，此方法可以不需要遍历

##### 实现

```javascript
const flatten = (arr) => {
    return Array.prototype.apply([], arr);
};
```

###### apply & call

共同点：apply和call都是能够改变调用方法的this指向为第一个参数

区别：

* apply的第二个参数是一个数组，该数组的元素将作为调用方法的参数使用
* call第二个参数开始的参数是作为调用方法的参数使用
