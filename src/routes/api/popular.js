const Router = require('koa-router')
const { addPoplar, AddShortIdValidator } = require('../../validators')
const { addPopular, getAdminPopList, deletePopular, getAppletsPopular, getPopularInfo, updatePopular } = require('../../controllers/popular')
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
  debugger
  const { title, type, time, start, count } = ctx.query
  // 获取返回值结果
  ctx.body = await getAdminPopList({ title, type, time, start, count })
})

// 删除popular
router.delete('/deletePopular', auth, rootAdmin, async (ctx, next) => {
  debugger
  //验证参数
  const v = await new AddShortIdValidator().validate(ctx)
  //获取参数
  const { id } = ctx.query
  // 删除方法
  ctx.body = await deletePopular(id, ctx)
})

// 根据ID获取详情页
router.get('/getPopularInfoById', auth, rootAdmin, async (ctx, next) => {
  debugger
  //验证参数
  const v = await new AddShortIdValidator().validate(ctx)
  //获取参数
  const { id } = ctx.query
  // 删除方法
  ctx.body = await getPopularInfo(id)
})

// 更新update
router.post('/updatePopular', auth, rootAdmin, async (ctx, next) => {
  //验证参数
  const v = await new addPoplar().validate(ctx)
  const d = await new AddShortIdValidator().validate(ctx)
  //获取参数
  const { id: popId, addType, bgImage, title, resources, content, creationTime } = ctx.request.body
  //获取返回结果
  ctx.body = await updatePopular({ popId, addType, bgImage, title, resources, content, creationTime })
})


/**********************************************小程序模块接口***************************************************/
// 小程序获取流行模块
router.get('/getAppletsPopular', auth, async (ctx, next) => {
  // 获取参数
  const { time } = ctx.request.body
  // 获取返回值结果
  ctx.body = await getAppletsPopular(time, ctx)

})

module.exports = router