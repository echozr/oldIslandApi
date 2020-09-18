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
const bookDiscuss = require('./bookDiscuss')


// 外键关系
praise.belongsTo(users,{
  foreignKey: 'userId'
})

bookPraise.belongsTo(users,{
  foreignKey: 'userId'
})

bookDiscuss.belongsTo(users,{
  foreignKey: 'userId'
})

// 期刊点赞
praise.belongsTo(popular,{
  foreignKey:'popularId'
})
popular.hasMany(praise,{
  foreignKey: 'popularId'
})

// 书籍点赞
bookPraise.belongsTo(books,{
  foreignKey:'bookId'
})
books.hasMany(bookPraise,{
  foreignKey: 'bookId'
})

// 书籍评论
bookDiscuss.belongsTo(books,{
  foreignKey:'bookId'
})

books.hasMany(bookDiscuss,{
  foreignKey: 'bookId'
})


// 导出
module.exports = {
  users,
  popular,
  books,
  praise,
  bookPraise,
  bookDiscuss
}