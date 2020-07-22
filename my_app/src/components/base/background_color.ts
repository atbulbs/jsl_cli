/**
 * @description 背景颜色
 */
import { getCurrentScene } from '../../shared/utils'

export default function BackgroundColor (color: number) {
  const scene = getCurrentScene()
  const { top, left, width, height } = scene['background']
  const graphics = scene.add.graphics()
  graphics.fillStyle(color, 1)
  graphics.fillRect(left, top - 100, width, height + 200)
  return graphics
}