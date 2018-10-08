/**
 * 扩展函数
 */

/**
 * 检测手机号是否正确
 */
export function isValidMobile (mobile) {
  return /^1[34578]\d{9}$/.test(mobile)
}

/**
 * 检测短信验证码是否正确
 */
export function isValidverifycode (code) {
  return /^[0-9]{4}$/.test(code)
}
/**
 * 检测统一社会信用代码是否正确
 */
export function isValidxincode (code) {
  return /^[a-zA-Z0-9]{18}$/.test(code)
}
/**
 * 检测营业执照代码是否正确
 */
export function isValidBusiCode (code) {
  return /^[a-zA-Z0-9]{15}$/.test(code)
}
/**
 * 检测身份证号码是否正确
 */
export function isValidIdCardNo (code) {
  return /^\d{6}\-\d{4}\-\d{4}\-(\d{1}|(\d{3}[0-9xX]))$/.test(code)
}
/**
 * 检测邮箱是否正确
 */
export function isValidEmail (email) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email)
}

export function isValidInt (number) {
  return /^[1-9][0-9]*$/.test(number)
}

/**
 *  格式化时间
 */
export function crtTime (val) {
  let date = new Date(val * 1000)
  let year = date.getFullYear()
  let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  let day = date.getDate()
  return year + '-' + month + '-' + day
}
