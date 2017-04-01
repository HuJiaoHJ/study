#### NPM

https://docs.npmjs.com/

http://javascript.ruanyifeng.com/nodejs/npm.html#toc15

yarn自动替换成yarn

https://yarnpkg.com/en/

##### yarn run

yarn run可以带参数

```javascript
"scripts": {
    "lint": "eslint"
}
```

运行：（命令后--一定要加上，不然参数不能传到命令中）

```
yarn run lint -- . --ext .js --ext .vue
// 等同于
./node_modules/.bin/eslint . --ext .js --ext .vue
```

##### pre & post 脚本

yarn run为每个命令提供pre 和 post两个钩子，如：pretest、test、posttest

常见脚本中比较有意思的：preintsall，在yarn install之前会执行该脚本

也可以直接yarn run pre-xxx

##### 安装husky模块，可以使用git相关钩子

https://github.com/typicode/husky

precommit、prepush

##### yarn link

开发npm模块时，可以使用yarn link实现开发的同时，在本地调试

##### yarn outdated

检查当前项目所依赖的模块，是否已经有新版本

##### yarn upgrade [package]

https://yarnpkg.com/en/docs/cli/upgrade

不指定包时，更新所有包

指定包时，更新具体的包

==> rm -rf node_modules && npm install

##### yarn add

npm install [package] --save-dev

yarn add [package] --dev

##### yarn remove [package]

npm uninstall [package]
