/**
 * @description 设置环境变量，是发开环境还是生产环境
 * @author zr
 */

const ENV = process.env.NODE_ENV
module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test'
}

