# 备份微信公众号历史消息

## 需求

获得一个公众号的历史推送将每一条推送消息保存为PDF文档。可以认为这个需求是一个轻量的微信爬虫。


## 方法


## 1.获得每一条推送消息的url

为了备份所有的历史推送消息，需要首先获得每一个*推送消息的链接*。使用微信客户端可以查看公众号的历史消息，但是无法在浏览器打开（在浏览器打开显示请在微信客户端查看，这可能是微信的反爬虫策略）。

参考[1]的做法，可以使用fiddler(需要打开https)获得一个可用的链接(这个链接有时效性)

```
https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNzU1ODM4NA==&scene=124&uin=MTE2MDY4Nzk2MQ%3D%3D&key=c0a5de018bf99cfb5d13dffda6ddc6343417c0cdee3716ed8938fb901024574c0d29798ead84c706b0f62232ec711f46e504a552286f560df00fe509be3f5af6f49beeeae77fa02fcaf6f30fae961316&devicetype=Windows+10&version=62060028&lang=zh_CN&a8scene=7&pass_ticket=qyId4oaIMBJhO3yvGY2cai8XowcwchK5AWOEepXl4zFQl%2BPHpBaKyvJObvbJMkpM&winzoom=1

```
由于微信页面使用懒加载策略，使用chrome api puppeteer来将页面滑动到底部加载所有内容，然后获得所有`[hrefs]`标签，并进行去重保存在文件中。 

## 2. 将推送网页保存为pdf

同样使用chrome api puppeteer。 由于微信页面的图片是在滑动停止后一段时间(测试值大概是>300ms)才加载, 所以滑动的间隔应该调整的稍微大一些(300ms+网络延迟)。

*注意pdf下载只在headless模式下有效*


## todo

1. 并发控制
2. 使用策略，确保所有图片都下载完成后，才导出pdf
3. 使用word或其它api自动转换为word

## 参考

1. [Python爬虫爬取微信公众号历史文章全部链接](https://www.jianshu.com/p/36f5f74b6c04)
2. [puppeteer](https://github.com/GoogleChrome/puppeteer)