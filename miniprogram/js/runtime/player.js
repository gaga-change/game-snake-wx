export default class Player {
  constructor() {

  }

  render(ctx) {
    // 绘制一个中心点
    const width = window.innerWidth
    const height = window.innerHeight
    console.log(width / 2, height / 2, 5, 0, 2 * Math.PI)
    ctx.arc(width / 2, height / 2, 5, 0, 2 * Math.PI)
    ctx.fillStyle = '#b0efeb'
    ctx.fill()

    ctx.beginPath()
    const r = Math.sqrt(Math.pow(5, 2) * 2) / 2
    const margin = 20
    ctx.moveTo(width / 2 - r, height / 2 - margin)
    ctx.lineTo(width / 2, height / 2 - margin - r)
    ctx.lineTo(width / 2 + r, height / 2 - margin)
    ctx.strokeStyle = '#eca3f5'
    ctx.stroke()
  }
}