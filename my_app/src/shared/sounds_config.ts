/**
 * @description 声音资源配置
 */


const audios: Array<string> = [
  'click',
]

const audiosConfig = {}

function url (fileName) {
  return require('../../static/sounds/' + fileName)
}

audios.forEach(item => {
  audiosConfig[item] = url(`${ item }.mp3`)
})

export default audiosConfig
