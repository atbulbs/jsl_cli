/**
 * @description 矩形组件
 */
import { getCurrentScene } from '../../shared/utils'

export default function Rect (x: number, y: number, width: number, height: number, color: number, alpha: number, radius?: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius, type = 'fill') {
  const graphics = getCurrentScene().add.graphics()
  if (type === 'fill') {
    graphics.fillStyle(color, alpha)
    if (radius) {
      return graphics.fillRoundedRect(x, y, width, height, radius)
    } else {
      return graphics.fillRect(x, y, width, height)
    }
  } else if (type === 'stroke') {
    graphics.lineStyle(1, color, alpha)
    if (radius) {
      return graphics.strokeRoundedRect(x, y, width, height, radius)
    } else {
      return graphics.strokeRect(x, y, width, height)
    }
  }
}
