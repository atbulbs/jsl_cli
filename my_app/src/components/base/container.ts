import { getCurrentScene } from '../../shared/utils'

declare type ContainerConfiguration = {
  x?: number
  y?: number
  children: Array<any> | any
}

export default function Container (config: ContainerConfiguration | Array<any>, _x?, _y?) {
  let children
  let x
  let y
  if (Array.isArray(config)) {
    children = config
  } else {
    children = config.children
    x = config.x
    y = config.y
  }
  if (typeof _x === 'number') {
    x = _x
  }
  if (typeof _y === 'number') {
    y = _y
  }
  const scene: Phaser.Scene = getCurrentScene()
  const container: Phaser.GameObjects.Container = scene.add.container(x, y, children)
  return container
}
