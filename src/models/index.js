/**
 * @description 数据模型的入口文件
 * @author zr
 */

// 引用
const users = require('./users')
const popular= require('./popular')
const books=require('./books')
const praise= require('./praise')
const bookPraise = require('./bookPraise')


// 外键关系
praise.belongsTo(users,{
  foreignKey: 'userId'
})

praise.belongsTo(popular,{
  foreignKey:'popularId'
})
popular.hasMany(praise,{
  foreignKey: 'popularId'
})

bookPraise.belongsTo(users,{
  foreignKey: 'userId'
})

bookPraise.belongsTo(books,{
  foreignKey:'bookId'
})
books.hasMany(bookPraise,{
  foreignKey: 'bookId'
})


// 导出
module.exports = {
  users,
  popular,
  books,
  praise,
  bookPraise
}