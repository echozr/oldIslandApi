/**
 * @description 自定义校验器
 * @author zr
 */

const { LinValidator, Rule } = require('../core/lin-validator')
const { LoginType } = require('../lib/enum')


/**
 * 校验ID必须为正整数
 */
class positiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '该参数必须为正整数', { min: 1 })]
  }
}
/**
 * 校验注册参数
 */
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [new Rule('isEmail', '邮箱格式不正确')]
    this.password1 = [new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32 }),
    new Rule('matches', '密码由大写小写及数字组合', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')]
    this.password2 = this.password1
    this.nickname = [new Rule('isLength', '昵称长度大于4个字符小于14个字符', { min: 4, max: 14 })]
  }
  // 自定义校验两次密码需要一致
  validatePassword(values) {
    const password1 = values.body.password1
    const password2 = values.body.password2
    if (password1 !== password2) {
      throw new Error('两次输入的密码必须相同')
    }
  }
}

/**
 * 校验登录参数
 */
class LoginValidator extends LinValidator {
  constructor() {
    super()
    this.account = [new Rule('isLength', '不符合账号规范', { min: 4, max: 32 })] // 这里账号 普通用户代表email  小程序用户代表 登录返回的code
    this.password = [new Rule('isOptional'), new Rule('isLength', '至少6个字符', { min: 6, max: 128 })] // 密码非必填，如果填了需要满足第二条验证
  }
  // 自定义验证登录类型
  validateType(values) {
    const Type = values.body.type
    if (!Type) {
      throw new Error('type是必填参数')
    }
    if (!LoginType.isThisType(Number(Type))) {
      throw new Error('参数类型不正确')
    }
  }
}

module.exports = {
  positiveIntegerValidator,
  RegisterValidator,
  LoginValidator
}