## 说明
[参考HTML5文档](https://html.spec.whatwg.org/)
>课程内容包括：
一 HTML和CSS基础知识
* HTML元素的分类和特性
* HTML元素默认样式和定制化
* CSS选择器全解析
* CSS常见属性逐一讲解
二CSS布局实战
* 布局属性和组合解析
* 常见布局方案介绍
* 三栏布局案例
* 国内产品布局方案
三动画和效果专题讲解
* 多背景多投影特效
* 3D特效编写实践
* 过渡动画和关键帧动画实践
* 动画细节和原理深入解析
四框架集成和CSS工程化
* 预处理器作用和原理
* Less/Sass代码实践
* Bootstrap原理和用法
* CSS工程化实践方式
* JS框架中的CSS集成实践

# 一、HTML和CSS基础知识

## 1、HTML常见元素和理解
分为：head body
* meta
* title
* style
* link
* script
* base
> • <meta charset="utf-8">
> • <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
> • <base href="/">
* div/section/acticle/aside/header/footer
* P
* span/em/strong
* table/thead/tbody/tr/td
* ul/ol/li/dl/dt/dd
* a
* form/input/select/textarea/button

>• a[href,target]
>• img[src,alt]
>• table td[colspan,rowspan]
>• form[target, method, enctype]
>• input[type,value]
>• button[type]
>• select>option[value]
>• label[for]

[生成HTML大纲算法工具](http://h5o.github.io/)
## 2、HTML版本
* HTML4/4.01(SGML)
* XHTML(XML)
* HTML5
## 3、HTML元素的分类
* 按默认样式分类——块级block 行内inline inline-block 
* [按内容分](https://html.spec.whatwg.org/multipage/dom.html#documents)
![按内容分](./01.HTML基础强化/img/标签按内容分类.jpg) 

## 4、HTML元素嵌套关系
* 块级元素可以包含行内元素
* 块级元素不一定能包含块级元素 例如 p不可以包含div
* 行内元素一般不能包含块级元素
* 但是 。。。。 什么叫一般 例如 a包含div是合法的？不一定是合法的取决于外面元素，因为a是 Transparent, 是透明元素在浏览器解析时是会忽略掉的所以要看div前面的元素是什么，如果是div或者body的话那就是合法的如果是P那就是不合法的浏览器解析时，就不会解析浏览器的容错机制会把div单独拿出来在进行解析 
* content model 
## 5、HTML元素默认样式和定制化
* 默认样式的意义
* 默认样式带来的问题
* CSS Reset 样式重置——YUI(样式归零，适配各个浏览器)， Normalize(保留一些原有margin,padding并且去做一些修正！)
简单有效的CSS Reset,不过比较有争议，因为使用*会不会影响性能，基本上是不会影响性能问题；
*{
    margin:0;
    padding:0;
}
## 6、HTML面试真题解答
* 1、doctype的意义是什么？让浏览器以标准模式渲染；让浏览器知道元素的合法性；
* 2、HTML xHTML HTML5的关系？ HTML属于SGML;XHTML属于XML，是HTML进行XML严格化的结果 HTML5不属于SGML或者XML,比XHTML宽松
* 3.HTML5有什么变化？新的语义化的元素和变化；表单增强；新的API(离线、音视频、图形、实时通信、本地存储、设备能力)；分类和嵌套变更；
* 4、em和i有什么区别？em是语义化的标签，表强调；i是纯样式的标签，表斜体；HTML5中i不推荐使用，一般用作图标；
* 5、语义化的意义是什么？开发者更容易理解；机器容易理解结构（搜索、读屏软件）；有助于SEO;semantic microdata
* 6、哪些元素可以自闭合？ input img br hr meta link 
* 7、HTML和DOM的关系？HTML是死的；DOM由HTML解析而来的是活的；JS可以维护DOM;
* 8、property(特性)和attribute（属性）的区别？attribute是死的；property是活的；两者的改变不会对对方有影响；
* 9、form的作用有哪些？直接提交表单；使用submit/reset按钮；便于浏览器保存表单；第三方库可以整体提取值；第三方库可以进行表单验证；

# 二、CSS基础
Cascading Style Sheet 层叠样式表；
## 1、选择器
* 用于匹配HTML元素
* 分类和权重
* 解析方式和性能
* 值得关注的选择器

!> 浏览器解析CSS选择器是怎么解析的？他是从右往左解析的，目的是加快浏览器对CSS的解析速度，可以更快的匹配元素；

### 选择器分类
* 元素选择器a{}
* 伪元素选择器 ::before{}
* 类选择器 .link{}
* 属性选择器 [type=radio]{}
* 伪类选择器 :hover{}
* ID选择器 #id{}
* 组合选择器 [type=checkbox]+label{}
* 否定选择器：not(.link){}
* 通用选择器 *{}

### 选择器权重

* ID选择器 #id{} +100
* 类 属性 伪类 +10
* 元素 伪元素 +1
* 其他选择器 +0

* !important 优先级最高
* 内联样式（style=""） 优先级高
* 相同权重 后写的生效
* 
!>计算一个不进位的数字，位高权重，权重大的优先级就越高；

## 2、非布局样式

* 字体、字重、颜色、大小、行高
* 背景、边框
* 滚动、换行
* 粗体、斜体、下划线

### 字体
* 字体族：衬线字体serif（宋体）非衬线字体sans-serif（黑体） 等宽字体(monospace) 手写体cursive 花体fantasy；
* 多字体（fallback）指定字体找不到会尝试找下一个指定字体；
* 网络字体、自定义字体；
* iconfont (自动义字体  ::before)

* 行高的构成 line-box->inline-box
* 行高相关的现象和解决方案

图片下方出现多3px的原因及解决方法
产生原因：主要是因为图片的垂直对齐方式vertical-align引发的，默认值是baseline，默认为此值时图片下方就会多出3px。

!>解决方案：
> 1.将图片的垂直对齐方式vertical-align的值设置为bottom，就可以解决这个问题。
> 2.将图片display设置为block，并且指定width和height。
> 3.设置图片所在的容器元素和width和height与图片一样。


### 背景

* 背景颜色 #，hsl,rgb,rgba
* 渐变色背景  background:liner-gradient()
* 多背景叠加  background:liner-gradient()-设置多个
* 背景图片和属性（雪碧图） background-repeat:no-repeat; background-position:center center;(平铺在正中间) 
* base64和性能优化 , 适用小图标，会增大CSS文件的体积，并且增加浏览器解码时间
* 多分辨率适配

### 边框

* 边框的属性：大小 线型 颜色
* 边框背景图 border-image : round\repeat
* 边框衔接（三角形） border

### 滚动

* 滚动行为和滚动条 visible hidden scroll auto

### 文字折行

* overflow-wrap(word-wrap)通用换行控制 break-word
—— 是否保留单词
* word-break 针对多字节文字
—— 中文句子也是单词
* white-space 空白处是否断行

### 装饰性属性及其它

* 字重（粗体）font-weight normal(400) bold(700) bolder(不一定，取决于你的父级)
* 斜体 font-style:itatic
* 下划线text-decoration
* 指针 cursor
  
### CSS Hack

既不合法但生效的写法，主要是用于兼容低版本IE,难理解 难维护 易失效(注意：标准属性写在前面，hack属性写在后面)
替换方案：特性检测，针对性加class

```html
<div class="checkbox">
    <input type="checkbox" id="handsome">
    <label for="handsome">是否选中</label>
</div>

<style>
    .checkbox input {
        display:none;
    }
    /* +表示相邻元素 */
    .checkbox input +label {
         background:url(./checkbox1.png) left center no-repeat;
         background-size:20px 20px;
         padding-left:20px;
    }
    .checkbox  input:checked +label {
        background-image:url(./checkbox1.png);
    }
</style>
```

## CSS面试真题

* 1.CSS样式（选择器） 优先级
* 计算权重确定 ！import 内联样式 相同权重后写生效

* 2.雪碧图的作用
* 减少HTTP请求数 提高加载性能
* 有一些情况下可以减少图片大小

* 3.自定义字体的使用场景
* 1.宣传、品牌、banner 等固定文案
* 2.字体图标

* 4.base64的使用
* 1.用于减少HTTP请求
* 2.适用于小图片
* 3.base64的体积约为原图4/3


* 5.伪类和伪元素的区别？
* 伪类表状态
* 伪元素是真的有元素
* 前者是单冒号 后者双冒号


* 6.如何美化checkbox?
* label[for] 和 id
* 隐藏原生input
* :checked+label


# 三、CSS布局

* CSS知识体系的重中之重
* 早期以table 为主 （简单）
* 后来以技巧性布局为主（难）
* 现在有flexbox/grid(偏简单)
* 响应式布局是必备知识
  
  常用布局方法
  * table 表格布局
  * float浮动+margin
  * inline-block 布局
  * flexbox布局

### 盒模型
content(width height) padding border margin

### display/position
* 确定元素的显示类型 block/inline/inline-block
* 确定元素位置 static/relative/absolute/fixed

### flexbox
* 弹性盒子
* 盒子本来就是并列的
* 指定宽度即可
  
## float
* 元素浮动
* 脱离文档流但不脱离文本流
* 对自身的影响——形成块（BFC）位置尽量靠上 位置尽量靠左
* 对兄弟的元素影响——上面贴非float元素，旁边贴float元素，不影响其他块级元素位置，影响其他块级元素内部文本；
* 对父级的元素影响——从布局上消失，高度塌陷(清楚浮动影响： overflow:hidden或者 加伪元素 ::after{content:'';clear:both;display:block;height:0;visibility:hidden;})

## inline-block
* 像文本一样排block元素
* 没有清楚浮动等问题
* 需要去除间隙（1.父级元素字体设置为零，里面的元素把字体设置回来；2.html标签空白处中间加注释的方式）；

## 响应式设计和布局

* 在不同设备上正常使用；
* 一般主要处理屏幕大小问题
* 主要方法：隐藏+折行+自适应空间
* rem/viewport/media query

<meta name="viewport" content="width=devicd-width,initial-scal=1.0"></meta>

## CSS面试真题

* 1.实现两栏（三栏）布局方法
  * 表格布局
  * float+margin 布局
  * inline-block 布局
  * flexbox布局

* 2.position:absolute/fixed 有什么区别？
  * 前者相对最近的absolute/relative
  * 后者相对屏幕（viewport）

* 3.display:inline-block的间隙 
  * 原因：字符间距
  * 解决：消灭字符或者消灭间距；

* 4.如何清楚浮动
 因为父级布局的时候是不管浮动元素的，有可能浮动元素超出父级元素，对其他元素会产生影响，所以父级元素要去清楚浮动；
  * 让盒子负责自己的布局 overflow:hidden(auto)
  * ::afer{clear:both}

* 5.如何适配移动端页面
  * viewport
  * rem/viewport/media query
  * 设计上：隐藏 折行 自适应

# CSS效果

* box-shadow 营造层次感（立体感）充当没有宽度的边框 特殊效果
* text-shadow 立体感 印刷品质感 
* border-radius 圆角矩形 圆形 半圆/扇形 一些奇怪的角角
* background 纹理图案 渐变 雪碧图动画 背景图尺寸适应
* clip-path 对容器进行裁剪 常见几何图形 自定义路径
* 3D变换 transform (translate位置 scale缩放 skew斜切 rotate旋转)

## CSS面试真题
* 1.如何用div画XXX

box-shadow无线投影 ::before ::after

* 2.如何产生不占空间的边框? box-shadow;outline
* 3.如何实现圆形元素（头像）border-radius:50%
* 4.如何实现ios图标的圆角？ clip-path:(svg)
* 5.如何实现半圆/扇形等图形？ boreder-radius组合：有无边框边框粗细 圆角半径；
* 6.如何实现背景图居中显示/不重复/改变大小？background-position background-repeat background-size(cover/contain);
* 7.如何平移/放大一个元素？ transform:translateX(100px); transform:scale(2);
* 8.如何实现3D效果？ perspective:500px;transform-style:preserve-3d;transform:translate rotate ...

# 四、CSS动画

> 动画原理：1.视觉暂留作用2.画面逐渐变化；
> 动画类型：1.transition补间动画2.animation、keyframe关键帧动画3.

## 补间动画

* 位置——平移 （left/rigt/margin/tranform）
* 方位——旋转 (transform)
* 大小——缩放 (transform)
* 透明度  (opacity)
* 其他——线性变换 (transform)

## 关键帧动画
* 相当于多个部件动画
* 与元素状态的变化无关
* 定义更加灵活

animation：run 1s linear;

@keyframs run{
    0%{width:100px};
    100%{width:800px};
}

## 逐帧动画

* 适用于无法补间计算的动画
* 资源较大
* 使用steps()
* animation-timing-function:steps(1)

## CSS面试真题
* 1.CSS动画实现方式有几种？transition keyframes(animaion)
* 2.过渡动画和关键帧动画的区别？ 过渡动画需要有状态变化 关键帧动画不需要状态变化 关键帧动画能控制更精细
* 3.如何实现逐帧动画？使用关键帧动画 去掉补间（steps）
* 4.CSS动画的性能？性能不坏 部分情况下优于JS 但JS可以做到更好 部分高危属性 box-shadow等
