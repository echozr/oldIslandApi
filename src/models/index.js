/**
 * @description 数据模型的入口文件
 * @author zr
 */

// 引用
const users = require('./users')
const popular= require('./popular')
const books=require('./books')


// 外键关系



// 导出
module.exports = {
  users,
  popular,
  books
}