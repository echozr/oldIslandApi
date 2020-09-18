/**
 * @description  书籍相关接口数据库操作
 * @author zr
 */

const sequelize = require('sequelize')
const { books, bookPraise, bookDiscuss } = require('../models')
const { ErrorModel } = require('../core/http-exception')
const { delFile } = require('../controllers/upload')
const Op = sequelize.Op
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
  if (result.dataValues) {
    return '添加成功'
  }
}

/**
 * 删除书籍及附件
 * @param {number} id 删除书籍
 */
const destroyBooks = async (id, ctx) => {
  debugger
  const result1 = await books.findOne({ where: { id } });
  if (!result1) {
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

/**
 * 获取书籍列表
 * @param {string} title 书籍名称
 * @param {number} count 页数
 * @param {number} start 页码
 */
const findBookList = async (title, count, start, userId) => {
  debugger
  const whereOpt = {}
  if (title) {
    Object.assign(whereOpt, { title: { [Op.like]: `%${title}%` } })
  }
  const result = await books.findAndCountAll({
    limit: count,
    offset: start * count,
    where: whereOpt,
    order: [
      ['id', 'desc']
    ],
    attributes: ['id', 'title', 'content', 'addType', 'creationTime', 'bgImage', 'author', 'publicHouse', 'bookType', 'pages'],
    include: [
      {
        model: bookPraise,
        attributes: ['userId', 'bookId']
      },
      {
        model:bookDiscuss,
        attributes: ['content', 'num']
      }
    ]
  })
  let sum=0
  const list = result.rows.map(v => {
    const item = v.dataValues
    const praiseNum = item.bookPraises.length
    const discussNum= item.bookDiscusses.map(v => v.dataValues.num)
    debugger
    for(let i in discussNum){
      sum=sum+discussNum[i]
    }
    v.dataValues.bookDiscusses = sum
    v.dataValues.bookPraises = praiseNum
    return v.dataValues
  })
  
  return {
    total: result.count,
    list,
    start,
    count
  }
}

/**
 * 根据ID获取书籍详情
 * @param {number} id 书籍ID
 */
const getBookInfo = async (id,userId) => {
  const whereOpt = {
    id
  }
  const result = await books.findAndCountAll({
    where: whereOpt,
    include: [
      {
        model: bookPraise,
        attributes: ['userId', 'bookId']
      },
      {
        model:bookDiscuss,
        attributes: ['content', 'num']
      }
    ]
  })
  const list = result.rows.map(v => {
    const item = v.dataValues
    const praiseNum = item.bookPraises.length
    const isCheck = item.bookPraises.filter(x => x.dataValues.userId === userId)
    v.dataValues.bookPraises = praiseNum
    v.dataValues.isCheck = isCheck.length > 0 ? true : false
    return v.dataValues
  })

  console.log( list[0])
  return list[0]
}
/**
 * 更新book详情数据
 * @param {object} object  id, title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType 
 */
const updateBookInfo = async ({ id, title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType }) => {
  debugger
  const whereOpt = {
    id
  }
  const updateOpt = {
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
  const result = await books.update(updateOpt, {
    where: whereOpt
  })
  console.log(result)
  if (result) {
    return '更新成功'
  }
}

/**
 * 添加书籍短评
 * @param {string} title 书籍名称
 * @param {number} count 页数
 * @param {number} start 页码
 */
const addBookDiscuss = async (bookId, content, userId) => {
  debugger
  // 判断此书时候有该短评
  const discuss = await bookDiscuss.findOne({
    where: {
      bookId,
      content
    }
  })
  if (discuss) {
    return await discuss.increment('num', { by: 1 })
  } else {
  return await bookDiscuss.create(
      {
        bookId,
        content,
        num:1,
        userId
      }
    )
  }

}

module.exports = {
  createBooks,
  destroyBooks,
  findBookList,
  getBookInfo,
  updateBookInfo,
  addBookDiscuss
}