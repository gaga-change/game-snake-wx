import DataBus from '../databus'

export default class Point {
  constructor(x, y, color) {
    this.dataBus = new DataBus()
    this.x = x
    this.y = y
    this.color = color || '#b0efeb'
    // todo 初始节点数量和移动速率有关
    this.gs = [0, 0, 0, 0, 0]
  }
  render(ctx, x, y) {
    ctx.beginPath()
    // console.log(this.x, this.y)
    ctx.arc(x || this.x, y || this.y, this.dataBus.playerRadius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}