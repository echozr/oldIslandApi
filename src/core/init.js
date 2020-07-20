/**
 * @description 自动添加路由模块
 * @author zr
 */
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManger {
  static initCore(app) {
    InitManger.app = app // 静态属性
    InitManger.initLoadRouter() //路由加载 
  }
  /**
   * 初始化路由
   */
  static initLoadRouter() {
    // 在node.js中process.cwd()方法可以获取项目的根路径
    const apiDirectory = `${process.cwd()}/src/routes/api`
    // 参数：第一个参数固定参数module，第二个参数要加载的模块的文件路径，第三个参数：每次加载一个参数执行的函数 
    requireDirectory(module, apiDirectory, { visit: loadModule })
    function loadModule(obj) {
      // 判断点前模块是否是Router的实例对象
      if (obj instanceof Router) {
        // 注册路由
        InitManger.app.use(obj.routes(), obj.allowedMethods())
      }
    }
  }
}

module.exports=InitManger