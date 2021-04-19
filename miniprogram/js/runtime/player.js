
const DIR_MARGIN = 20 // 箭头离中心点距离，值越大箭头离中心点越远
const DIR_LENGTH = 5 // 方向箭头长度（单边），值越大箭头越大
export default class Player {
  constructor() {

  }

  render(ctx, angle = 60) {
    // 绘制一个中心点
    const width = window.innerWidth
    const height = window.innerHeight
    // console.log(width / 2, height / 2, 5, 0, 2 * Math.PI)
    ctx.arc(width / 2, height / 2, 5, 0, 2 * Math.PI)
    ctx.fillStyle = '#b0efeb'
    ctx.fill()

    // 绘制方向箭头
    const r = Math.sqrt(Math.pow(DIR_LENGTH, 2) * 2) / 2
    const sinAngle = Math.sin(2 * Math.PI / 360 * angle)
    const cosAngle = Math.cos(2 * Math.PI / 360 * angle)
    const centerPoint = {
      x: width / 2 + DIR_MARGIN * cosAngle,
      y: height / 2 - DIR_MARGIN * sinAngle
    }
    ctx.beginPath()
    ctx.moveTo(centerPoint.x - sinAngle * r, centerPoint.y - cosAngle * r )
    ctx.lineTo(centerPoint.x + cosAngle * r, centerPoint.y - sinAngle * r )
    ctx.lineTo(centerPoint.x + sinAngle * r, centerPoint.y + cosAngle * r )
    ctx.strokeStyle = '#eca3f5'
    ctx.stroke()
  }
}