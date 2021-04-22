import DataBus from '../DataBus'
import Arrow from './Arrow'
import SnakePoint from './SnakePoint'
const dataBus = new DataBus()

export default class Player {
  constructor() {
    this.reset()
  }

  reset() {
    this.arrow = new Arrow()
    this.snakeHeader = new SnakePoint(window.innerWidth / 2, window.innerHeight / 2, '#112200')
    dataBus.lastPoint.addPoint('#112201')
    dataBus.lastPoint.addPoint('#112202')
    dataBus.lastPoint.addPoint('#112203')
    dataBus.lastPoint.addPoint('#112204')
  }

  update(angle) {
    this.arrow.update(angle)
    this.snakeHeader.update(angle)
  }

  addPoint() {
    dataBus.lastPoint.addPoint()
  }

  render(ctx) {
    this.arrow.render(ctx)
    this.snakeHeader.render(ctx)

    // 从尾部开始绘制
    // dataBus.snakePoints.render(ctx)
    // dataBus.snakePoints.forEach(point => point.render(ctx))
  }
  renderPoint() {

  }
}