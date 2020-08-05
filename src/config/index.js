/**
 * @description 页面数据库配置及其他秘钥配置等
 * @author zr
 */

const { isPord } = './env.js'
let mysqlConfig = {
  //host: 'lvchuang.f3322.net',
  host: '192.168.1.197',
  port: '3306',
  dialect: 'mysql',
  user: 'root',
  password: '321lvchuang,./',
  database: 'zz_island_db',
  timezone: '+08:00'
}

if (isPord) {
  mysqlConfig = {
    //host: 'lvchuang.f3322.net',
    host: '192.168.1.197',
    port: '3306',
    dialect: 'mysql',
    user: 'root',
    password: '321lvchuang,./',
    database: 'zz_island_db',
    max: 5,  //连接池最大连接数
    min: 0,  //最小连接数
    acquire: 30000,  //
    timezone: '+08:00',
    idle: 10000
  }
}




let config = {
  mysqlConfig,
  security: {
    secretKey: '@SuAN%He8H12djh@sFJu~2*&.P,&1!',
    expiresIn: '1d'
  },
  wxConfig: {
    appID:'wx5d8d7b0ab05689f5',
    appSecret:'6693041196b2f537a44cd0fce53b11d4',
    url:'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
  }
}

module.exports = config