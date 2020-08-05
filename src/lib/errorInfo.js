/**
 * @description 错误描述详情页
 * @author
 */
module.exports = errorInfo = {
  registerFail:{
    msg:'注册用户失败',
    errorCode:10000
  },
  emailAlreadyExists: {
    msg: '该邮箱已存在',
    errorCode: 10001
  },
  getUserFail:{
    msg:'获取用户信息失败',
    errorCode:10002
  },
  userNotExist:{
    msg:'用户不存在',
    errorCode:10003
  },
  passWordFail:{
    msg:'密码输入有误',
    errorCode:10004
  },
  uploadFileSizeFailInfo:{
    msg:'上传文件过大',
    errorCode:20000
  }
}
