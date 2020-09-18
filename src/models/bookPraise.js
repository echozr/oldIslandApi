/**
 * @description 书籍点在的数据模型
 * @author zr
 */
const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

// 创建数据表 popular
const bookPraise = seq.define('bookPraise', {
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
  type: {
    type: DataTypes.INTEGER,
    allowNull:false,
    comment: '类型'
  }
})

module.exports = bookPraise