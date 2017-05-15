#### inline-block元素之间存在间隙

##### 出现原因

在inline-block元素之间，换行或者空格分隔都会出现元素间的间隙

##### 解决方法

解决方法主要分为几大类：

* 改变html结构
    * 通过去掉html元素之间的换行或者空格来实现
    * 局限：代码可读性减低、如果动态生成的html则没办法
* 使用margin负值
    * 局限：间隙大小值与上下文字体和字体大小有关
* 使用无闭合标签（HTML5）
* font-size: 0; [DEMO](http://jsbin.sankuai.com/tocijohiyo/edit?html,css,output)
* 利用字符间距letter-spacing，单词间距word-spacing（跟margin类似，依旧需要根据不同字体和字体大小来设置）

##### 参考：

* https://www.w3cplus.com/css/fighting-the-space-between-inline-block-elements
* http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/
