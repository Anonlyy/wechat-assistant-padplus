const QrcodeTerminal = require('qrcode-terminal')
import { ScanStatus } from 'wechaty-puppet'
// const { ScanStatus } = require('wechaty-puppet')
/**
 * 扫描登录，显示二维码
 */
async function onScan (qrcode, status){
  if (status === ScanStatus.Waiting) {
    QrcodeTerminal.generate(qrcode, {
      small: true
    })
  }
  // Qrterminal.generate(qrcode)
  //   const qrImgUrl = ['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode)].join('')
  //   console.log(qrImgUrl)
}

module.exports = onScan