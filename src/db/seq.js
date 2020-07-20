/**
 * @description sequelize 实例化对象
 * @author zr
 */

const Sequelize = require('sequelize')
const { mysqlConfig } = require('../config')
const { host, user, password, dialect, database, port, max, min, acquire, timezone } = mysqlConfig
const { isProd, isTest } = require('../config/env')

// 初始化config
const config = {
  host,
  user,
  dialect,
  timezone,
  define: { 
    freezeTableName: true //强制表名称等于模型名称
  }
}

// 连接池配置（线上环境使用）
if (isProd) {
  config.pool = {
    max, // 连接池最大连接数
    min, // 最小连接数 
    acquire,
    idle  //一个 连接池10s没有被使用,则释放
  }
}

// 测试环境下不打印sql 语句
if (isTest) {
  config.logging = () => { }
}

const seq = new Sequelize(database, user, password, config)

module.exports = seq