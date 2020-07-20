const Router = require('koa-router')
const { RegisterValidator } = require('../../validators')
const router = new Router({ prefix:'/api/user'})

router.post('/register', async (ctx, next) => {
  debugger
  //验证参数
  const v = await new RegisterValidator().validate(ctx)
  //获取参数
  const { email, password, nickname } = v.get('body')
  //获取返回结果
  ctx.body = {v}
})

module.exports = router
