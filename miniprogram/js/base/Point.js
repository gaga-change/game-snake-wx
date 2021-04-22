
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

  // 碰撞检测，两点距离小于两个圆点半径之和表示碰撞
  isCollide(point) {
    const x = Math.abs(point.x - this.x)
    const y = Math.abs(point.y - this.y)
    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    return distance < point.r + this.r
  }
}