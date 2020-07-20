/**
 * @description 用户表的数据模型
 * @author zr
 */
const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

// 创建数据表 users

const users = seq.define('user', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    comment: '邮箱'
  },
  password: {
    type: DataTypes.STRING,
    comment: '密码'
  },
  openId:{
    type:DataTypes.STRING,
    unique:true,
    comment:'小程序用户的唯一值'
  },
  nickname:{
    type:DataTypes.STRING,
    comment:'昵称'
  },
  avatar:{
    type:DataTypes.STRING,
    comment:'头像'
  }
})

module.exports=users