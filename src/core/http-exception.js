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
    if (msg) {
      this.msg = msg
    }
  }
}

/**
 * 成功数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      code: 200,
      data,
    })
  }
}

/**
 * 失败的数据模型
 */

class ErrorModel extends Error {
  constructor({msg = '服务器异常', errorCode = 10000}) {
    super()
    this.msg = msg
    this.errorCode = errorCode
  }
}

/**
 * 参数错误
 */
class ParameterException extends Error {
  constructor(msg = '参数错误', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
  ParameterException
}