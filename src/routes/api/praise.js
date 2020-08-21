const Router = require('koa-router')
const { auth } = require('../../middleWares/auth')
const { PraiseValidator, PraiseTypeValidator } = require('../../validators')
const { addPraise, cancelLike,getPraiseList } = require('../../controllers/praise')
const router = new Router({ prefix: '/praise' })

// 新增点赞
router.post('/addLike', auth, async (ctx, next) => {
  console.log(ctx)
  // 参数验证
  const v = await new PraiseValidator().validate(ctx)
  // 获取参数
  const { type, popularId } = ctx.request.body
  // 调用控制器方法
  ctx.body = await addPraise(ctx, type, popularId)
})

// 取消点赞
router.post('/cancelLike', auth, async (ctx, next) => {
  // 参数验证
  const v = await new PraiseValidator().validate(ctx)
  // 获取参数
  const { type, popularId } = ctx.request.body
  // 调用控制器方法
  ctx.body = await cancelLike(ctx, type, popularId)
})

// 获取点赞期刊或书籍
router.get('/getPraiseList', auth, async (ctx, next) => {
  // 参数验证
  const v = await new PraiseTypeValidator().validate(ctx)
  // 获取参数
  const { type } = ctx.request.body
  // 调用控制器方法
  ctx.body = await getPraiseList(ctx, type)
})


module.exports = router