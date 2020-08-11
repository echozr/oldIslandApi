const Router = require('koa-router')
const { addPoplar } = require('../../validators')
const { addPopular} = require('../../controllers/popular')
const {auth,rootAdmin} = require('../../middleWares/auth')
const router = new Router({ prefix: '/popular' })

// 增加popular
router.post('/addPopular',auth,rootAdmin,async(ctx,next)=>{
  //验证参数
  const v = await new addPoplar().validate(ctx)
  //获取参数
  const { addType, bgImage,title,resources,content,creationTime} = ctx.request.body
  //获取返回结果
  ctx.body = await addPopular({addType, bgImage,title,resources,content,creationTime})
})

//根据类型、时间、分页查询popular列表
router.get('/getPopularList',auth,async(ctx,next)=>{
  // 验证参数
  const v=await new getPopularList().validate(ctx)
  

})

module.exports=router