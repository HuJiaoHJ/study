#### 长度单位

##### 绝对长度单位

* px 像素
* cm 厘米
    * 2.54cm == 96px
* mm 毫米
    * 25.4mm == 96px
* in 英尺
    * 1in == 96px

##### 相对长度单位（相对字体长度）

* em
    * 相对与当前字体大小，即font-size，没有任何长度规则时，以下成立：
    ```
    1em = 16px
    ```
    * 如果font-size设置了em单位，会逐级向上乘 [DEMO](http://jsbin.sankuai.com/qepoqiyepu/edit?html,css,output)
* rem
    * 相对于根元素<html>字体大小
    * 移动端开发经常需要使用这个单位
* ex
    * 当前字体的x-height，即当前字体的小写x的高度
* ch
    * 当前字体的‘0’字符的宽度，注意是宽度而不是高度

##### 可视区百分比长度

* vw
    * 相对于可视区域宽度百分比的单位，`1vw = 1% viewport width`
* vh
    * 相对于可视区域高度百分比的单位，`1vh = 1% viewport height`
* vmin
    * 相对于可视区域 **宽高** 中 **较小** 的一个的百分比单位，`1vmin = 1% min(viewport w, viewport h)`
* vmax
    * 相对于可视区域 **宽高** 中 **较大** 的一个百分比单位，`1vmax = 1% max(viewport w, viewport h)`

##### 参考

* https://developer.mozilla.org/en-US/docs/Web/CSS/length
* http://www.w3cplus.com/css/the-lengths-of-css.html
* https://www.w3cplus.com/css/7-css-units-you-might-not-know-about.html
