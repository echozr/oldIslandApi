/**
 * @description 书籍的数据模型
 * @author zr
 */
const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

// 创建数据表 books
const books = seq.define('book', {
  title: {
    type: DataTypes.STRING,
    comment: '标题'
  },
  content: {
    type: DataTypes.TEXT('long'),
    comment: '内容'
  },
  addType: {
    type: DataTypes.INTEGER,
    comment: '类型'
  },
  creationTime: {
    type: DataTypes.STRING,
    comment: '创建时间'
  },
  bgImage:{
    type: DataTypes.STRING,
    comment: '插入图片'
  },
  author:{
    type: DataTypes.STRING,
    comment: '书籍作者'
  }, 
  publicHouse:{
    type: DataTypes.STRING,
    comment: '出版社'
  },
  PublicYear: {
    type: DataTypes.STRING,
    comment: '出版年份'
  },
  pages:{
    type: DataTypes.STRING,
    comment: '页数'
  },
  pricing:{
    type: DataTypes.STRING,
    comment: '价格'
  },
  bookType:{
    type: DataTypes.STRING,
    comment: '装订类型'
  }
})

module.exports = books