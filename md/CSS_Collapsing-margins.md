#### CSS - Collapsing margins（margins折叠）

https://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html

##### BFC - Block formatting contexts （块级格式上下文）

https://www.w3.org/TR/CSS22/visuren.html#block-formatting

> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

> 浮动，绝对定位元素，非块级盒子的块级容器（像inline-blocks,table-cells,table-captions），以及overflow值不为visiable的块级盒子，会为他们的内容创建新的块级格式上下文，即BFC

> In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the 'margin' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.

> 在一个BFC钟，盒子从内容块顶端开始垂直地一个接一个的排列，两个兄弟盒子之间的垂直距离取决于margin属性。在一个BFC中，两个相邻的块级盒子的垂直margin会产生折叠。

##### Collapsing margins （margins折叠）

https://www.w3.org/TR/CSS22/box.html#collapsing-margins

> In CSS, the adjoining margins of two or more boxes (which might or might not be siblings) can combine to form a single margin. Margins that combine this way are said to collapse, and the resulting combined margin is called a collapsed margin.

> 在CSS中，相邻的两个或多个盒子（可能是兄弟也可能不相邻）的相邻margin可以结合成一个单独的外边距。这种margin合并的方式称为折叠，而合并margin的结果称为折叠外边距。

垂直相邻的margin会折叠，除了：

* 根元素的margin不会折叠
* If the top and bottom margins of an element with clearance are adjoining, its margins collapse with the adjoining margins of following siblings but that resulting margin does not collapse with the bottom margin of the parent block.
* If the top margin of a box with non-zero computed 'min-height' and 'auto' computed 'height' collapses with the bottom margin of its last in-flow child, then the child's bottom margin does not collapse with the parent's bottom margin.

水平margin不会折叠

两个margin是邻接的必须满足以下条件：

* 必须是处于常规文档流（非float和绝对定位）的块级盒子,并且处于同一个BFC当中。
* 没有行盒，没有空隙，没有padding和border将他们分隔开
* 都属于垂直方向上相邻的外边距，可以是下面任意一种情况
    * 元素的margin-top与其第一个常规文档流的子元素的margin-top
    * 元素的margin-bottom与其下一个常规文档流的兄弟元素的margin-top
    * height为auto的元素的margin-bottom与其最后一个常规文档流的子元素的margin-bottom
    * 高度为0并且最小高度也为0，不包含常规文档流的子元素，并且自身没有建立新的BFC的元素的margin-top和margin-bottom  ？

规则：

* 创建了新的BFC的元素（例如浮动元素或者'overflow'值为'visible'以外的元素）与它的子元素的外边距不会折叠
* 浮动元素不与任何元素的外边距产生折叠（包括其父元素和子元素）
* 绝对定位元素不与任何元素的外边距产生折叠
* inline-block元素不与任何元素的外边距产生折叠
* 一个常规文档流元素的margin-bottom与它下一个常规文档流的兄弟元素的margin-top会产生折叠，除非它们之间存在间隙（clearance）。
* 一个常规文档流元素的margin-top 与其第一个常规文档流的子元素的margin-top产生折叠，条件为父元素不包含 padding 和 border ，子元素不包含 clearance。
* 一个 'height' 为 'auto' 并且 'min-height' 为 '0'的常规文档流元素的 margin-bottom 会与其最后一个常规文档流子元素的 margin-bottom 折叠，条件为父元素不包含 padding 和 border ，子元素的 margin-bottom 不与包含 clearance 的 margin-top 折叠。
* 一个不包含border-top、border-bottom、padding-top、padding-bottom的常规文档流元素，并且其 'height' 为 0 或 'auto'， 'min-height' 为 '0'，其里面也不包含行盒(line box)，其自身的 margin-top 和 margin-bottom 会折叠。

其他：

* 空隙（clearance）是通过clear:both 清楚浮动之后产生的
* 闭合浮动的元素的border-top会紧贴着相应的浮动元素的margin-bottom，浮动闭合元素的位置与该元素的margin-top无关了，只与响应的浮动元素的margin-bottom的位置有关
* 闭合浮动不能使浮动元素回到原来的BFC中
* 块级盒子的display属性是一下三个值：block、table、list-item，其他所有值都是非块级盒子的块级容器，会创建新的BFC

[DEMO](http://jsbin.sankuai.com/ruy/edit?html,css,output)

[DEMO](http://jsbin.sankuai.com/nur/edit?html,css,output)
