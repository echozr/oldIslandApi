const Router = require('koa-router')
const { auth, rootAdmin } = require('../../middleWares/auth')
const { addBook, AddShortIdValidator,addDiscussValidate } = require('../../validators')
const { addBooks, deleteBooks, getBookList, getBookInfoById, updateBook,addDiscuss } = require('../../controllers/book')
const router = new Router({ prefix: '/books' })

// 添加书籍
router.post('/addBooks', auth, rootAdmin, async (ctx, next) => {
  // 参数验证
  const v = await new addBook().validate(ctx)
  // 获取参数
  const { title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType } = ctx.request.body
  // 调用添加controller
  ctx.body = await addBooks({ title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType })
})

// 删除书籍
router.delete('/deleteBooks', auth, rootAdmin, async (ctx, next) => {
  // 参数验证
  const v = await new AddShortIdValidator().validate(ctx)
  // 获取参数
  const { id } = ctx.query

  ctx.body = await deleteBooks(id, ctx)
})

// 获取书籍列表
router.get('/getBookList', auth, async (ctx, next) => {
  // 获取参数
  debugger
  const { title, count, start } = ctx.query
  ctx.body = await getBookList(title, count, start, ctx)
})

// 根据Id获取书籍详情
router.get('/getBookInfoByID', auth, async (ctx, next) => {
  // 参数验证
  const v = await new AddShortIdValidator().validate(ctx)
  // 获取参数
  const { id } = ctx.query
  // 调用controller
  ctx.body = await getBookInfoById(id,ctx)
})

// 更新数据详情
router.post('/updateBook',auth,rootAdmin,async(ctx,next)=>{
  // 参数验证
  debugger
  const v = await new addBook().validate(ctx)
  const v1 = await new AddShortIdValidator().validate(ctx)
  // 获取参数
  const {id, title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType } = ctx.request.body
  // 调用添加controller
  ctx.body = await updateBook({id, title, content, addType, creationTime, bgImage, author, publicHouse, PublicYear, pages, pricing, bookType })
})

// 小程序端

// 书籍短评
router.post ('/addDiscuss',auth, async(ctx,next)=>{
  // 参数验证
  debugger
  const v = await new addDiscussValidate().validate(ctx)
  const {id:bookId,content}=ctx.request.body
  ctx.body= await addDiscuss(bookId,content,ctx)
  
})
module.exports = router