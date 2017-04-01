#### webpack devtool source-map

##### devtool 7个source-map的配置

https://segmentfault.com/a/1190000004280859

http://www.jianshu.com/p/1cbc3e87be60

* eval 每个模块都封装到 eval 包裹起来，并在后面添加 //# sourceURL
* source-map 这是最原始的 source-map 实现方式，其实现是打包代码同时创建一个新的 sourcemap 文件， 并在打包文件的末尾添加 //# sourceURL 注释行告诉 JS 引擎文件在哪儿
* hidden-source-map 就是 soucremap 但没注释，没注释怎么找文件呢？貌似只能靠后缀，譬如 xxx/bundle.js 文件，某些引擎会尝试去找 xxx/bundle.js.map
* inline-source-map 为每一个文件添加 sourcemap 的 DataUrl，注意这里的文件是打包前的每一个文件而不是最后打包出来的，同时这个 DataUrl 是包含一个文件完整 souremap 信息的 Base64 格式化后的字符串，而不是一个 url。
* eval-source-map 这个就是把 eval 的 sourceURL 换成了完整 souremap 信息的 DataUrl
* cheap-source-map 不包含列信息，不包含 loader 的 sourcemap，（譬如 babel 的 sourcemap）
* cheap-module-source-map 不包含列信息，同时 loader 的 sourcemap 也被简化为只包含对应行的。最终的 sourcemap 只有一份，它是 webpack 对 loader 生成的 sourcemap 进行简化，然后再次生成的。

##### 什么是source-map

http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html

> Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。

> Chrome浏览器支持这个功能。在Developer Tools的Setting设置中，确认选中"Enable source maps"。

栗子：http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.map
