#### 关于我的学习笔记

以前在github上写笔记，都需要手动在README.md中添加笔记链接。🙃好麻烦啊...

写了个index.js，自动扫描md文件夹中的markdown文件，生成READEME.md，[去看看index.js](./index.js)

ok，readme是可以生成了，但是每次提交之前，都需要运行一下 `node index.js` 。🙃好麻烦啊...

使用npm script，添加git钩子。具体步骤：

1. 安装[husky](https://github.com/typicode/husky)
2. 在package.json中添加如下script:

```javascript
"scripts": {
    "precommit": "node index.js; git add .;"
}
```

这样，在`git commit -m "xxx"`时，就会执行一下index.js，生成的README.md也通过`git add .`添加到了暂存区

可以正常支持git push，将修改提交到远程啦~~~
