/**
 * @description debug辅助
 */

function showPerformance () {
  var script = document.createElement('script')
  script.onload = function () {
    var stats = new window['Stats']()
    stats.dom.style.setProperty('position', 'absolute')
    stats.dom.style.setProperty('top', '0')
    stats.dom.style.setProperty('left', 'auto')
    stats.dom.style.setProperty('right', '0')
    stats.dom.style.setProperty('z-index', '999')
    document.body.appendChild(stats.dom)
    requestAnimationFrame(function loop() {
      stats.update()
      requestAnimationFrame(loop)
    })
  }
  script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'
  document.head.appendChild(script)
}

function initVConsole () {
  const VConsole = require('vconsole')
  window['vConsole'] = new VConsole({
    defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
    maxLogNumber: 1000
  })
}
initVConsole()
let __vconsole
let timer = window.setInterval(() => {
  __vconsole = document.getElementById('__vconsole')
  if (__vconsole) {
    __vconsole.style.display = 'none'
    window.clearInterval(timer)
  }
})


function logVersion () {
  const versionInfo = '当前版本 2020-06-29 15:00'
  window['v'] = versionInfo
  console.warn('************************')
  console.warn(versionInfo)
  console.warn('************************')
}

export default function debugHelper () {
  const div = window.document.createElement('div')
  window.document.body.appendChild(div)
  div.setAttribute('class', 'debug')
  div.style.opacity = '0'
  let clickedCount = 0
  let timer
  let hasDebugInited = false
  div.addEventListener('click', () => {
    if (++clickedCount >= 10 && !hasDebugInited) {
      hasDebugInited = true
      if (__vconsole && __vconsole.style) {
        __vconsole.style.display = 'block'
      }
    }
    if (!timer) {
      timer = setTimeout(() => {
        clickedCount = 0
        window.clearTimeout(timer)
        timer = null
      }, 5000)
    }
  })
}
