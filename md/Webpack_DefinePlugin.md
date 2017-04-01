#### DefinePlugin

定义变量

通过DefinePlugin可以定义一些全部变量，可以在模块中直接使用这些变量，而无需额外的声明。

```javascript
plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                APP_ENV: JSON.stringify(process.env.APP_ENV || 'test'),
            },
        }),
    ],
```

可以在代码中直接使用：

```javascript
console.log(process.env.NODE_ENV); // development
console.log(process.env.APP_ENV); // test
```

注意：String、Array、Object类型需要通过JSON.stringify()特殊处理下
