# 自定义小程序

# 奇奇怪怪的错误

1. 如果在pages下新建了一个页面文件夹，但是未在app.json中使用，就会报错。

2. 首页竖线对不齐，用inline-block就好了

3. wx.showShareMenu并不是用来显示转发按钮的 fuck

4. input的光标位置通过padding-left修改

5. 在使用view-scroll的时候注意设置高度

6. 使用wx.navigateTo跳转的url要配置为相对路径

## 一些注意点

1. 如果接口数据是http，那么开发的时候启用免检证书。那么真机预览。也要开器调试模式。不然是请求不了接口的

2. 在音乐播放的时候，注意因为网络原因，多次点击后播放多个音乐的问题。增加一个loading