import DataBus from '../DataBus'
const dataBus = new DataBus()

export default class Arrow {

  constructor() {

  }
  
  update(angle) {
    const width = window.innerWidth
    const height = window.innerHeight
    // 绘制方向箭头
    const r = Math.sqrt(Math.pow(dataBus.arrowLength, 2) * 2) / 2
    const sinAngle = Math.sin(2 * Math.PI / 360 * angle)
    const cosAngle = Math.cos(2 * Math.PI / 360 * angle)
    const centerPoint = {
      x: width / 2 + dataBus.arrowMargin * cosAngle,
      y: height / 2 - dataBus.arrowMargin * sinAngle
    }
    this.points = [
      [centerPoint.x - sinAngle * r, centerPoint.y - cosAngle * r],
      [centerPoint.x + cosAngle * r, centerPoint.y - sinAngle * r],
      [centerPoint.x + sinAngle * r, centerPoint.y + cosAngle * r]
    ]
  }

  render(ctx) {
    ctx.beginPath()
    ctx.moveTo(...this.points[0])
    ctx.lineTo(...this.points[1])
    ctx.lineTo(...this.points[2])
    ctx.strokeStyle = dataBus.arrowColor
    ctx.stroke()
  }
}