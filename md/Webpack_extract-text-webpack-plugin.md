#### extract-text-webpack-plugin.md

https://github.com/webpack-contrib/extract-text-webpack-plugin

将css单独打包

当css很大时，将css单独打包能够提升性能，因为css文件是和js文件并行加载

> It moves all the require("style.css")s in entry chunks into a separate single CSS file. So your styles are no longer inlined into the JS bundle, but separate in a CSS bundle file (styles.css). If your total stylesheet volume is big, it will be faster because the CSS bundle is loaded in parallel to the JS bundle.

```javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}
```
