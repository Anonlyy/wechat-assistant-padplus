

[![ 由Wechaty提供 ](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

[![node version](https://img.shields.io/badge/node-%3E%3D10-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.38.4-blue.svg)](https://github.com/Chatie/wechaty)
[![node version](https://img.shields.io/badge/wechaty--puppet--padplus-%3E%3D0.6.2-green)](https://github.com/wechaty/wechaty-puppet-padplus)


## 微信机器人秘书 ##
### 使用须知
1. 本项目适用网页版微信登录不成功的用户, 该项目是使用微信`ipad`协议开发。
2. **使用本项目前需要先申请`token`**, 具体操作流程请参考[教程](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty#1Token-%E7%9A%84%E5%8A%9F%E8%83%BD%E5%92%8C%E7%94%B3%E8%AF%B7)

### 初衷

前段时间发现微信群里有人天天准时准点的在发咨询或者消息, 身为程序员的我一眼就发现这是机器人所为, 于是萌生了利用机器人每天向女票定时发消息的想法, 那么开始我的折腾之旅吧。

关于微信机器人的开源项目, `github`一搜也是有一大堆了, 身为前端, 自然是拥抱`node`啦, 于是我找到了[wechaty](https://github.com/wechaty/wechaty), 于是正当我满心欢喜的`clone` 下来，扫码登录后,却报了这个错误:

```html
<error><ret>1203</ret><message>当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。你可以通过手机客户端或者windows微信登录。</message></error>
```

在[issues](https://github.com/wechaty/wechaty/issues/603)里一搜发现, 这个问题已经有很多人提过了, 而且目前没有什么解决办法, 去[wx.qq.com](wx.qq.com)扫码登录一下, 如果你的账号可以正常在网页版微信登录的话, 那你也不用再折腾了, 直接去`github` 搜下微信机器人的开源项目, 可以用这个[微信每日说](https://github.com/gengchen528/wechatBot)项目, 而我的两个账号, 都无法登录网页版微信, 那就无法使用这些依赖网页版微信的机器人项目了, 于是我又找到了 基于`ipad`协议版本的[`wechaty`项目](https://github.com/wechaty/wechaty-puppet-padplus), 作者在介绍里是这样介绍的, 

![Snipaste_2020-05-12_10-36-29](http://image.xposean.top/20200512103720.png)

大体的意思是通过`puppet`这个中间件再基于各个平台的协议(如ipad、web、mac), 就可以用`wechaty`控制我们的微信号了。

话不多说, 那就开始搬砖了。

#### 须知：**本项目必须向`wechaty`团队申请`token`, 否则该项目是无法使用的.** 申请流程参考: [申请token]([https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty#1Token-%E7%9A%84%E5%8A%9F%E8%83%BD%E5%92%8C%E7%94%B3%E8%AF%B7](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty#1Token-的功能和申请))

### 安装过程

#### 1、安装MongoDB与Node

为了让数据持久化，使用了`mongodb`数据库，保存所有的定时任务，所以需要本地安装好`mongodb`数据库，本项目`mongodb`端口默认27017。Node请选择大于10的版本安装

请自行安装好`git`客户端，没有客户端的可以直接下载zip包

```powershell
git clone https://github.com/Anonlyy/wechat-assistant-padplus.git // 下载zip包的忽略本步骤

cd wechat-assistant-padplus
npm install
```


#### 2.注册天行数据账号

由于本项目部分接口来自[天行数据](https://www.tianapi.com/signup.html?source=474284281)，所以需要注册自己的天行数据账号，并在`wechat.config.js`中的`TXAPIKEY`位置填写自己的key，注册地址：[天行数据注册](https://www.tianapi.com/signup.html?source=474284281)

***注：*** 申请完天行数据账号后, 需对应申请一些API接口, 否则本项目的某些接口是没有权限访问的
![feature4](http://image.xposean.top/20200512110139.png)
图中画框的即是必须申请的接口
#### 3、修改配置文件

根目录下存在一个`wechat.config.example.js`文件，请copy一份到当前目录并修改文件名为`wechat.config.js`或直接修改文件名为`wechat.config.js`，配置文件中已对各字段说明清晰，项目出现问题时，请先对照配置内容自行排查问题原因
```javascript
// 本文件是配置案例文件，请拷贝一份此文件后重命名为wechat.config.js，否则项目无法运行
module.exports = {
  AUTOREPLY: false, // 是否设置机器人自动回复，默认关闭 false  开启为 true
  DEFAULTBOT: '0', // 默认机器人 0 天行机器人 1 天行对接的图灵机器人 2 图灵机器人
  TULINGKEY: '', //图灵机器人KEY
  WECHATYTOKEN: '', // 必填，wechaty token
  TXAPIKEY: '',// 必填，天行数据key，目建议申请自己的天行数据key，可以对机器人个性化定制
  /**
   * 每日说定时任务（支持多人）
   * name:要发送好友的昵称 （注：不是微信号！不是微信号！不是微信号！）
   * alias:要发送好友的备注（默认查找备注优先，防止昵称带表情特殊字符）
   * memorialDay:你与朋友的纪念日
   * city:朋友所在城市，写的时候不要带‘市’
   * endWord:每日说内容的最后的落款 案例中效果为‘——————————爱你的朋友Leo_chen’
   * date:每天定时的发送时间，案例中代表每天早上8点钟，具体规则见‘wechaty/lib/index.js’ (多个好友不要设置相同时间！不要设置相同时间！不要设置相同时间！)
   */ 
  DAYLIST: [
    {name:'昵称',alias:'备注',memorialDay:'2015/04/18',city:'上海',endWord:'爱你的朋友Leo_chen',date:'0 0 8 * * *'},
  ],

  /**
   * 群定时任务列表（支持多群配置）
   * roomName: 群名
   * sortId: 新闻资讯类别id （详情参见README.md数据字典）
   * endword: 结尾备注 ‘————————小助手雷欧’
   * date:每天定时的发送时间，案例中代表每天早上7点30分，具体规则见‘wechaty/lib/index.js’(多个群不要设置相同时间！不要设置相同时间！不要设置相同时间！)
   */
  ROOMLIST: [
    {roomName:'群名',sortId:22,endWord:'小助手雷欧',date:'0 30 7 * * *'},
  ],
   /**
    * 自动添加好友关键词，留空代表同意任何好友请求 
    */
  ACCEPTFRIEND: [],
  /**
   * 好友进群通知，可配置多个
   */
  ROOMJOINLIST: [{name:'群名',welcome:'有什么问题都可以群里提出，大家都是很热情的'}],
  /**
   * 关键词回复列表
   * key: 多个关键词触发相同内容，非模糊匹配，为全匹配
   * reply: 回复内容
   */ 
  KEYWORDLIST:[{key:['你好','您好'],reply:'你好啊，我是小助手雷欧'}],
  /**
   * 新通过好友，默认发送消息
   */
  NEWFRIENDREPLY: '你好，请问有什么可以帮助的',
  /**
   * 关键词加群配置
   * key: 多个关键词触发相加群操作，全匹配
   * roomName: 发送邀请的群名
   */
  ADDROOMKEYLIST:[
    {key:['加群'],roomName:'群名'}
  ],
  /**
   * 关键词触发指定事件，适用于私聊与群聊
   * key: 关键词
   * position: 关键词所在位置 start 开头  middle 不限 end 结尾
   * event: 触发事件名称，更多查看事件字典
   */
  EVENTKEYWORDLIST:[
    {key:'?',position:'start',event:'rubbish'},
    {key:'？',position:'start',event:'rubbish'},
    {key:'是什么垃圾',position:'end',event:'rubbish'},
    {key:'名人名言',position:'middle',event:'mingyan'},
    {key:'*',position:'start',event:'star'},
    {key:'姓',position:'start',event:'xing'},
    {key:'姓',position:'end',event:'xing'},
  ],  
}
```

#### 4、本地启动项目

```
npm run koa // 执行此命令后需新开命令窗口执行以下命令
npm run start
```
执行完成后请等待，直到出现二维码界面，拿出手机扫描确认登录即可

#### 5、服务器启动项目

服务器部署项目时，请全局安装进程守护工具`pm2`,命令`npm i pm2 -g`。执行安装完成后

```
npm run pm2 //此操作产生的log日志在/koa/log/文件夹中，如果有报错请自行查看log是否koa未启动成功
npm run start //执行此操作，出现二维码，扫描登录成功后，键盘ctrl+c退出，然后执行
npm run pm2-wechaty // 执行日志在/wechaty/log/目录中，如果发现掉线，请重新执行npm run start后再执行此命令
```
**注意: **

两个服务都运行成功后, 就可以测试一下自己的机器人微信号会不会自动回复你的消息啦.

如果发现无法正常使用, 可以执行`pm2 logs wechaty`看是否是卡在扫码阶段了, 如果是再次扫码登录即可

![Snipaste_2020-05-11_22-46-08](http://image.xposean.top/20200512001133.png)



#### 更多问题

关于`wechaty`的相关接口，请
[参考wechaty官网文档](https://wechaty.js.org/v/zh/)，如果以上还没有解决你的问题，请先往`wechaty`的项目[issues](https://github.com/Chatie/wechaty/issues)中查找是否存在相同的问题，由于本项目是依赖`wechaty`开发，所以启动时遇到的问题大部分是`wechaty`的。

事实上, 如果需要一些其他自定义功能, 也可以很方便的在项目里修改哦！



### 使用效果

![feature1](http://image.xposean.top/20200512110910.png)

![feature2](http://image.xposean.top/20200512110923.png)

![feature3](http://image.xposean.top/20200512110930.png)

### 注意事项

 本项目属于个人兴趣开发，开源出来纯粹是为了技术交流，请勿使用此项目做违反微信规定或者其他违法事情。

 建议使用小号进行测试。

