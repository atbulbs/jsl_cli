
export function Debuger (x: number = 0, y: number = 0, width: number = 1, height: number = 1) {
  const graphics = this.add.graphics({
    fillStyle: {
      color: 0xff0000,
    }
  })
  graphics.fillRect(x, y, width, height)
}