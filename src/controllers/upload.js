/**
 * @description  附件上传的控制
 * @author zr
 */
const path = require('path')
const fse = require('fs-extra')
const { SuccessModel, ErrorModel } = require('../core/http-exception')
const errorInfo = require('../lib/errorInfo')
const { getUploadDirName, getUploadFileExt } = require('../core/tools')

// 文件最大体积
const MAX_SIZE = 1024 * 1024 * 100 //100M
// 存储文件目录
const DIS_FOLDER_PATH = path.join(__dirname,'..','..', `public/upload/${getUploadDirName()}`)
// 判断上传存储目录，目录不存在创建目录
fse.pathExists(DIS_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIS_FOLDER_PATH)
  }
})
/**
 * 保存文件
 * @param {*} ctx
 * @param {string} name 文件名称 
 * @param {string} type 文件类型
 * @param {number} size 文件大小
 * @param {string} filePath 存放路径
 */
async function saveFile(ctx, { name, type, size, filePath }) {
  debugger
  // 判断文件是否超过设置的最大文件
  if (size > MAX_SIZE) {
    // 删掉文件，防治占用系统资源大小
    await fse.remove(filePath)
    return ErrorModel(errorInfo.uploadFileSizeFailInfo)
  }
  // 移动文件到制定目录下
  const fileName = Date.now() + '.' + name // 防止重名，名称前加随机时间戳
  const distFilePath = path.join(DIS_FOLDER_PATH, fileName)
  await fse.move(filePath,distFilePath)
  // 返回数据信息
  const url=ctx.request.header.host
  return new SuccessModel({
    url:`http://${url}/${getUploadDirName()}/${fileName}`
  })
}

module.exports={
  saveFile
}