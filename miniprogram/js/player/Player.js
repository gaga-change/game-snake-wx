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
    this.snakeLaster = this.snakeHeader
    for(let i = 0; i < 5; i ++) {
      this.addPoint()
    }
  }

  update(angle) {
    this.arrow.update(angle)
    this.snakeHeader.update(angle)
  }

  addPoint() {
    this.snakeLaster = this.snakeLaster.addPoint()
  }

  render(ctx) {
    this.arrow.render(ctx)
    this.snakeHeader.render(ctx)
  }
}