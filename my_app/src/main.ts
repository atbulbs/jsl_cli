/**
 * @description 程序主入口
 */
import { isWebglSupported } from './service/env'
import initPhaserGame from './game'
import debugHelper from './service/debug_helper'

if (isWebglSupported) {
  initPhaserGame()
} else {
  alert('您的设备不支持该应用, 请升级设备后尝试!')
}
debugHelper()
