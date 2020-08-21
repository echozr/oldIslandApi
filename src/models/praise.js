/**
 * @description 点赞表数据模型
 * @author zr
 */
const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

// 创建数据表 popular
const praise = seq.define('praise', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    comment: '标题'
  },
  popularId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    comment: '内容'
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull:false,
    comment: '类型'
  }
})

module.exports = praise