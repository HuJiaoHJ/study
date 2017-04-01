#### ejs-compiled-loader

https://github.com/bazilio91/ejs-compiled-loader

> EJS loader for webpack. Uses ejs function to compile templates.

##### ejs

https://github.com/mde/ejs

> Embedded（把...嵌入） JavaScript templates

##### 结合html-webpack-plugin插件支持在项目html中使用ejs

代码：

```JavaScript
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

// 不匹配入口html文件
var html = glob.sync('./src/*/**/*.html').map(function (item) {
    return new HtmlWebpackPlugin({
        filename: item.substr(6), //去掉./src/
        template: 'ejs-compiled-loader!' + item,
        inject: false, // 不将js文件嵌入到html中
        minify: false
    });
});

const common = {
    entry: {
        'index': ['./src/index.js', './src/index.scss']
    },
    output: {
        path: path.resolve(__dirname, '../../../build/pages/'),
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            },
        }),
        // 对入口html文件进行处理，需要将js嵌入到html中
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'ejs-compiled-loader!' + './src/index.html',
            minify: false
        }),
    ].concat(html),
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader',
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader?name=[hash:8].[ext]',
        }],
    },
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, '../src'),
        },
    },
    node: {
        process: false,
        setImmediate: false
    },
    performance: {
        hints: false
    },
    externals: {
        jquery: 'jQuery',
        angular: 'angular',
    }
};

module.exports = common;
```

使用：

`<%- include ./header.html -%>`
