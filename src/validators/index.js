const { isLength } = require('lodash')
const linValidator = require('../core/lin-validator')
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
/**
 *
 * 新增popular验证
 * @class addPoplar
 * @extends {LinValidator}
 */
class addPoplar extends LinValidator{
  constructor(){
    super()
    this.addType=[new Rule('isLength','类型不能为空')]
    this.creationTime=[new Rule('isLength','创建时间不能为空')]
    this.bgImage=[new Rule('isLength','背景图不能为空')]
    this.title=[new Rule('isLength','标题长度必须要大于2个字，小于30个字',{min:2,max:30})]
    this.content=[new Rule('isLength','内容长度必须要大于10个子,小于200个字',{min:5,max:200})]
  }
}
/**
 *
 * 获取popularList  分页参数
 * @class getPopularList
 * @extends {LinValidator}
 */
class getPopularList extends LinValidator{
  constructor(){
    super()
    this.start = [
      new Rule('isInt', '不符合规范', { min: 0, max: 60000 }),
      new Rule('isOptional', '', 0)
    ]
    this.count = [
      new Rule('isInt', '不符合规范', { min: 1, max: 100 }),
      new Rule('isOptional', '', 10)
    ]
  }
}
/**
 * 判断Id 是正整数
 * @class PositiveIntegerValidator
 * @extends {LinValidator}
 */
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '需要正整数', { min: 1 })]
  }
}
class AddShortIdValidator extends PositiveIntegerValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isLength', '必填参数', { min: 1, max: 12 }),
      new Rule('isInt', '必须为数值', { min: 1, max: 9999999})
    ]
  }
}

class PraiseTypeValidator extends LinValidator{
  constructor(props) {
    super(props)
    this.type = [new Rule('isLength', '必填参数', { min: 1 })]
  }
  
}

class PraiseValidator extends PraiseTypeValidator {
  constructor(){
    super()
    this.popularId = [
      new Rule('isLength', '必填参数', { min: 1, max: 12 }),
      new Rule('isInt', '需要正整数', { min: 1 })
    ]
    
  }
}

module.exports = {
  positiveIntegerValidator,
  RegisterValidator,
  LoginValidator,
  addPoplar,
  getPopularList,
  AddShortIdValidator,
  PraiseValidator,
  PraiseTypeValidator
}