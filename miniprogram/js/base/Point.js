
export default class Point {
  constructor(x, y, r, color) {
    this.x = x
    this.y = y
    this.r = r
    this.color = color || '#000'
  }
  render(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}