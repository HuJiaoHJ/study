#### html-webpack-plugin

https://github.com/jantimon/html-webpack-plugin

http://www.cnblogs.com/haogj/p/5160821.html

> This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.

##### 安装

`npm install html-webpack-plugin --save-dev`

##### 配置

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
    entry: './app/index.js',
    output: {
        filename: 'bundles.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-test', // html页面title
            filename: 'index.html', // html文件名称，默认index.html，可以使用子目录，eg: assets/admin.html
            template: './index.html' //模板文件，如果模板是字符串，可以使用templateContent
        })
    ]
};

module.exports = webpackConfig;
```

##### 输出

./dist/index.html

```html
<html>
  <head>
    <title>webpack 2 demo</title>
  </head>
  <body>
  <script type="text/javascript" src="bundle.js"></script></body>
</html>
```

* title: The title to use for the generated HTML document.
* filename: The file to write the HTML to. Defaults to index.html. You can specify a subdirectory here too (eg: assets/admin.html).
* template: Webpack require path to the template. Please see the docs for details.
* inject: true | 'head' | 'body' | false Inject all assets into the given template or templateContent - When passing true or 'body' all javascript resources will be placed at the bottom of the body element. 'head' will place the scripts in the head element.
* favicon: Adds the given favicon path to the output html.
* minify: {...} | false Pass a html-minifier options object to minify the output.
* hash: true | false if true then append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting.
* cache: true | false if true (default) try to emit the file only if it was changed.
* showErrors: true | false if true (default) errors details will be written into the HTML page.
* chunks: Allows you to add only some chunks (e.g. only the unit-test chunk)
* chunksSortMode: Allows to control how chunks should be sorted before they are included to the html. Allowed values: 'none' | 'auto' | 'dependency' | {function} - default: 'auto'
* excludeChunks: Allows you to skip some chunks (e.g. don't add the unit-test chunk)
* xhtml: true | false If true render the link tags as self-closing, XHTML compliant. Default is false
