const Router = require('koa-router')
const { RegisterValidator,LoginValidator } = require('../../validators')
const { resisterUser,LoginByType } = require('../../controllers/users')
const { LoginType } = require('../../lib/enum')
const router = new Router({ prefix: '/user' })

// 注册
router.post('/register', async (ctx, next) => {
  //验证参数
  const v = await new RegisterValidator().validate(ctx)
  //获取参数
  const { email, password1:password, nickname } = v.get('body')
  //获取返回结果
  ctx.body = await resisterUser({ email, password, nickname })
})
//登录获取token
router.post('/login', async (ctx, next) => {
  // 验证参数
  const v= await new LoginValidator().validate(ctx)
  // 获取参数
  const {account,password,type}=v.get('body')
  debugger
  // 获取返回结果
  ctx.body = await LoginByType({account,password,type})
})

module.exports = router
