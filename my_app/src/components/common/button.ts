/**
 * @description 基础组件, button组件
 */


import { getCurrentScene } from '../../shared/utils'
import { ClickZone, Image, Text, TextStyle } from '../base'
import { ClickZoneKlass } from '../base/click_zone'

class ButtonKlass extends Phaser.GameObjects.Container {

  private text: Phaser.GameObjects.Text
  private clickZone: ClickZoneKlass

  constructor(x: number = 0, y: number = 0, width = 170, height = 45, texture: string = 'btn', content: string = '') {
    super(getCurrentScene(), x, y)
    this.scene.add.existing(this)
    this.add([
      Image(texture, 0, 0, width, height, 0),
      this.text = Text(content, TextStyle({
        color: 'white',
        fontSize: 17,
        fontFamily: 'PingFangSC-Semibold,PingFang SC',
      }), width / 2, height / 2, .5),
      this.clickZone = ClickZone(0, 0, width, height),
    ])
  }

  onClick(cb = () => { }) {
    this.clickZone.onClick(cb)
  }

  onceClick(cb = () => { }) {
    this.clickZone.onceClick(cb)
  }

  public setText(text: string): void {
    this.text.setText(text)
  }

}

export default function Button (x: number = 0, y: number = 0, width = 170, height = 45, texture: string = 'btn', content: string = '') {
  return new ButtonKlass(x, y, width, height, texture, content)
}