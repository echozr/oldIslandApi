/**
 * @description  流行页面数据库操作
 * @author zr
 */

const { popular } = require('../models')

/**
 * 创建popular除书籍外的所有数据
 * @param {*} addType
 * @param {*} bgImage
 * @param {*} title
 * @param {*} resources
 * @param {*} content
 * @param {*} creationTime
 */
const createdPopular= async({ addType, bgImage, title, resources, content, creationTime })=> {
  debugger
  const whereOpt={
    addType:addType,
    bgImage:bgImage,
    title:title,
    content:content,
    creationTime:creationTime
  }
  if(resources){
    Object.assign(whereOpt,{resources:resources})
  }

  const result= await popular.create(
    whereOpt
  )
  return result.dataValues

}

module.exports={
  createdPopular
}