const MAP_WIDTH = window.innerWidth - 40 // 地图宽度
const MAP_HEIGHT = window.innerHeight - 40 // 地图高度
import DataBus from '../databus'

export default class BackGround {
  constructor() {
    this.dataBus = new DataBus
  }

  render(ctx, angle, step = 5) {
    const y = Math.sin(2 * Math.PI / 360 * angle) * step
    const x = Math.cos(2 * Math.PI / 360 * angle) * step
    this.dataBus.mapX -= x
    this.dataBus.mapY += y
    // 检测圆点是否碰到边框
    if (this.dataBus.mapY >= window.innerHeight / 2 - this.dataBus.playerRadius || 
      this.dataBus.mapY + MAP_HEIGHT <= window.innerHeight / 2 + this.dataBus.playerRadius) {
      this.dataBus.mapY -= y
    }
    if (this.dataBus.mapX >= window.innerWidth / 2 - this.dataBus.playerRadius ||
      this.dataBus.mapX + MAP_WIDTH <= window.innerWidth / 2 + this.dataBus.playerRadius) {
        this.dataBus.mapX += x
    }
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.beginPath()
    ctx.moveTo(this.dataBus.mapX, this.dataBus.mapY)
    ctx.lineTo(this.dataBus.mapX + MAP_WIDTH, this.dataBus.mapY)
    ctx.lineTo(this.dataBus.mapX + MAP_WIDTH, this.dataBus.mapY + MAP_HEIGHT)
    ctx.lineTo(this.dataBus.mapX, this.dataBus.mapY + MAP_HEIGHT)
    ctx.closePath()
    ctx.strokeStyle = 'red'
    ctx.stroke()
  }
}