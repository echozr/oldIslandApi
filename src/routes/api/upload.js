const Router = require('koa-router')
const koaForm = require('formidable-upload-koa')
const {saveFile} = require ('../../controllers/upload')
const router = new Router({ prefix: '/api/upload' })
const option = {
  keepExtensions: true // 保持原有后缀名
}

//上传图片
router.post('/fileImg', koaForm(option), async (ctx, next) => {
  debugger
  const File = ctx.req.files.file
  const { size, path, name, type } = File
  // 调用controller
  ctx.body = await saveFile(ctx, {
    name, type, size, filePath: path
  })

})
module.exports = router