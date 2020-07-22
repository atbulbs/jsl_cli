/**
 * @description 加密解密
 */

const CryptoJS = require('crypto-js')

// 加密
export function encrypt (str) {
  const wordArray = CryptoJS.enc.Utf8.parse(str)
  const base64 = CryptoJS.enc.Base64.stringify(wordArray)
  return base64
}

// 解密
export function decrypt (str) {
  const parsedWordArray = CryptoJS.enc.Base64.parse(str)
  const parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
  return parsedStr
}
