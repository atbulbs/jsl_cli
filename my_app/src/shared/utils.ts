/**
 * @description 工具类
 */

export function getQueryStringArgs () {
  const qs = (location.search.length > 0 ? location.search.substring(1) : '')
  const args = {}
  const items = qs.length ? qs.split('&') : []
  const len = items.length
  for (let i = 0; i < len; ++i) {
    const item = items[i].split('=')
    const name = decodeURIComponent(item[0])
    const value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value
    }
  }
  return args
}

/**
 * @description 检查数字范围
 */
export function checkNumRange (varName, num, min = 0, max = 1) {
  if (typeof num === 'number' && (num < min || num > max)) {
    throw new RangeError(`${ varName } out of range [${ min }, ${ max }]`)
  }
}

/**
 * @description 获取当前场景
 */
export function getCurrentScene (): Phaser.Scene {
  return window.__phaser_game__.scene.getScene(window.__current_scene_name__)
}

/**
 * @description 获取当前时间
 */
export function getNow (): number {
  return (performance && performance.now instanceof Function && performance.now()) || new Date().getTime()
}

/**
 * @description 裁切字符串
 */
export function trim (str: string) {
  if (str.length <= 8) {
    return str
  } else {
    return str.substring(0, 7) + '...'
  }
}
