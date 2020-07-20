const Koa =require('koa')
const app = new Koa()
const bodyParser =require('koa-bodyparser')
const error =require('koa-json-error')
const InitManger =require('./core/init')

app.use(error({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}))

app.use(bodyParser())
InitManger.initCore(app) //初始化类
app.listen(3000, () => { console.log('http://localhost:3000') })