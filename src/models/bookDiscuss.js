/**
 * @description 书籍短评数据模型
 * @author zr
 */
const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

// 创建数据表 popular
const bookDiscuss = seq.define('bookDiscuss', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    comment: '用户id'
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    comment: '书籍id'
  },
  num: {
    type: DataTypes.INTEGER,
    allowNull:false,
    comment: '增加的数量',
    defaultValue:0
  },
  content: {
    type: DataTypes.TEXT,
    allowNull:false,
    comment: '评论内容'
  }
})

module.exports = bookDiscuss