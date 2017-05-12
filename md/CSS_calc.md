#### calc()

通过表达式动态计算大小

##### calc()运算规则

* 支持 + - * / 四则运算
* 可以使用百分比、px、em、rem等单位
* 可以混合使用各种单位进行运算
* 在使用 + - 运算时，运算符前后需要有空格，否则是错误的
* 在使用 * / 运算时，运算符前后可以不留空格，不过建议都留空格

##### 浏览器兼容性

[calc()兼容性](http://caniuse.com/#feat=calc)

* 在IE9+、FF4.0+、Chrome19+、Safari6+都得到较好支持
* 移动端的浏览器还没仅有“firefox for android 14.0”支持
* 在Android上不支持，所以在移动端可以使用box-sizing: border-box;来替代calc()解决布局问题
