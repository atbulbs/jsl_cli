/**
 * @description 精灵图资源配置
 */

const deployConfig = require('../../deploy.config')
const publicPath = deployConfig.cdn.publicPath
const pathPrefix = publicPath + 'static/sprites/'

function url (fileName) {
  return pathPrefix + fileName
}

const spritesConfig = {

}

export default spritesConfig