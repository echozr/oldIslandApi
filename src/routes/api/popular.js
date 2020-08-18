const Router = require('koa-router')
const { addPoplar, AddShortIdValidator } = require('../../validators')
const { addPopular, getAdminPopList, deletePopular,getAppletsPopular } = require('../../controllers/popular')
const { auth, rootAdmin } = require('../../middleWares/auth')
const router = new Router({ prefix: '/popular' })

// 增加popular
router.post('/addPopular', auth, rootAdmin, async (ctx, next) => {
  //验证参数
  const v = await new addPoplar().validate(ctx)
  //获取参数
  const { addType, bgImage, title, resources, content, creationTime } = ctx.request.body
  //获取返回结果
  ctx.body = await addPopular({ addType, bgImage, title, resources, content, creationTime })
})

//根据类型、时间、分页查询popular列表
router.get('/getPopularList', auth, rootAdmin, async (ctx, next) => {
  // 获取参数
  const { type, time, start, count } = ctx.request.body
  // 获取返回值结果
  ctx.body = await getAdminPopList({ type, time, start, count })
})

router.get('/getAppletsPopular', auth,async(ctx,next)=>{
  // 获取参数
  const {time}= ctx.request.body
  // 获取返回值结果
  ctx.body = await getAppletsPopular(time)

})


// 删除popular
router.delete('/deletePopular', auth, rootAdmin, async (ctx, next) => {
  debugger
  //验证参数
  const v = await new AddShortIdValidator().validate(ctx)
  //获取参数
  const { id } = ctx.request.body
  // 删除方法
  ctx.body = await deletePopular(id, ctx)
})

module.exports = router