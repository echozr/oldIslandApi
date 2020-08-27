/**
 * @description users 的控制器
 * @author zr
 */
const bcrypt = require('bcryptjs')
const { SuccessModel, ErrorModel } = require('../core/http-exception')
const { getUserByInfo, addUser, emailLogin } = require('../services/users')
const { generateToken } = require('../core/jwt')
const { LoginType } = require('../lib/enum')
const errorInfo = require('../lib/errorInfo')
/**
 * 根据邮箱或openId查询用户
 * @param {string} email 邮箱号 
 * @param {string} openId 小程序登录的openId
 */
const getUser = async (email, openId) => {
  const result = await getUserByInfo(email, openId)
  if (result) {
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.getUserFail)
}

/**
 * 注册用户
 * @param {string} email  邮箱
 * @param {string} password  密码
 * @param {string} nickname 昵称
 */
const resisterUser = async ({ email, password, nickname }) => {
  const user = await getUserByInfo(email)
  if (user) {
    throw new ErrorModel(errorInfo.emailAlreadyExists)
  }
  //密码加密
  const salt = bcrypt.genSaltSync(10)
  const paw = bcrypt.hashSync(password, salt)
  // 注册用户
  const result = await addUser({ email, paw, nickname })
  if (result) {
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.registerFail)
}

/**
 * 根据类型确认登录方式
 * @param {string} account  邮箱email 或  微信登录返回的code
 * @param {string} password  邮箱的密码
 * @param {string} type  登录的类型
 */
const LoginByType = async ({ account, password, type }) => {
  let Token
  switch (Number(type)) {
    case LoginType.USER_EMAIL:
      user = await emailLogin(account, password)
      Token = generateToken(user.id, 2)
      break;
    case LoginType.ADMIN_EMAIL:
      user = await emailLogin(account, password)
      Token = generateToken(user.id, 10)
      break;
    case LoginType.USER_MINI_PROGRAM:
      return Token = 'A'
      break
    default:
      throw new ErrorModel({ "msg": "没有响应的处理函数" })
      break;
  }
  return new SuccessModel(Token)


}

module.exports = {
  getUser,
  resisterUser,
  LoginByType
}