/**
 * @description 微信相关的接口处理
 * @author zr
 */
const axios = require('axios')
const config = require('../config')
const {ErrorModel} = require('../core/http-exception')
const { users } = require('../models')
const { generateToken } = require('../core/jwt')

const getWxToken = async (code, scope) => {
  debugger
  const URL = `${config.wxConfig.url}?appid=${config.wxConfig.appID}&secret=${config.wxConfig.appSecret}&js_code=${code}&grant_type=authorization_code`
  const result = await axios.get(URL)

  if (result.status !== 200) {
    throw new ErrorModel({msg:"openid获取失败"})
  }

  const { errcode, openid, errmsg } = result.data

  if (errcode) {
    throw new ErrorModel({msg:`gopenid获取失败,${errmsg}`})
  }
  // 判断用户是否存在
  let user = await users.findAll({
    where: {
      openId: openid
    }
  })
  let token
  if (user.length<1) {
    const userResult = await users.create({ openId: openid })
    return generateToken(userResult.id, scope)
  }
  const id=user[0].dataValues.id
  return generateToken(id, scope)
}

module.exports = {
  getWxToken
}