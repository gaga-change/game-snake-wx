import DataBus from '../DataBus'
import Point from "../base/Point";
const dataBus = new DataBus()

export default class SnakePoint extends Point {
  constructor(x, y, color = 'blue') {
    super(x, y, dataBus.playerRadius, color)
    // 初始角度
    // todo 初始节点数量和移动速率有关
    this.prePoint = null
    this.nextPoint = null
    dataBus.lastPoint = this
    this.gs = [0, 0, 0, 0, 0]
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
      // console.log(this.x, this.y, '???', this.prePoint.x, this.prePoint.y)
    }
    this.nextPoint && this.nextPoint.update(nextNewAngle)
  }

  render(ctx) {
    if (this.nextPoint) {
      this.nextPoint.render(ctx)
    }
    super.render(ctx)
    // console.log(this.x, this.y, this.r)
  }

  // 新增节点
  addPoint(color) {
    console.log(this.color, dataBus.lastPoint.color, this.nextPoint)
    if (this.nextPoint) {
      throw new Error('非最后一个节点，不能新增下个节点')
    }
    const point = new SnakePoint(0, 0, color)
    this.nextPoint = point
    let temp = 0
    if (this.prePoint) {
      temp = this.prePoint.gs[this.prePoint.gs.length - 1]
    }
    point.prePoint = this
    // 新增历史角度,历史角度为上个节点移动的最后一个角度,如果没有默认0 
    this.gs = [temp, temp, temp, temp, temp]
    console.log(this.color, dataBus.lastPoint.color, this.nextPoint)
    return point
  }
}