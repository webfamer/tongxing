/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validatePhone(rule, value,callback) {//匹配电话号码
  const reg =/^[1][3-9][0-9]{9}$/;
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码'));
    } else {
      callback();
    }
}


export function validateChinese(rule, value,callback) {//匹配中文
  const reg =/^[\u4E00-\u9FA5]+$/;
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入中文'));
    } else {
      callback();
    }
}
export function validateEnglish(rule, value,callback) {//匹配英文
  const reg =/^[a-zA-Z]+$/;
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入英文'));
    } else {
      callback();
    }
}


export function validateApi(rule, value,callback) {//匹配英文
  const reg =/^\/[a-zA-z]+$/;
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确api'));
    } else {
      callback();
    }
}