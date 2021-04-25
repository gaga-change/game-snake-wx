import DataBus from '../DataBus'
import Point from "../base/Point";
const dataBus = new DataBus()

export default class SnakePoint extends Point {
  constructor(x, y, color = 'blue') {
    super(x, y, dataBus.playerRadius, color)
    this.prePoint = null
    this.nextPoint = null
    this.historyAngle = 0
    this.mapSpeed = dataBus.mapSpeed
  }

  update(angle, mapSpeed) {
    let oldAngle = this.historyAngle
    let oldMapSeepd = this.mapSpeed
    this.historyAngle = angle
    this.mapSpeed = mapSpeed
    if (this.prePoint) {
      this.x = this.prePoint.x
      this.y = this.prePoint.y
      const y = Math.sin(2 * Math.PI / 360 * this.prePoint.historyAngle) * this.prePoint.mapSpeed
      const x = Math.cos(2 * Math.PI / 360 * this.prePoint.historyAngle) * this.prePoint.mapSpeed
      // 头部不更新坐标
      this.x -= x
      this.y += y
    }
    this.nextPoint && this.nextPoint.update(oldAngle, oldMapSeepd)
  }

  render(ctx) {
    if (!this.prePoint) { // 第一个点
      ctx.beginPath()
      ctx.strokeStyle = 'yellow'
      ctx.lineWidth = dataBus.playerRadius * 2
      ctx.lineCap = 'round'
      ctx.moveTo(this.x, this.y)
    } else if (!this.nextPoint) { // 最后一个点
      ctx.lineTo(this.x, this.y)
      ctx.strokeStyle = this.color
      ctx.stroke()
    } else {
      ctx.lineTo(this.x, this.y)
    }
    if (this.nextPoint) {
      this.nextPoint.render(ctx)
    }
  }

  // 新增节点
  addPoint() {
    if (this.nextPoint) {
      throw new Error('非最后一个节点，不能新增下个节点')
    }
    const point = new SnakePoint()
    this.nextPoint = point
    point.prePoint = this
    // 新增历史角度,历史角度为上个节点移动的最后一个角度,如果没有默认0 
    return point
  }
}