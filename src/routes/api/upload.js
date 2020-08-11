const Router = require('koa-router')
const koaForm = require('formidable-upload-koa')
const {saveFile} = require ('../../controllers/upload')
const {auth,rootAdmin}=require('../../middleWares/auth')
const router = new Router({ prefix: '/upload' })
const option = {
  keepExtensions: true // 保持原有后缀名
}

//上传图片
router.post('/fileImg', auth, rootAdmin, koaForm(option), async (ctx, next) => {
  debugger
  const File = ctx.req.files.file || ctx.req.files.File
  const { size, path, name, type } = File
  // 调用controller
  ctx.body = await saveFile(ctx, {
    name, type, size, filePath: path
  })

})
module.exports = router