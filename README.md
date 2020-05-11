

[![ 由Wechaty提供 ](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

[![node version](https://img.shields.io/badge/node-%3E%3D10-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.38.4-blue.svg)](https://github.com/Chatie/wechaty)
[![node version](https://img.shields.io/badge/wechaty--puppet--padplus-%3E%3D0.6.2-green)](https://github.com/wechaty/wechaty-puppet-padplus)


## 微信机器人秘书 ##
### 使用须知
1. 本项目适用网页版微信登录不成功的用户, 该项目是使用微信`ipad`协议开发。
2. **使用本项目前需要先申请`token`**, 具体操作流程请参考[教程](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty#1Token-%E7%9A%84%E5%8A%9F%E8%83%BD%E5%92%8C%E7%94%B3%E8%AF%B7)



<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [微信机器人秘书](#%e5%be%ae%e4%bf%a1%e6%9c%ba%e5%99%a8%e4%ba%ba%e7%a7%98%e4%b9%a6)
  - [使用须知](#%e4%bd%bf%e7%94%a8%e9%a1%bb%e7%9f%a5)
- [微信小助手2.0全新升级](#%e5%be%ae%e4%bf%a1%e5%b0%8f%e5%8a%a9%e6%89%8b20%e5%85%a8%e6%96%b0%e5%8d%87%e7%ba%a7)
- [效果预览](#%e6%95%88%e6%9e%9c%e9%a2%84%e8%a7%88)
- [安装](#%e5%ae%89%e8%a3%85)
  - [1、安装MongoDB与Node](#1%e5%ae%89%e8%a3%85mongodb%e4%b8%8enode)
  - [3、修改配置文件](#3%e4%bf%ae%e6%94%b9%e9%85%8d%e7%bd%ae%e6%96%87%e4%bb%b6)
    - [注册天行数据账号](#%e6%b3%a8%e5%86%8c%e5%a4%a9%e8%a1%8c%e6%95%b0%e6%8d%ae%e8%b4%a6%e5%8f%b7)
  - [4、本地启动项目](#4%e6%9c%ac%e5%9c%b0%e5%90%af%e5%8a%a8%e9%a1%b9%e7%9b%ae)
  - [5、服务器启动项目](#5%e6%9c%8d%e5%8a%a1%e5%99%a8%e5%90%af%e5%8a%a8%e9%a1%b9%e7%9b%ae)
  - [5. 更多问题](#5-%e6%9b%b4%e5%a4%9a%e9%97%ae%e9%a2%98)
- [注意](#%e6%b3%a8%e6%84%8f)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## 微信小助手2.0全新升级

帮你创建定时任务，每日提醒，纪念日提醒，当日提醒。当然基础的给女朋友的每日说功能也是必备的，而且小助手版每日说为那些非常优秀的程序员准备了多女朋友定时发送提醒功能。同时自带微信机器人功能，群资讯消息定时发送，群机器人聊天，垃圾分类，天气查询，土情话查询，老黄历查询，顺口溜查询等众多功能

## 效果预览

![](https://raw.githubusercontent.com/Anonlyy/wechat-assistant-padplus/master/koa/assets/feature1.png)
![](https://raw.githubusercontent.com/Anonlyy/wechat-assistant-padplus/master/koa/assets/feature2.png)
![](https://raw.githubusercontent.com/Anonlyy/wechat-assistant-padplus/master/koa/assets/feature3.png)

## 安装

### 1、安装MongoDB与Node
为了让数据持久化，使用了mongodb数据库，保存所有的定时任务，所以需要本地安装好mongodb数据库，本项目mongodb端口默认27017。Node请选择大于10的版本安装

请自行安装好git客户端，没有客户端的可以直接下载zip包

```
git clone https://github.com/Anonlyy/wechat-assistant-padplus.git // 下载zip包的忽略本步骤

cd wechat-assistant-padplus
npm install
```
### 3、修改配置文件

根目录下存在一个`wechat.config.example.js`文件，请copy一份到当前目录并修改文件名为`wechat.config.js`或直接修改文件名为`wechat.config.js`，配置文件中已对各字段说明清晰，项目出现问题时，请先对照配置内容自行排查问题原因

#### 注册天行数据账号

由于本项目部分接口来自[天行数据](https://www.tianapi.com/signup.html?source=474284281)，所以需要注册自己的天行数据账号，并在TXAPIKEY位置填写自己的key，注册地址：[天行数据注册](https://www.tianapi.com/signup.html?source=474284281)

***注：*** 申请完天行数据账号后, 需对应申请一些API接口, 否则本项目的某些接口是没有权限访问的！
![](https://raw.githubusercontent.com/Anonlyy/wechat-assistant-padplus/master/koa/assets/feature4.png)
图中画框的即是必须申请的接口

```
// 本文件是配置案例文件，请拷贝一份此文件后重命名为wechat.config.js，否则项目无法运行
module.exports = {
  AUTOREPLY: false, // 是否设置机器人自动回复，默认关闭 false  开启为 true
  DEFAULTBOT: '0', // 默认机器人 0 天行机器人 1 天行对接的图灵机器人 2 图灵机器人
  TULINGKEY: '', //图灵机器人KEY
  WECHATYTOKEN: '', // 必填，wechaty token
  TXAPIKEY: '762be789103e1ae7b65573f8d4fc0df6',// 必填，天行数据key，目前贡献的是我个人的，建议申请自己的天行数据key，可以对机器人个性化定制
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

### 4、本地启动项目

```
npm run koa // 执行此命令后需新开命令窗口执行以下命令
npm run start
```
执行完成后请等待，直到出现二维码界面，拿出手机扫描确认登录即可


### 5、服务器启动项目

服务器部署项目时，请全局安装进程守护工具`pm2`,命令`npm i pm2 -g`。执行安装完成后

```
npm run pm2 //此操作产生的log日志在/koa/log/文件夹中，如果有报错请自行查看log是否koa未启动成功
npm run start //执行此操作，出现二维码，扫描登录成功后，键盘ctrl+c退出，然后执行
npm run pm2-wechaty // 执行日志在/wechaty/log/目录中，如果发现掉线，请重新执行npm run start后再执行此命令
```
> PS: 如发现pm2-wechaty执行后没有机器人效果, 可以执行`pm2 logs wechaty`看是否是卡在扫码阶段了, 如果是再次扫码登录即可

### 5. 更多问题
关于wechaty的相关接口，请
[参考wechaty官网文档](https://wechaty.js.org/v/zh/)，如果以上还没有解决你的问题，请先往wechaty的项目[issues](https://github.com/Chatie/wechaty/issues)中查找是否存在相同的问题，由于本项目是依赖wechaty开发，所以启动时遇到的问题大部分是wechaty的。


## 注意

 本项目属于个人兴趣开发，开源出来是为了技术交流，请勿使用此项目做违反微信规定或者其他违法事情。

 建议使用小号进行测试。

