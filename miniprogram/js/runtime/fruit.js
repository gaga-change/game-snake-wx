import DataBus from '../databus'

export default class Fruit {
  constructor() {
    this.visible = true
    this.dataBus = new DataBus()
    this.reset()
  }

  reset() {
    this.setPosition()
  }
  render(ctx, x, y, r) {
    if (!this.visible) return
    ctx.beginPath()
    ctx.arc(this.dataBus.mapX + this.dataBus.fruitRadius + this.x, this.dataBus.mapY + this.dataBus.fruitRadius + this.y, this.dataBus.fruitRadius, 0, 2 * Math.PI)
    ctx.fillStyle = '#b0efeb'
    ctx.fill()
  }

  // 随机获取坐标点
  setPosition() {
    this.x = (this.dataBus.mapWidth - 2 * this.dataBus.fruitRadius) * Math.random()
    this.y = (this.dataBus.mapHeight - 2 * this.dataBus.fruitRadius) * Math.random()
  }
}