/**
 * @description 图片资源配置
 */

const baseImages: Array<string> = [
  'btn_red'
]

let images: Array<string> = [

]

images = [... new Set([...baseImages, ...images])]

const imagesConfig = {}

function url(fileName) {
  return require('../../static/images/' + fileName)
}

images.forEach(item => {
  imagesConfig[item] = url(`${item}.png`)
})

export default imagesConfig
