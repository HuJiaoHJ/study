#### ProvidePlugin VS Externals

http://stackoverflow.com/questions/23305599/webpack-provideplugin-vs-externals

##### ProvidePlugin

自动加载模块

https://webpack.js.org/plugins/provide-plugin/

> Automatically loads modules. Whenever the identifier is encountered as free variable in a module, the module is loaded automatically and the identifier is filled with the exports of the loaded module.

```javascript
new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
})
```

相当于：

```javascript
const $ = require('jquery');
const jQuery = require('jquery');
```

##### Externals

https://webpack.js.org/configuration/externals/

> The externals configuration option provides a way of excluding dependencies from the output bundles. Instead, the created bundle relies on that dependency to be present in the consumer's environment. This feature is typically most useful to library developers, however there are a variety of applications for it.

For example, to include jQuery from a CDN instead of bundling it:

```javascript
...
<script src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous"></script>
...
```

webpack.config.js

```javascript
externals: {
    jquery: 'jQuery'
}
```

使用

```javascript
import $ from 'jquery';

$('.my-element').animate(...);
```
