import DataBus from '../DataBus'

export default class BackGround {
  constructor() {
    this.dataBus = new DataBus
  }

  render(ctx, angle) {
    const y = Math.sin(2 * Math.PI / 360 * angle) * this.dataBus.mapSpeed
    const x = Math.cos(2 * Math.PI / 360 * angle) * this.dataBus.mapSpeed
    this.dataBus.mapX -= x
    this.dataBus.mapY += y
    // 检测圆点是否碰到边框
    if (this.dataBus.mapY >= window.innerHeight / 2 - this.dataBus.playerRadius || 
      this.dataBus.mapY + this.dataBus.mapHeight <= window.innerHeight / 2 + this.dataBus.playerRadius) {
      this.dataBus.mapY -= y
    }
    if (this.dataBus.mapX >= window.innerWidth / 2 - this.dataBus.playerRadius ||
      this.dataBus.mapX + this.dataBus.mapWidth <= window.innerWidth / 2 + this.dataBus.playerRadius) {
        this.dataBus.mapX += x
    }
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.beginPath()
    ctx.moveTo(this.dataBus.mapX, this.dataBus.mapY)
    ctx.lineTo(this.dataBus.mapX + this.dataBus.mapWidth, this.dataBus.mapY)
    ctx.lineTo(this.dataBus.mapX + this.dataBus.mapWidth, this.dataBus.mapY + this.dataBus.mapHeight)
    ctx.lineTo(this.dataBus.mapX, this.dataBus.mapY + this.dataBus.mapHeight)
    ctx.closePath()
    ctx.strokeStyle = 'red'
    ctx.stroke()
  }
}