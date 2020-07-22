/**
 * @description 首页场景
 */
import BaseScene from './base_scene'

import { Text, TextStyle, BackgroundColor } from '../components/base'
import { Button } from '../components/common'
import { designWidth, designHeight } from '../shared/constants'

export default class LoadScene extends BaseScene {

  constructor () {
    super('LoadScene', true)
    window.__current_scene_name__ = 'LoadScene'
  }

  preload () {
    this.load.image('btn', require('../../static/images/btn.png'))
  }

  build () {
    BackgroundColor(0x85A3FF)
    Text('Hello Phaser!', TextStyle({
      color: 'pink',
      fontSize: 36,
    }), designWidth / 2, designHeight / 2, .5)
    Button((designWidth - 170) / 2, designHeight / 2 + 50, 170, 45, 'btn', 'go').onceClick(() => {
      this.navigator.push('HomeScene')
    })
  }

}