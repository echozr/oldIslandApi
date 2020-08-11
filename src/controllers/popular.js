/**
 * @description  流行页面的相关控制器
 * @author zr
 */

const { SuccessModel, ErrorModel } = require('../core/http-exception')
const errorInfo = require('../lib/errorInfo')
const { ArtType } = require('../lib/enum')
const { createdPopular } = require('../services/popular')

/**
 * 添加流行模块的元素
 * @param {number} addType
 * @param {string} bgImage
 * @param {string} title
 * @param {string} resources
 * @param {string} content
 * @param {string} creationTime
 */
const addPopular = async ({ addType, bgImage, title, resources, content, creationTime }) => {
  debugger
  // 判断新增类型
  switch (Number(addType)) {
    case ArtType.MOVIE:
    case ArtType.MUSIC:
    case ArtType.VIDEO:
    case ArtType.SENTENCE:
      // 添加电影，音乐，视频，诗句
      // 调用services
      const result = await createdPopular({ addType, bgImage, title, resources, content, creationTime })
      if (result) {
        return new SuccessModel(result)
      }
      return new ErrorModel(errorInfo.popularCreateFile)
      break
    case ArtType.BOOK:
      // 添加电影，音乐，视频，诗句
      // 调用services
      break
  }
}


module.exports = {
  addPopular
}