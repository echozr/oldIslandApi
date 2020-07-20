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
  mysqlConfig
}

module.exports = config