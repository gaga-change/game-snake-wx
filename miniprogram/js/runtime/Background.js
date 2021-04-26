import DataBus from '../DataBus'

export default class BackGround {
  constructor() {
    this.dataBus = new DataBus
  }

  update(angle) {
    const y = Math.sin(2 * Math.PI / 360 * angle) * this.dataBus.mapSpeed
    const x = Math.cos(2 * Math.PI / 360 * angle) * this.dataBus.mapSpeed
    this.dataBus.mapX -= x
    this.dataBus.mapY += y
  }

  render(ctx) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.moveTo(this.dataBus.mapX, this.dataBus.mapY)
    ctx.lineTo(this.dataBus.mapX + this.dataBus.mapWidth, this.dataBus.mapY)
    ctx.lineTo(this.dataBus.mapX + this.dataBus.mapWidth, this.dataBus.mapY + this.dataBus.mapHeight)
    ctx.lineTo(this.dataBus.mapX, this.dataBus.mapY + this.dataBus.mapHeight)
    ctx.closePath()
    ctx.strokeStyle = 'red'
    ctx.stroke()
  }
}