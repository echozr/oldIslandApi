/**
 * @description  流行页面数据库操作
 * @author zr
 */
const sequelize = require('sequelize')
const { popular } = require('../models')
const { delFile } = require('../controllers/upload')

/**
 * 创建popular除书籍外的所有数据
 * @param {*} addType
 * @param {*} bgImage
 * @param {*} title
 * @param {*} resources
 * @param {*} content
 * @param {*} creationTime
 */
const createdPopular = async ({ addType, bgImage, title, resources, content, creationTime }) => {
  debugger
  const whereOpt = {
    addType: addType,
    bgImage: bgImage,
    title: title,
    content: content,
    creationTime: creationTime
  }
  if (resources) {
    Object.assign(whereOpt, { resources: resources })
  }
  const result = await popular.create(
    whereOpt
  )
  return result.dataValues

}
/**
 * 管理员获取流行列表
 * @param {*} type 查询条件类型
 * @param {*} time 查询时间
 * @param {*} start 页数
 * @param {*} count 每页行数
 * 
 */
const findPopList = async ({ type, time, start, count }) => {
  const whereOpt = {}
  if (type) {
    Object.assign(whereOpt, { addType: type })
  }
  if (time) {
    Object.assign(whereOpt, { creationTime: time })
  }
  const result = await popular.findAndCountAll({
    limit: count,
    offset: start * count,
    where: whereOpt,
    order: [
      ['id', 'desc']
    ],
    attributes: ['id', 'title', 'addType', 'creationTime'],
  })
  console.log(result)
  const list = result.rows.map(v => v.dataValues)
  return {
    total: result.count,
    list,
    start,
    count
  }
}


/**
 * 根据Id 删除相关内容及附件
 * @param {number} id 数据id
 * @param {object} ctx 对象
 */
const destroyPopular = async (id, ctx) => {
  const result1 = await popular.findOne({ where: { id } });
  await delFile(ctx, result1.dataValues.bgImage)
  await delFile(ctx, result1.dataValues.resources)
  const result = await popular.destroy({
    where: {
      id
    }
  });
  console.log(result)
  return result
}

/**
 * 根据Id获取流行的详情页
 * @param {number} id 数据id
 */
const getPopInfo = async (id) => {
  const whereOpt = {
    id
  }
  const result = await popular.findOne({
    where: whereOpt
  })
  console.log(result)
  return result
}


const updatePopInfo = async ({ popId, addType, bgImage, title, resources, content, creationTime }) => {
  // 拼接查询条件
  const whereOpt = {
    id: popId
  }
  // 拼接更新字段
  const updateData = {
    addType,
    bgImage,
    title,
    resources,
    content,
    creationTime
  }
  // 执行数据库操作
  const result = await popular.update(updateData, {
    where: whereOpt
  })
  console.log(result)
  return result
}

/**
 * 小程序获取流行首页
 * @param {string} time 查询时间
 */
const findAppLetsPopList = async (time) => {
  debugger
  const whereOpt = {}
  if (time) {
    Object.assign(whereOpt, { creationTime: time })
  } else {
    const newTime = await popular.findOne({ order: [['creationTime', 'DESC']] })
    const startTime = newTime.dataValues.creationTime
    Object.assign(whereOpt, { creationTime: startTime })
  }
  const result = await popular.findAll({
    where: whereOpt,
    order: [['id', 'DESC']]
  })
  return result

}
module.exports = {
  createdPopular,
  findPopList,
  destroyPopular,
  getPopInfo,
  updatePopInfo,
  findAppLetsPopList
}