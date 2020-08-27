const Router = require('koa-router')
const { auth, rootAdmin } = require('../../middleWares/auth')
const { addBook,AddShortIdValidator } = require('../../validators')
const { addBooks,deleteBooks } = require('../../controllers/book')
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
  const v= await new AddShortIdValidator().validate(ctx)
  // 获取参数
  const {id}=ctx.request.body
  
  ctx.body=await deleteBooks(id,ctx)
})

module.exports = router