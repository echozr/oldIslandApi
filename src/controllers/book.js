/**
 * @description   书籍页面相关控制器
 * @author zr
 */
const { SuccessModel, ErrorModel } = require("../core/http-exception")
const errorInfo = require("../lib/errorInfo")
const { createBooks, destroyBooks , findBookList, getBookInfo, updateBookInfo, addBookDiscuss } = require("../services/book")

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
const deleteBooks = async (id, ctx) => {
  const result = await destroyBooks(id, ctx)
  if (result) {
    return new SuccessModel('删除成功')
  }
  throw new ErrorModel(errorInfo.deletePopularFailInfo)
}
/**
 * 获取书籍列表
 * @param {string} title 书籍名称
 * @param {number} count 页数
 * @param {number} start 页码
 */
const getBookList = async (title, count, start, ctx) => {
  start === "" || start === undefined ? start = 0 : start = Number(start)
  count === "" || count === undefined ? count = 10 : count = Number(count)
  const userId = ctx.state.user.uid
  const result = await findBookList(title, count, start, userId)
  if(result){
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.getBookListFail)
}
/**
 * 根据ID获取书籍详情
 * @param {number} id 书籍ID
 */
const getBookInfoById = async (id,ctx) =>{
  const userId=ctx.state.user.uid
  const result = await getBookInfo(id,userId)
  if(result){
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.getBookInfoFail)
  
}
/**
 * 更新book详情数据
 * @param {object} object  id, title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType 
 */
const updateBook = async({id, title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType})=>{
  const result = await updateBookInfo({id, title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType})
  if (result) {
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.bookUpdateFail)
}

/**
 * 小程序端增加短评
 * @param {number} bookId  书籍ID 
 * @param {string} content    
 * @param {object} ctx 
 */
const addDiscuss = async(bookId,content,ctx)=>{
  debugger
  const userId=ctx.state.user.uid
  const result=await addBookDiscuss(bookId,content,userId)
  if(result){
    return new SuccessModel(result)
  }
  throw new ErrorModel(errorInfo.addBookDiscussFail)

}

module.exports = {
  addBooks,
  deleteBooks,
  getBookList,
  getBookInfoById,
  updateBook,
  addDiscuss
}