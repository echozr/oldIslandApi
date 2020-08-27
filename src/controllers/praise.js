/**
 * @description   点赞页面的控制器
 * @author zr
 */

const { SuccessModel, ErrorModel } = require('../core/http-exception')
const errorInfo = require('../lib/errorInfo')
const { ArtType } = require('../lib/enum')
const { createPraise, deletePraise,findPraiseList } = require('../services/praise')

/**
 * 根据用户ID点赞
 * @param {*} ctx
 * @param {*} type
 * @param {*} popularId
 */
const addPraise = async (ctx, type, popularId) => {
  const userId = ctx.state.user.uid
  const result = await createPraise(userId, type, popularId)
  if (result) {
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.addPraiseFail)
}

/**
 * 根据参数取消点赞
 * @param {*} ctx
 * @param {*} type
 * @param {*} popularId
 */
const cancelLike = async (ctx, type, popularId) => {
  const userId = ctx.state.user.uid
  const result = await deletePraise(userId, type, popularId)
  if (result) {
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.cancelPraiseFail)
}

/**
 * 获取点赞期刊或书籍
 * @param {*} ctx
 * @param {*} type
 */
const getPraiseList = async (ctx, type) => {
  const userId = ctx.state.user.uid
  let result
  switch (Number(type)) {
    case ArtType.BOOK:
      // 查询书籍表
      break
    case ArtType.MUSIC:
    case ArtType.SENTENCE:
    case ArtType.VIDEO:
    case ArtType.MOVIE:
      // 查询期刊表
      result=await findPraiseList(userId,type)
      break
  }
  if(result){
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.addPraiseFail)
}

module.exports = {
  addPraise,
  cancelLike,
  getPraiseList
}