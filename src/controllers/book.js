/**
 * @description   书籍页面相关控制器
 * @author zr
 */

const { SuccessModel, ErrorModel } = require("../core/http-exception")
const errorInfo = require("../lib/errorInfo")
const { createBooks ,destroyBooks } = require("../services/book")

/**
 * 新增书籍
 * @param {obj} obj title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType
 */
const addBooks = async ({ title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType }) => {
  const result = await createBooks({ title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType })
  if (result) {
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.addPraiseFail)
}

/**
 * 删除书籍
 * @param {number} id 书籍ID
 */
const deleteBooks = async (id,ctx) => {
  const result = await destroyBooks(id,ctx)
  if (result) {
    return new SuccessModel({ msg: '删除成功' })
  }
  throw new ErrorModel(errorInfo.deletePopularFailInfo)
}

module.exports = {
  addBooks,
  deleteBooks
}