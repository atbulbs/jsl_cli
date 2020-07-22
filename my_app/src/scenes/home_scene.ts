/**
 * @description 首页场景
 */
import BaseScene from './base_scene'

import { Text, TextStyle, BackgroundColor } from '../components/base'
import { designWidth, designHeight } from '../shared/constants'

export default class LoadScene extends BaseScene {

  constructor () {
    super('HomeScene', true)
    window.__current_scene_name__ = 'LoadScene'
  }

  build () {
    BackgroundColor(0x85A3FF)
    Text('HomeScene', TextStyle({
      color: 'pink',
      fontSize: 36,
    }), designWidth / 2, designHeight / 2, .5)
  }

}