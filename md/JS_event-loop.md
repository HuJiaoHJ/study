# 深入理解Event Loop

先来个面试题~

```
setTimeout(function () {
    console.log(4);
}, 0);
new Promise(function (resolve) {
    console.log(1);
    resolve();
    console.log(2);
}).then(function () {
    console.log(5);
});

console.log(3);
```

结果：1 2 3 5 4

为什么先输出5，在输出4，这就是event loop相关的知识啦~

## 简介

event loop，即事件循环。

在ECMA规范中没有这个概念，它是执行环境实现的，是用来实现异步的一种方式。

所以在不同执行环境（浏览器、Node）中，实现也不一样，所以分别介绍浏览器和Node中的event loop。

在[HTML标准](https://w3c.github.io/html/webappapis.html#event-loops)中，说event loop有两种类型：browsing context、workers，这里就只介绍browsing context这种类型了

## Browsing Context Event Loop（浏览器环境中的事件循环）

1、An event loop has one or more **task/macrotask queues**

* event callback
* setTimeout
* setInterval
* ...

2、Each event loop has a **microtask queue**

* Promises
* Object.observe(Obsolete)
* MutationObserver

**过程**

![browsing-context-event-loop](https://user-images.githubusercontent.com/11912260/26928488-da049906-4c88-11e7-9672-db6435af2509.png)

**面试题过程分析**

代码：

```
setTimeout(function () {
    console.log(4);
}, 0);
new Promise(function (resolve) {
    console.log(1);
    resolve();
    console.log(2);
}).then(function () {
    console.log(5);
});

console.log(3);
```

* 执行整体代码（整体代码也是task），执行过程中，将setTimeout callback放入task queue中，输出1，调用resolve()，将promise callback放入microtask queue中，输出2，输出3，整体代码执行结束
* microtask queue不为空，取出最老的microtask，即promise callback，执行，输出5，执行结束
* task queue不为空，取出最老的task，即setTimeout callback，执行，输出4，执行结束
* 综上，整个event loop就结束了，分别输出1 2 3 5 4

**习题**

```
console.log('start')

const interval = setInterval(() => {
    console.log('setInterval')
}, 0);

setTimeout(() => {
    console.log('setTimeout 1')
    Promise.resolve()
        .then(() => {
            console.log('promise 3')
        })
        .then(() => {
            console.log('promise 4')
        })
        .then(() => {
            setTimeout(() => {
                console.log('setTimeout 2')
                Promise.resolve()
                .then(() => {
                    console.log('promise 5')
                })
                .then(() => {
                    console.log('promise 6')
                })
                .then(() => {
                    clearInterval(interval)
                })
        }, 0);
    });
}, 0);

Promise.resolve()
    .then(() => {
        console.log('promise 1')
    })
    .then(() => {
        console.log('promise 2')
    });
```

结果：自己去跑一下~

## Node Event Loop（Node环境中的事件循环）

### 六个阶段

* **timers**: this phase executes callbacks scheduled by setTimeout() and setInterval()
* **I/O callbacks**: this phase executes callbacks for some system operations
* **idle,prepare**: only used internally
* **poll**: retrieve new I/O events; node will block here when appropriate
* **check**: setImmediate() callbacks are invoked here
* **close callbacks**: e.g. socket.on('close', ...)

**注意：这六个阶段都不包括process.nextTick()**

> Each phase has a FIFO queue of callbacks to execute. While each phase is special in its own way, generally, when the event loop enters a given phase, it will perform any operations specific to that phase, then execute callbacks in that phase's queue until the queue has been exhausted or the maximum number of callbacks has executed. When the queue has been exhausted or the callback limit is reached, the event loop will move to the next phase, and so on.

每一个阶段都有一个装有callbacks的fifo队列，当event loop运行到一个指定阶段时，node将执行该阶段的fifo队列，当队列callback执行完或者执行callbacks数量超过该阶段的上限时，event loop会转入下一下阶段

**过程**

![node-event-loop](https://user-images.githubusercontent.com/11912260/26928541-0f94afca-4c89-11e7-8ee8-2676003d4795.png)

### poll阶段

**The poll phase has two main functions：**
* Executing scripts for timers whose threshold has elapsed, then
* Processing events in the poll queue

**过程**

![poll-phase](https://user-images.githubusercontent.com/11912260/26928552-1b973d60-4c89-11e7-9ab9-12c08b6586e1.png)

**阻塞超时机制**

> Once the poll queue is empty the event loop will check for timers whose time thresholds have been reached. If one or more timers are ready, the event loop will wrap back to the timers phase to execute those timers' callbacks.

如果poll阶段为空闲状态时，event loop将检查timers，如果有1个或多个timer时间已经到达，event loop将按循环顺序进入 timers 阶段，并执行timer queue

**DEMO**

代码：

```
const fs = require('fs');

function someAsyncOperation (callback) {
    fs.readFile(__dirname + '/' + __filename, callback);
}

let timeoutScheduled = Date.now();

setTimeout(() => {
    let delay = Date.now() - timeoutScheduled;
    console.log('setTimeout: ' + (delay) + "ms have passed since I was scheduled");
}, 10);

setImmediate(() => {
    let inmmediateTime = Date.now();
    console.log('setImmediate: ', inmmediateTime - timeoutScheduled);
});

someAsyncOperation(() => {
    let fileReadtime = Date.now();
    console.log('fileReadTime:', fileReadtime - timeoutScheduled);
    while(Date.now() - fileReadtime < 20) {

    }
});
```

结果：

![poll-demo-1](https://user-images.githubusercontent.com/11912260/26928562-2b9413c8-4c89-11e7-8853-96b7f8d928f6.png)

过程分析：

* 初始化event loop，进入timers阶段，此时没有到达时间的timer（setTimeout需要10ms）
* 进入I/O callbacks阶段，无callback，跳过
* 进入poll阶段，因为读取文件需要2ms（不同环境、时间，这个时间可能不一样），所以在2ms的时候，调用readFile的callback，输出第一行，此时callback需要执行20ms
* 在22ms的时候，callback执行结束，poll queue为空，因为设置了setImmediate callback，所以结束poll阶段，进入check阶段，执行setImmediate callback，输出第二行
* check阶段执行完之后，顺序循环到下一个event loop的timers阶段，执行setTimeout callback，输出第三行

**DEMO**

代码：

```
const fs = require('fs');

function someAsyncOperation (callback) {
    fs.readFile(__dirname + '/' + __filename, callback);
}

let timeoutScheduled = Date.now();

setTimeout(() => {
    let delay = Date.now() - timeoutScheduled;
    console.log('setTimeout: ' + (delay) + "ms have passed since I was scheduled");
}, 10);

someAsyncOperation(() => {
    let fileReadtime = Date.now();
    console.log('fileReadTime:', fileReadtime - timeoutScheduled);
    while(Date.now() - fileReadtime < 20) {

    }
});
```

结果：

![poll-demo-2](https://user-images.githubusercontent.com/11912260/26928583-38272404-4c89-11e7-8abf-ed0c58cd345e.png)

过程分析：

* 和上一个demo一样，进入poll阶段，在2ms时，执行readFile callback，输出第一行，22ms时，执行结束，poll queue为空，没有设置setImmediate callback，在此阶段阻塞
* 和上面提到的阻塞超时机制，此时，event loop会检查timers，发现setTimeout时间已经达到，跳出poll阶段，顺序循环到下一个event loop的timers阶段，执行setTimeout callback，输出第二行

### setImmediate VS setTimeout

比较两段代码：

```
setTimeout(function timeout () {
  console.log('timeout');
},0);
setImmediate(function immediate () {
  console.log('immediate');
});
```

结果：执行顺序不定

```
var fs = require('fs')

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout')
    }, 0);
    setImmediate(() => {
        console.log('immediate')
    });
});
```

结果：先执行setImmediate callback，再执行setTimeout callback

第二段代码结果比较好理解，这里就详述了，重点说一下第一段代码为什么出现执行顺序不一定的结果

首先，setImmediate和setTimeout的区别如下：

* setImmediate是在check阶段执行，即在poll阶段完成后
* setTimeout是在timers阶段执行

主要是因为node对setTimeout的实现，在[Node文档](https://nodejs.org/dist/latest-v6.x/docs/api/timers.html#timers_settimeout_callback_delay_args)中有这样一句话，When delay is larger than 2147483647  or less than 1, the delay will be set to 1，而node的核心作者也说过这样一段话：

![node-settimeout-0](https://user-images.githubusercontent.com/11912260/26928594-447adc46-4c89-11e7-8fef-f4e04dc4d475.png)

所以，执行setTimeout(fn, 0)相当于执行setTimeout(fn, 1)，而event loop的初始化耗时就会影响执行顺序，有这两种情况：

* event loop初始化耗时小于1ms，这时，进入timers阶段，setTimeout时间还未到达，所以顺序循环到check阶段，先执行setImmediate，然后再顺序循环到下一个event loop的timers阶段，执行setTimeout
* event loop初始化耗时大于1ms，这时，进入timers阶段，setTimeout时间已到达，所以先执行setTimeout，再顺序循环到check阶段，执行setImmediate

以上，就是第一段代码结果的原因

这里提到了node对setTimeout的delay时间设置为0ms的处理，顺便提一下大家常说的4ms，在[HTML标准](https://html.spec.whatwg.org/multipage/webappapis.html#timer-initialisation-steps)里面有这么两句话：

* If timeout is less than 0, then set timeout to 0.
* If nesting level is greater than 5, and timeout is less than 4, then set timeout to 4.

从上面可以看到，4ms只是HTML的标准，且是当嵌套超过5层，时间小于4ms，才会将最小时间设置为4ms

### process.nextTick()

* process.nextTick() is not technically part of the event loop
* the nextTickQueue will be processed after the current operation completes, regardless of the current phase of the event loop.
* process.nextTick()是node早期版本无setImmediate时的产物，node文档里面也说了，推荐我们尽量使用setImmediate

**process.nextTick() VS setTimeout()**

* process.nextTick()不在event loop的任何阶段执行，而是在各个阶段切换的中间执行
* setImmediate()则是在check阶段执行

```
var fs = require('fs');

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('setTimeout');
    }, 0);
    setImmediate(() => {
        console.log('setImmediate');
        process.nextTick(()=>{
            console.log('nextTick3');
        });
    });
    process.nextTick(()=>{
        console.log('nextTick1');
    });
    process.nextTick(()=>{
        console.log('nextTick2');
    });
});
```

结果：自己跑一下吧，过程比较简单，就不详述了

## 其他

### task/microtask VS Job Queue

task/microtask是HTML标准用来实现event loop，而Job Queue是ECMA规范的东西，是没有联系的

### setImmediate、process.nextTick()说成是task、microtask，这是错误的

本文也说了，不同的执行环境，对event loop的实现也是不一样的

setImmediate是node event loop阶段里的东西，而process.nextTick()是node早期版本无setImmediate时的产物，这两个都是node的东西

task、microtask是HTML标准用来实现event loop

综上，不同执行环境的阶段的事件，其执行顺序应该放在各自的执行环境的event loop中去判断

## 参考

* [HTML标准-Event Loop](https://w3c.github.io/html/webappapis.html#event-loops)
* [Node Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
* [Job and Job Queue](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues)
* [Difference between microtask and macrotask within an event loop context](https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context)
* [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

## 扩展

* [Node Event Loop过程源码](https://github.com/nodejs/node/blob/master/deps/uv/src/unix/core.c#L332-L381)
* [Vue利用microtask实现nextTick](https://github.com/vuejs/vue/blob/v2.3.3/src/core/util/env.js#L63-L147)
* [https://github.com/latentflip/loupe](https://github.com/latentflip/loupe)
