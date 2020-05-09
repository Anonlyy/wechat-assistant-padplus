const api = require('../proxy/api');
const lib = require('../lib');
const service = require('../service/msg-filter-service');
const {FileBox} = require('file-box');
const path = require('path')
/**
 * 获取每日新闻内容
 * @param {*} sortId 新闻资讯分类Id
 * @param {*} endWord 结尾备注
 */
async function getEveryDayRoomContent(sortId, endWord = '微信小助手') {
  let today = lib.formatDate(new Date()); //获取今天的日期
  let news = await api.getNews(sortId);
  let content = `${today}\n${news}\n————————————${endWord}`;
  return content;
}
/**
 * 获取每日财经新闻内容
 * @param {*} endWord 结尾备注
 */
async function getEveryDayMoneyContent(sortId, endWord = '微信小助手') {
  let today = lib.formatDate(new Date()); //获取今天的日期
  let news = await api.getMoneyNews(sortId);
  let content = `${today}\n${news}\n————————————${endWord}`;
  return content;
}
/**
 * 获取每日说内容
 * @param {*} date 与朋友的纪念日
 * @param {*} city 朋友所在城市
 * @param {*} endWord 结尾备注
 */
async function getEveryDayContent(date, city, endWord) {
  let oneData = await api.getOne(); //获取每日一句
  const one = `${oneData.content}\n${oneData.note}`
  let weather = await api.getTXweather(city); //获取天气信息
  let today = lib.formatDate(new Date()); //获取今天的日期
  let memorialDay = lib.getDay(date); //获取纪念日天数
  let sweetWord = await api.getSweetWord(); // 土味情话
  let str = `😘${today}\n👫我们在一起的第${memorialDay}天\n☀️又是元气满满的一天,要开心噢\n\n${weather.todayWeather}\n${weather.weatherTips}\n\n💪每日一句:\n${one}\n\n💑情话对你说:\n${sweetWord}\n————————${endWord}`;
  return str;
}


// 添加定时提醒
async function addSchedule(that,obj) {
  try {
    let scheduleObj = await api.setSchedule(obj)
    let nickName = scheduleObj.subscribe
    let time = scheduleObj.time
    let Rule1 = scheduleObj.isLoop ? time : new Date(time)
    let content = scheduleObj.content
    let contact = await that.Contact.find({ name: nickName })
    let _id = scheduleObj._id
    lib.setSchedule(Rule1, async() => {
      console.log('你的专属提醒开启啦！')
      await lib.delay(10000)
      await contact.say(content)
      if (!scheduleObj.isLoop) {
          api.updateSchedule(_id)
      }
    })
    return true
  } catch (error) {
    console.log('设置定时任务失败',error)
    return false
  } 
}

/**
 * 获取私聊返回内容
 */
async function getContactTextReply(that, contact, msg) {
  const contactName = contact.name();
  const contactId = contact.id;
  const contactAvatar = await contact.avatar();
  let result = await service.filterFriendMsg(msg, contactName, contactId,contactAvatar);
  if (result.type == 'text') {
    return result.content;
  } else if (result.type == 'addRoom') {
    let room = await that.Room.find({ topic: result.event.name });
    if (room) {
      try {
        await lib.delay(2000);
        contact.say('小助手正在处理你的入群申请，请不要重复回复...');
        await lib.delay(10000);
        await room.add(contact);
      } catch (e) {
        console.error('加群报错',e);
      }
    }else{
      console.log(`不存在此群：${result.event.name}`)
    }
    return ''
  }else if(result.type == 'remind') {
    try{
      let scheduleObj = result.content
      if(scheduleObj.isLoop){
        if(scheduleObj.time){
          let res = await addSchedule(that,scheduleObj)
          if(res){
            await lib.delay(2000)
            contact.say('小助手已经把你的提醒牢记在小本本上了')
          }else{
            await lib.delay(2000)
            contact.say('添加提醒失败，请稍后重试')
          }
        }else{
          contact.say('提醒设置失败，请保证每个关键词之间使用空格分割开，并保证日期格式正确。正确格式为：“提醒(空格)我(空格)每天(空格)18:30(空格)下班回家')
        }
      }else{
        let isTime = lib.isRealDate(scheduleObj.time)
        if(isTime){
          await addSchedule(that,scheduleObj)
          await lib.delay(2000)
          contact.say('小助手已经把你的提醒牢记在小本本上了')
        }else{
          await lib.delay(2000)
          contact.say('提醒设置失败，日期格式不正确。正确格式为：“提醒(空格)我(空格)18:30(空格)下班回家” 或“提醒(空格)我(空格)2019-10-01 8:30(空格)还有两天就是老婆生日，要准备一下了”')
        }
      }
      return ''
    }catch(e){
      console.log(`定时任务出错，${e}`)
    }
  }else if(result.type == 'event') {
    if(typeof result.content === 'object'){
      if(result.content.type === 'file'){
        let fileObj = FileBox.fromDataURL('data:text/plain;base64,'+result.content.src, contactName+contactId+'.jpg')
        return  fileObj
      }else if(result.content.type === 'fileBox'){
        return result.content.src
      }
    }else{
      return result.content;
    }
  }
}
/**
 * 获取群消息回复
 * @param {*} content 群消息内容
 * @param {*} name 发消息者昵称
 * @param {*} id 发消息者id
 */
async function getRoomTextReply(content,name,id,avatar){
  let result = await service.filterRoomMsg(content,name, id, avatar);
  if (result.type == 'text') {
    return result.content;
  } else if (result.type == 'event') {
    if(typeof result.content === 'object'){
      if(result.content.type === 'file'){
        let fileObj = FileBox.fromDataURL('data:text/plain;base64,'+result.content.src, name+id+'.jpg')
        return  fileObj
      }else if(result.content.type === 'fileBox'){
        return result.content.src
      }
    }else{
      return result.content;
    }
  }
}

module.exports = {
  getEveryDayContent,
  getEveryDayRoomContent,
  getEveryDayMoneyContent,
  getContactTextReply,
  getRoomTextReply
};
