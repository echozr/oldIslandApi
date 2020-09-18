/**
 * @description  流行页面数据库操作
 * @author zr
 */
const sequelize = require('sequelize')
const { popular, praise } = require('../models')
const { delFile } = require('../controllers/upload')
const {ErrorModel} = require('../core/http-exception')
const Op = sequelize.Op

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
  const whereOpt = {
    addType: addType,
    bgImage: bgImage,
    title: title,
    content: content,
    creationTime: creationTime
  }
  debugger
  if (resources) {
    Object.assign(whereOpt, { resources: resources })
  }

   // 判断该书籍是否存在数据库中
  const data = await popular.findAll({
    where:whereOpt
  })

  if (data.length > 0) {
    throw new ErrorModel({msg:"该期刊已存在，请勿重复添加"})
  }

  const result = await popular.create(
    whereOpt
  )
  if( result.dataValues)
  return '添加成功'

}
/**
 * 管理员获取流行列表
 * @param {*} type 查询条件类型
 * @param {*} time 查询时间
 * @param {*} start 页数
 * @param {*} count 每页行数
 * 
 */
const findPopList = async ({title, type, time, start, count }) => {
  debugger
  const whereOpt = {}
  if(title){
    Object.assign(whereOpt,{ title: {  [Op.like]: `%${title}%` }})
  }
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
    attributes: ['id', 'title', 'content','addType', 'creationTime'],
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
  const result1 = await popular.findOne({ where: { id } })
  if(!result1){
    return 
  }
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
  if(result){
    return '更新成功'
  }
  
}

/**
 * 小程序获取流行首页
 * @param {string} time 查询时间
 * @param {string} userId 查询时间
 */
const findAppLetsPopList = async (time, userId) => {
  debugger
  const whereOpt = {}
  if (time) {
    Object.assign(whereOpt, { creationTime: time })
  } else {
    const newTime = await popular.findOne({ order: [['creationTime', 'DESC']] })
    console.log(newTime)
    const startTime = newTime.dataValues.creationTime
    Object.assign(whereOpt, { creationTime: startTime })
  }
  const result = await popular.findAndCountAll({
    where: whereOpt,
    order: [['id', 'DESC']],
    attributes: ['id', 'title', 'content', 'addType', 'creationTime', 'bgImage', 'resources'],
    include: [
      {
        model: praise,
        attributes: ['userId', 'popularId']
      }
    ]
  })
  const list = result.rows.map(v => {
    const item = v.dataValues
    const praiseNum = item.praises.length
    const isCheck = item.praises.filter(x => x.dataValues.userId === userId)
    v.dataValues.praises = praiseNum
    v.dataValues.isCheck = isCheck.length > 0 ? true : false
    return v.dataValues
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