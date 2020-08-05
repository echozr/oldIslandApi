/**
 * @description 鉴权中间件
 * @author zr
 */
const jwt = require('jsonwebtoken')
const { secretKey } = require('../config').security
const { ParameterException } = require('../core/http-exception')
/**
 * 获取请求头中是否携带token判断是否有访此页面的权限
 * @param {object} ctx 
 * @param {object} next 
 */
const auth = async (ctx, next, level) => {
  debugger
  // 获取请求头信息
  const { authorization = '' } = ctx.request.header
  // 获取token
  const token = authorization.replace('Bearer ', '')
  let errorMsg = "token不合法"
  if (!token) throw new ParameterException(errorMsg, 10003)
  try {
    // 解密token获取存储信息
    const user = jwt.verify(token, secretKey)
    // 将解密信息挂在到全局state上 
    ctx.state.user = user
  } catch (err) {
    // token不合法、token已过期  常见错误
    errorMsg = err.name === 'TokenExpiredError' ? 'token已过期' : 'token不合法'
    throw new ParameterException(errorMsg, 10006)
  }
  // 权限设置
  // const level = level || 1
  // if(ctx.state.user.权限<level){
  //   throw new ParameterException('权限不足', 10006)
  // }
  await next()
}
module.exports = {
  auth
}