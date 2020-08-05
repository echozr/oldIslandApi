/**
 * @description users services 
 * @author zr
 */
const bcrypt = require('bcryptjs')
const { users } = require('../models')
const { ErrorModel } = require('../core/http-exception')
const errorInfo = require('../lib/errorInfo')
/**
 * 根据邮箱或openId查询用户信息
 * @param {string} email 登录邮箱 
 * @param {string} openId  小程序openId
 */
const getUserByInfo = async (email, openId) => {
  let whereOpt = {}
  debugger
  if (email) {
    whereOpt = {
      email
    }
  }
  if (openId) {
    whereOpt = {
      openId
    }
  }
  const result = await users.findOne({
    where: whereOpt,
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  console.log(result)
  return result

}
/**
 * 数据表中插入数据
 * @param {string} email  邮箱
 * @param {string} password  密码
 * @param {string} nickname 昵称
 */
const addUser = async ({ email, paw, nickname }) => {
  const result = await users.create({
    email,
    password: paw,
    nickname
  })
  if (result) {
    return result.dataValues
  }
}
/**
 * 使用邮箱密码登录
 * @param {string} account  邮箱
 * @param {string} password  密码
 */
const emailLogin = async (account, password) => {
  const result = await users.findOne({
    where: {
      email: account
    }
  })
  // 判断该有限是否存在
  if (!result) {
    throw new ErrorModel(errorInfo.userNotExist)
  }
  const user = result.dataValues
  // 判断密码是否正确
  const isRight = bcrypt.compareSync(password, user.password)
  if (!isRight) {
    throw new ErrorModel(errorInfo.passWordFail)
  }

  return result
}

module.exports = {
  getUserByInfo,
  addUser,
  emailLogin
}