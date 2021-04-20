import DataBus from '../DataBus'
const dataBus = new DataBus()

export default class Arrow {
  constructor() {

  }

  render(ctx, angle) {
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
    ctx.beginPath()
    ctx.moveTo(centerPoint.x - sinAngle * r, centerPoint.y - cosAngle * r)
    ctx.lineTo(centerPoint.x + cosAngle * r, centerPoint.y - sinAngle * r)
    ctx.lineTo(centerPoint.x + sinAngle * r, centerPoint.y + cosAngle * r)
    ctx.strokeStyle = dataBus.arrowColor
    ctx.stroke()
  }
}