/**
 * @description  流行页面的相关控制器
 * @author zr
 */

const { SuccessModel, ErrorModel } = require('../core/http-exception')
const errorInfo = require('../lib/errorInfo')
const { ArtType } = require('../lib/enum')
const { createdPopular, findPopList, destroyPopular, getPopInfo, findAppLetsPopList,updatePopInfo } = require('../services/popular')

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

/**
 * 管理员获取流行列表
 * @param {*} type 查询条件类型
 * @param {*} time 查询时间
 * @param {*} start 页数
 * @param {*} count 每页行数
 * 
 */
const getAdminPopList = async ({ type, time, start, count }) => {
  debugger
  if (start === "" || start === undefined) {
    start = 0
  }
  if (count === "" || count === undefined) {
    count = 10
  }
  const result = await findPopList({ type, time, start, count })
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel

}

/**
 * 根据Id 删除相关内容及附件
 * @param {number} id 内容id
 * @param {object} ctx 对象
 */
const deletePopular = async (id, ctx) => {
  debugger
  const result = await destroyPopular(id, ctx)
  if (result) {
    return new SuccessModel({ msg: '删除成功' })
  }
  return new ErrorModel(errorInfo.deletePopularFailInfo)
}


/**
 * 根据id获取用户详情信息
 * @param {number} id popularID
 */
const getPopularInfo = async (id) => {
  const result = await getPopInfo(id)
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getPopularListFail)
}

/**
 * 更新流行模块的元素
 * @param {number} popId popularId
 * @param {number} addType 新增类型
 * @param {string} bgImage 背景图
 * @param {string} title 标题
 * @param {string} resources 资源
 * @param {string} content 内容
 * @param {string} creationTime 创建时间
 */
const updatePopular = async ({ popId, addType, bgImage, title, resources, content, creationTime }) => {
  debugger
  const result = await updatePopInfo({ popId, addType, bgImage, title, resources, content, creationTime })
  if (result) {
    return new SuccessModel({msg:'更新成功'})
  }
  return new ErrorModel(errorInfo.popularCreateFile)
}

/**
 * 小程序获取流行首页的当月数据
 * @param {string} time 查询时间
 */
const getAppletsPopular = async (time,ctx) => {
  const userId = ctx.state.user.uid
  const result = await findAppLetsPopList(time,userId)
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getPopularListFail)
}

module.exports = {
  addPopular,
  getAdminPopList,
  deletePopular,
  getAppletsPopular,
  getPopularInfo,
  updatePopular
}