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
    this.snakeLength = 1
    this.snakeHeader = new SnakePoint(window.innerWidth / 2, window.innerHeight / 2, '#112200')
    this.snakeLaster = this.snakeHeader
    for(let i = 0; i < 20; i ++) {
      this.addPoint()
    }
  }

  cutPoint() {

  }

  update(angle) {
    this.arrow.update(angle)
    // 移动加速，减少节点
    if(dataBus.mapSpeed > this.snakeLaster.prePoint.mapSpeed) {
      let temp = dataBus.mapSpeed
      do {
        let setp = this.snakeLaster.prePoint.mapSpeed
        temp -= setp
        this.snakeLaster = this.snakeLaster.prePoint
        this.snakeLaster.nextPoint = null
      } while (temp > this.snakeLaster.prePoint.mapSpeed)
    }
    this.snakeHeader.update(angle, dataBus.mapSpeed)
  }

  addPoint() {
    this.snakeLength ++
    this.snakeLaster = this.snakeLaster.addPoint()
    console.log(this.snakeLength)
    if (this.snakeLength === 30) {
      dataBus.mapSpeed = 4
    } else if (this.snakeLength === 40) {
      dataBus.mapSpeed = 8
    }
  }

  render(ctx) {
    this.arrow.render(ctx)
    this.snakeHeader.render(ctx)
  }
}