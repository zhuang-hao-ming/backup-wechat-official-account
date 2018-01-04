# 备份微信公众号历史消息

## 需求

获得一个公众号的历史推送将每一条推送消息保存为PDF文档。可以认为这个需求是一个轻量的微信爬虫。


## 方法

1. 获得每一条推送消息的url
2. 使用`puppeteer`将推送网页的内容导出为pdf

## 问题

为了备份所有的历史推送消息，需要首先获得每一个*推送消息的链接*。使用微信客户端可以查看


## 参考

1. [Python爬虫爬取微信公众号历史文章全部链接](https://www.jianshu.com/p/36f5f74b6c04)
2. [puppeteer](https://github.com/GoogleChrome/puppeteer)