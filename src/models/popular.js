/**
 * @description 流行主表的数据模型
 * @author zr
 */
const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

// 创建数据表 popular
const popular = seq.define('popular', {
  title: {
    type: DataTypes.STRING, 
    comment: '标题'
  },
  content: {
    type: DataTypes.STRING,
    allowNull:false,
    comment: '内容'
  },
  addType: {
    type: DataTypes.INTEGER,
    allowNull:false,
    comment: '类型'
  },
  creationTime: {
    type: DataTypes.STRING,
    allowNull:false,
    comment: '创建时间'
  },
  bgImage:{
    type: DataTypes.STRING,
    allowNull:false,
    comment: '插入图片'
  },
  resources:{
    type: DataTypes.STRING,
    allowNull:true,
    comment: '视频音频资源',
    defaultValue:''
  }
})

module.exports = popular