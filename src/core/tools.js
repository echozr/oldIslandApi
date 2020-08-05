/**
 * @description 常用工具函数
 * @author zr
 */

/**
 * 获取上传路径文件夹
 */
const getUploadDirName = () => {
  const date = new Date()
  let month = Number.parseInt(date.getMonth()) + 1
  month = month.toString().length > 1 ? month : `0${month}`
  const dir = `${date.getFullYear()}${month}${date.getDate()}`
  return dir
}

/**
 * 获取文件的后缀
 * @param {string} name 文件名称
 */
const getUploadFileExt = (name) => {
  let ext = name.split('.');
  return ext[ext.length - 1];
}

module.exports = {
  getUploadDirName,
  getUploadFileExt
}
