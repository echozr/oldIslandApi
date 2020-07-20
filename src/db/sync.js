/**
 * @description sequelize 同步数据库
 * @author zr
 */

const seq = require('./seq')
require('../models')

// 连接数据库
seq.authenticate().then(() => {
  console.log('连接数据库成功')
}).catch(() => {
  console.log('连接数据库失败')
})

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('执行同步成功')
  process.exit()
})