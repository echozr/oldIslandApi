/**
 * @description  点赞相关接口数据库操作
 * @author zr
 */
const sequelize = require('sequelize')
const { praise, popular, books, bookPraise } = require('../models')

/**
 * 添加点赞功能
 * @param {number} userId 用户id
 * @param {number} type 类型
 * @param {number} popularId 期刊ID
 */
const createPraise = async (userId, type, popularId) => {
  debugger
  let isCheck
  let result
  if (type === 400 || type === '400') {
    isCheck = await bookPraise.findAll({
      where: {
        userId, type, bookId: popularId
      }
    })
  } else {
    isCheck = await praise.findAll({
      where: {
        userId, type, popularId
      }
    })
  }
  if (isCheck.length > 0) {
    return '已经点过赞'
  }
  if (type === 400 || type === '400') {
    result = await bookPraise.create({
      userId,
      type,
      bookId: popularId
    })
  } else {
    result = await praise.create({
      userId,
      type,
      popularId
    })
  }
  console.log(result)
  return result
}

/**
 * 取消点赞功能
 * @param {number} userId 用户id
 * @param {number} type 类型
 * @param {number} popularId 期刊ID
 */
const deletePraise = async (userId, type, popularId) => {
  if (type === 400 || type === '400') {
    return await bookPraise.destroy({
      where: {
        userId,
        type,
        bookId: popularId
      }
    })
  } else {
    return await praise.destroy({
      where: {
        userId,
        type,
        popularId
      }
    })
  }
}
/**
 * 根据用户获取她喜欢的期刊
 * @param {number} userId 用户id
 * @param {number} type 类型
 */
const findPraiseList = async (userId, type) => {
  const whereOpt = {
    userId,
    type
  }
  const result = await praise.findAndCountAll({
    where: whereOpt,
    attributes: ['userId', 'popularId'],
    distinct: true,
    include: [
      {
        model: popular,
        attributes: ['addType', 'bgImage', 'title'],
        include: [{
          model: praise
        }]
      }
    ]
  })
  const list = result.rows.map(v => {
    const item = v.dataValues.popular
    const praiseNum = item.praises.length
    const isCheck = item.praises.filter(x => x.dataValues.userId === userId)
    return {
      popularId: v.dataValues.popularId,
      Type: item.addType,
      bgImage: item.bgImage,
      title: item.title,
      praiseNum: praiseNum,
      isCheck: isCheck.length > 0 ? true : false
    }
  })
  return {
    count: result.count,
    list
  }
}

module.exports = {
  createPraise,
  deletePraise,
  findPraiseList
}