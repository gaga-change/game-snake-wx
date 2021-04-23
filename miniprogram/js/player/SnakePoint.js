import DataBus from '../DataBus'
import Point from "../base/Point";
const dataBus = new DataBus()

export default class SnakePoint extends Point {
  constructor(x, y, color = 'blue') {
    super(x, y, dataBus.playerRadius, color)
    this.prePoint = null
    this.nextPoint = null
    this.gs = []
  }

  update(angle) {
    this.gs.unshift(angle)
    let nextNewAngle = this.gs.pop()
    if (this.prePoint) {
      // 头部不更新做表单
      this.x = this.prePoint.x
      this.y = this.prePoint.y
      this.prePoint.gs.forEach(angle => {
        const y = Math.sin(2 * Math.PI / 360 * angle) * dataBus.mapSpeed
        const x = Math.cos(2 * Math.PI / 360 * angle) * dataBus.mapSpeed
        this.x -= x
        this.y += y
      })
    }
    this.nextPoint && this.nextPoint.update(nextNewAngle)
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
    let temp = 0
    if (this.prePoint) {
      temp = this.prePoint.gs[this.prePoint.gs.length - 1]
    }
    point.prePoint = this
    // 新增历史角度,历史角度为上个节点移动的最后一个角度,如果没有默认0 
    this.gs = []
    for (let i = 0; i < dataBus.playerRadius * 2 / dataBus.mapSpeed; i++) {
      this.gs.push(temp)
    }
    return point
  }
}