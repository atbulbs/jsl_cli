/**
 * @description 文字组件
 */
import { checkNumRange, getCurrentScene } from '../../shared/utils'

export default function Text (content: string | number, textStyle: object, x = 0, y = 0, orignX?, orignY?) {
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
  content = String(content)
  const text: Phaser.GameObjects.Text = getCurrentScene().add.text(x, y, content, textStyle)
  text.setOrigin(orignX, orignY)
  return text
}