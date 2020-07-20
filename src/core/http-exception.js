/**
 * @description res  返回正常或者异常结果
 * @author zr
 */

/**
 * 基础类
 */
class BaseModel {
  constructor({ code, data, msg }) {
    this.code = code
    if (data) {
      this.data = data
    }
    if (message) {
      this.msg = msg
    }
  }
}

/**
 * 成功数据模型
 */
class SuccessModel extends BaseModel {
  constructor({ msg, data = {} }) {
    super({
      code: 200,
      msg,
      data,
    })
  }
}

/**
 * 失败的数据模型
 */

class ErrorModel extends Error {
  constructor( code = 400, msg = '服务器异常', errorCode = 10000 ) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

/**
 * 参数错误
 */
class ParameterException extends ErrorModel {
  constructor(msg = '参数错误', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
  ParameterException
}