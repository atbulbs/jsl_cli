/**
 * @description 图片组件
 */
import { checkNumRange, getCurrentScene } from '../../shared/utils'

export default function Image (texture: string, x, y, width, height, orignX?, orignY?) {
  const scene: Phaser.Scene = getCurrentScene()
  if(orignY === undefined) {
    if (orignX === undefined) {
      orignX = 0
      orignY = 0
    } else {
      checkNumRange('orignX', orignX)
      orignY = orignX
    }
  } else {
    checkNumRange('orignY', orignY)
  }
  const img: Phaser.GameObjects.Image = scene.add.image(x, y, texture)
  img.setDisplaySize(width, height)
  img.setOrigin(orignX, orignY)
  return img
}