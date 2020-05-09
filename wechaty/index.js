// bot.js
import { Wechaty } from 'wechaty'
import { PuppetPadplus } from 'wechaty-puppet-padplus'
// import { PuppetPadpro  } from 'wechaty-puppet-padpro'
import onScan from './listeners/on-scan'
import onLogin from './listeners/on-login'
import onLogout from './listeners/on-logout'
import onFriend from './listeners/on-friend'
import onRoomjoin from './listeners/on-roomjoin'
import onMessage from './listeners/on-message'
const { WECHATYTOKEN } =  require('../wechat.config')


const puppet = new PuppetPadplus({
  token: WECHATYTOKEN
})

const bot = new Wechaty({ name: 'WechatEveryDay', puppet })


bot.on('scan', onScan)
.on('login', onLogin)
.on('message', onMessage)
.on('logout', onLogout)
.on('friendship', onFriend)
.on('room-join', onRoomjoin)


bot.start()
  .then(() => {
    console.log('开始登陆微信');
  })
  .catch(async function(e) {
    console.log(`初始化失败: ${e}.`)
    await bot.stop()
    process.exit(1)
  });
