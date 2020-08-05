/**
 * @description 页面需要的枚举
 * @author zr
 */

const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  ADMIN_EMAIL: 102,
  isThisType
}

const ArtType = {
  MOVIE: 100,
  MUSIC: 200,
  SENTENCE: 300,
  BOOK: 400,
  isThisType
}

function isThisType(val) {
  const arrType= Object.values(this)
  return arrType.includes(val)
}

module.exports={
  LoginType,
  ArtType
}