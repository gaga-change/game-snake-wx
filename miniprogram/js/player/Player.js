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
    for(let i = 0; i < 100; i ++) {
      this.addPoint()
    }
    dataBus.score = 0
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
    dataBus.score ++
    this.snakeLaster = this.snakeLaster.addPoint()
    if (this.snakeLength === 200) {
      dataBus.mapSpeed = 4
    } else if (this.snakeLength === 300) {
      dataBus.mapSpeed = 8
    }
  }

  // 蛇身碰撞检测
  isCollide() {
    let point = this.snakeHeader.nextPoint
    let margin = dataBus.playerRadius * 2
    while (point) {
      margin -= point.mapSpeed
      if (margin < 0) {
        let result = this.snakeHeader.isCollide(point)
        if (result) return true
      }
      point = point.nextPoint
    }
    return false
  }

  render(ctx) {
    this.arrow.render(ctx)
    this.snakeHeader.render(ctx)
  }
}