# 小程序

# 奇奇怪怪的错误

1. 如果在pages下新建了一个页面文件夹，但是未在app.json中使用，就会报错。

2. 首页竖线对不齐，用inline-block就好了

3. wx.showShareMenu并不是用来显示转发按钮的 fuck

4. input的光标位置通过padding-left修改

5. 在使用view-scroll的时候注意设置高度

6. 使用wx.navigateTo跳转的url要配置为相对路径

7. 在component中button组件的plain，自定义border等样式用不了，可以使用slot放到父组件

## 一些注意点(坑)

1. 如果接口数据是http，那么开发的时候启用免检证书。那么真机预览。也要开器调试模式。不然是请求不了接口的

2. 在音乐播放的时候，注意因为网络原因，多次点击后播放多个音乐的问题。增加一个loading

3. 将数据请求放nShow那么，每次跳转或者切换到tab页都会重新请求，轻松解决数据更新的问题

4. 在组件的里的wxml使用了animation，不生效。只能把wxml放到page，通过slot引入。

5. 组件生命周期拿不到data和props的数据



## 转发按钮改成转发图片

一般来说按钮转发不可取，都会将按钮自定义成想要的图片。这时候可以将按钮样式修改。

```
<button open-type="share" plain="{{true}}" hover-class="none">

// css
button[plain] {
  border: none;
  color: #ffffff;
}
// 这样按钮的样式就是透明了
```
在在里面加上想要的图片就可以 ，**在真机调试的时候。button为relative，和开发布局不符合，要设置为absolute**

## 关于debounce的使用

因为搜索如果输入一个字母就搜索一次，是十分耗费网络资源的。那么就需要给搜索加一个延时，只要在输入就不搜索
也就是防抖函数。

**在使用的时候debounce，return的函数才是用执行的函数**，所以必须包裹执行函数

```
// vue中可以
this.$watch('xx', debounce())

// 小程序
xxx: debounce(func, 200)

// react
xxx = debounce()
```

## book页搜索栏 分析

1. 第一层搜索页，展示hot书籍页。showSwitch === 1
2. 聚焦搜索 展示热词和历史记录 showSwitch === 2
3. 输入搜索词 展示搜索的内容 showSwitch === 3

## 逻辑错误

没法在一个页面使用search框，体验了几个小程序都是新开一个页面的。

## 关于列表循环

注意最好使用bock去循环，在text or view来循环可能会出css的问题

## 关于搜索

1. 通过`bindinput`获取键盘输入的值，这里如果直接搜索，在真机中，中文是没有问题的，只会有一次请求。如果是数字就会输入一次就请求，所以这里需要debounce，将200ms內的输入结为一次
2. 这里如果是vue的话，通过监听value的值，来请求。react通过子组件。这里的子组件`properties`有个`observer`可以监听新值。
3. 注意，当`value`为空，则`showWitch`为1, 点击取消的时候修改`showWitch`和`value`
4. 当点击热词，将数据填到`input`，即`showWitch`、`value`和`query`

## scroll-view

css
```
position: fixed;

```

## 关于text组件

text组件事可以解析\n的，但是如果data数据中赋值的字符串中字节数过多，\n就无法解析了。

1. 可以使用wxParse解决
2. 也可以通过循环解决


## 书籍详情页

**注意**：遮罩层下如果有`view-scroll`最好用`fixed`定位其他`view`