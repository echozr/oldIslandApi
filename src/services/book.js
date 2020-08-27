/**
 * @description  书籍相关接口数据库操作
 * @author zr
 */

const sequelize = require('sequelize')
const { praise, popular, books } = require('../models')
const { ErrorModel } = require('../core/http-exception')
const { delFile } = require('../controllers/upload')
/**
 * 新增书籍
 * @param {obj} obj title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType
 */
const createBooks = async ({ title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType }) => {
  debugger
  const whereOpt = {
    title,
    content,
    addType,
    creationTime,
    bgImage,
    author,
    publicHouse,
    PublicYear,
    pages,
    pricing,
    bookType
  }
  // 判断该书籍是否存在数据库中
  const data = await books.findAll({
    where: {
      title,
      content,
      addType,
      author
    }
  })
  debugger
  if (data.length > 0) {
    throw new ErrorModel({ 'msg': '该书籍已存在，请勿重复添加', code: 30004 })
  }
  const result = await books.create(
    whereOpt
  )
  return result.dataValues
}

/**
 * 删除书籍及附件
 * @param {number} id 删除书籍
 */
const destroyBooks= async(id,ctx)=>{
  debugger
  const result1 = await books.findOne({ where: { id } });
  if(!result1){
    return 
  }
  await delFile(ctx, result1.dataValues.bgImage)
  const result = await books.destroy({
    where: {
      id
    }
  });
  console.log(result)
  return result
}

module.exports = {
  createBooks,
  destroyBooks
}