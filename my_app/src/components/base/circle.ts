/**
 * @description
 */
import { getCurrentScene } from '../../shared/utils'

export default function circle (radius, color, alpha) {
  const graphics = getCurrentScene().add.graphics()
  graphics.fillStyle(color, alpha)
  graphics.fillCircle(0, 0, radius)
  return graphics
}
