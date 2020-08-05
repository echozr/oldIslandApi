/**
 * @description 生成jwt令牌
 * @author zr
 */

const jwt = require('jsonwebtoken');
const {secretKey, expiresIn } = require('../config').security

/**
 * 根据信息生成token
 * @param {string} uid  登录成功返回的用户id 
 * @param {Number} scope  权限级别
 */
const generateToken =  (uid, scope) => {
  const token = jwt.sign({ uid, scope }, secretKey, { expiresIn: expiresIn })
  return token
}

module.exports = {
  generateToken
}