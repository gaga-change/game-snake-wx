import Point from '../base/Point'
import DataBus from '../DataBus'
const dataBus = new DataBus()

export default class Fruit extends Point {
  constructor() {
    super(undefined, undefined, dataBus.fruitRadius, '#b0efeb')
    this.reset()
  }

  reset() {
    this.setPosition()
  }

  render(ctx) {
    this.x = dataBus.mapX + dataBus.fruitRadius + this.positionX
    this.y = dataBus.mapY + dataBus.fruitRadius + this.positionY
    super.render(ctx)
  }

  // 随机获取相对坐标点
  setPosition() {
    this.positionX = +(dataBus.mapWidth - 2 * dataBus.fruitRadius) * Math.random()
    this.positionY = (dataBus.mapHeight - 2 * dataBus.fruitRadius) * Math.random()
  }
}