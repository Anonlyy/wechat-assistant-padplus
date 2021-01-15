const api = require('../proxy/api');
const lib = require('../lib');
const common = require('../common/index');
const config = require('../../wechat.config.js');

/**
 * 每日新闻资讯，针对群
 * @param {*} that bot对象
 * @param {*} item 任务项
 */
async function setEveryDayRoomSayTask(that, item) {
  try {
    let time = item.date;
    let room = await that.Room.find({ topic: item.roomName });
    if (!room) {
      console.log(`查找不到群：${item.roomName}，请检查群名是否正确`)
      return 
    }else{
      console.log(`群：“${item.roomName}”设置资讯任务成功`)
      lib.setSchedule(time, async () => {
        let content = await common.getEveryDayRoomContent( item.sortId,item.endWord);
        console.log('新闻咨询开始发送，内容：', content);
        await lib.delay(10000);
        await room.say(content);
      });
    }
  } catch (error) {
    console.log('设置群定时任务失败：', error);
  }
}
/**
 * 每日说定时任务设定，针对好友
 * @param {*} that bot对象
 * @param {*} item 任务项
 */
async function setEveryDayTask(that, item) {
  try {
    let time = item.date;
    let contact = await that.Contact.find({ alias: item.alias }) || await that.Contact.find({ name: item.name }); // 获取你要发送的联系人
      if(!contact){
        console.log(`查找不到用户昵称为'${item.name}'或备注为'${item.alias}'的用户，请检查设置用户是否正确`)
        return 
      }else{
        console.log(`设置用户：“${item.name}|${item.alias}”每日说任务成功`)
        lib.setSchedule(time, async () => {
          let daySocialNews = await common.getEveryDayRoomContent(7);
          console.log('今日国内新闻内容：', daySocialNews); 
          await lib.delay(15000);
          await contact.say('🗳️今日国内新闻内容\n' + daySocialNews);
          let dayMoneyNews = await common.getEveryDayMoneyContent();
          console.log('今日财经新闻：', dayMoneyNews); 
          await lib.delay(15000);
          await contact.say('✉️今日财经新闻：\n' + dayMoneyNews);
          let dayContent = await common.getEveryDayContent(item.memorialDay, item.city,item.endWord); 
          console.log('✉️今日财经新闻：', dayContent); 
          await lib.delay(15000);
          await contact.say(dayContent);
        });
      }
  } catch (error) {
    console.log('每日说任务设置失败');
  }
}

/**
 * 设置定时任务
 * @param {*} that bot 对象
 * @param {*} item 定时任务项
 */
async function setScheduleTask(that, item) {
  let time = item.isLoop ? item.time : new Date(item.time);
  lib.setSchedule(time, async () => {
    try {
      let contact = await that.Contact.find({ name: item.subscribe });
      console.log(`${item.subscribe}的专属提醒开启啦！`);
      await contact.say(item.content);
      if (!item.isLoop) {
        await api.updateSchedule(item._id);
      }
    } catch (error) {
      console.log('设置定时任务错误', error);
    }
  });
}
/**
 * 初始化小助手任务
 * @param {*} that bot对象
 * @param {*} scheduleList 提醒任务列表
 * @param {*} daySayList 每日说任务列表
 * @param {*} RoomSayList 群资讯任务列表
 */
async function initSchedule(that, scheduleList, daySayList, RoomSayList) {
  if (scheduleList && scheduleList.length > 0) {
    for (let item of scheduleList) {
      setScheduleTask(that, item);
    }
  }
  if (daySayList && daySayList.length > 0) {
    for (let day of daySayList) {
      setEveryDayTask(that, day);
    }
  }
  if (RoomSayList && RoomSayList.length > 0) {
    for (let room of RoomSayList) {
      setEveryDayRoomSayTask(that, room);
    }
  }
}
/**
 * 登录成功监听事件
 * @param {*} user 登录用户
 */
async function onLogin(user) {
  console.log(`贴心助理${user}登录了`);
  setTimeout(async ()=>{
    let scheduleList = await api.getScheduleList()
    console.log('提醒任务列表',scheduleList)
    initSchedule(this, scheduleList,config.DAYLIST,config.ROOMLIST);
  }, 4000)
}

module.exports = onLogin;
