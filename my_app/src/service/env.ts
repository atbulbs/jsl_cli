function create3DContext (canvas, optAttribs?) {
  var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl']
  var context = null
  for (var i = 0; i < names.length; ++i) {
    try {
      context = canvas.getContext(names[i], optAttribs)
    } catch (e) {
    }
    if (context) {
      break
    }
  }
  return context
}

function getIsWebglSupported () {
  var canvas = document.createElement('canvas')
  var context = create3DContext(canvas)
  return context
}
/**
 * @description 是否支持webgl
 */
export const isWebglSupported: boolean = getIsWebglSupported() as boolean

function isInWxClient () {
  const match = navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
  return match instanceof Array && match[0] === 'micromessenger'
}
/**
 * @description 是否在微信客户端
 */
export const isInWx = isInWxClient()
