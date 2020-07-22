/**
 * @description 点击区域
 */
import { getCurrentScene } from '../../shared/utils'

export class ClickZoneKlass extends Phaser.GameObjects.Container {

  public canClick = true
  clickZone

  constructor (x, y, width, height) {
    super(getCurrentScene(), x, y)
    this.width = width
    this.height = height
    this.scene.add.existing(this)
    const clickZone = this.scene.add.zone(0, 0, width, height)
    this.clickZone = clickZone
    this.add(clickZone)
    clickZone.setOrigin(0)
    clickZone.setInteractive()
  }

  onClick (cb = (e, ...args) => {}) {
    this.clickZone.off('pointerdown')
    this.clickZone.off('pointerup')
    this.clickZone.on('pointerdown', () => {
      if (this.canClick) {
        this.clickZone.once('pointerup', (e, ...args) => {
          cb(e, ...args)
        })
      }
    })
  }

  onceClick (cb = () => {}) {
    this.clickZone.off('pointerdown')
    this.clickZone.off('pointerup')
    this.clickZone.once('pointerdown', () => {
      this.clickZone.once('pointerup', () => {
        cb()
      })
    })
  }

  debug () {
    const graphics = this.scene.add.graphics()
    graphics.fillStyle(0xff0000)
    graphics.fillRect(0, 0, this.width, this.height)
    this.add(graphics)
  }

}

export default function ClickZone (x: number = 0, y: number = 0, width: number = 0, heihgt: number = 0): ClickZoneKlass {
  return new ClickZoneKlass(x, y, width, heihgt)
}
