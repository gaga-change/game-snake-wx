import Direction from './libs/canvas-direction'
import SnakePoint from './player/SnakePoint'
let instance

export default class DataBus {
  constructor() {
    if (instance) return instance
    instance = this
    this.direction = new Direction()
    this.reset()
  }

  reset() {
    this.frame = 0
    this.direction.reset()
    // 地图初始左上角坐标
    this.mapX = 20
    this.mapY = 20
    // 地图宽度
    this.mapWidth = window.innerWidth - 40
    // 地图高度
    this.mapHeight = window.innerHeight - 40
    // 地图移动速度（蛇移动速度）每帧
    this.mapSpeed = 2
    // 蛇头半径
    this.playerRadius = 5
    // 食物半径
    this.fruitRadius = 5
    this.fruits = []
    this.snakePoints = [
      // new Point(window.innerWidth / 2 - this.playerRadius * 2 * 2, window.innerHeight / 2, 'green'),
      // new Point(window.innerWidth / 2 - this.playerRadius * 2 * 1, window.innerHeight / 2, 'blue'),
      // new Point(window.innerWidth / 2 - this.playerRadius * 2 * 0, window.innerHeight / 2, 'red')
    ]
    for (let i = 0; i < 10; i++) {
      let color = 'blue'
      if (i === 0) {
        color = 'red'
      }
      this.snakePoints.unshift(new SnakePoint(window.innerWidth / 2 - this.playerRadius * 2 * i, window.innerHeight / 2, this.playerRadius, color))
    }
  }
}