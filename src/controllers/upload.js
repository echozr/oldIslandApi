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
const DIS_FOLDER_PATH = path.join(__dirname, '..', '..', `public/upload/${getUploadDirName()}`)

//附件根目录
const DIS_FOLDER_ROOT_PATH = path.join(__dirname, '..', '..', 'public/upload')
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
    throw new ErrorModel(errorInfo.uploadFileSizeFailInfo)
  }
  // 移动文件到制定目录下
  const fileName = `upload.${Date.now()}_${name}` // 防止重名，名称前加随机时间戳
  const distFilePath = path.join(DIS_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)
  // 返回数据信息
  const url = ctx.request.header.host
  return new SuccessModel({
    url: `http://${url}/${getUploadDirName()}/${fileName}`
  })
}


/**
 * 删除附件
 * @param {*} path 必传参数可以是文件夹可以是文件
 * @param {*} reservePath 保存path目录 path值与reservePath值一样就保存
 */
const delFile = async (ctx, reservePath) => {
  debugger
  const url = ctx.request.header.host
  const topUrl = `http://${url}/`
  if (reservePath.indexOf(topUrl) < 0) {
    return
  }
  const path = reservePath.split(topUrl)[1]
  const filePath = path.replace(/\//g, '\\')
  const deletePath = `${DIS_FOLDER_ROOT_PATH}\\${filePath}`
  const deleteFolder = deletePath.split("\\upload.")[0]
  const readDir = fse.readdirSync(deleteFolder)
  if (readDir.length > 0) {
    var isExist = fse.existsSync( deletePath ) 
    if(!isExist){
      return
    }
    fse.unlinkSync(deletePath)
    const delDir = fse.readdirSync(deleteFolder)
    if (delDir.length == 0) {
      fse.rmdirSync(deleteFolder);
    }
  } else {
    fse.rmdirSync(deleteFolder);
  }
}

module.exports = {
  saveFile,
  delFile
}