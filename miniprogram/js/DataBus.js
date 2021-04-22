import Direction from './libs/canvas-direction'
let instance

export default class DataBus {
  constructor() {
    if (instance) return instance
    instance = this
    this.direction = new Direction()
    this.reset({})
  }

  reset() {
    this.frame = 0
    this.direction.reset()
    // 箭头离中心点距离，值越大箭头离中心点越远
    this.arrowMargin = 20
    // 方向箭头长度（单边），值越大箭头越大
    this.arrowLength = 5
    // 箭头颜色
    this.arrowColor = '#eca3f5'
    // 地图初始左上角坐标
    this.mapX = 20
    this.mapY = 20
    // 地图宽度
    this.mapWidth = window.innerWidth
    // 地图高度
    this.mapHeight = window.innerHeight
    // 地图移动速度（蛇移动速度）每帧
    this.mapSpeed = 2
    // 蛇头半径
    this.playerRadius = 5
    // 食物半径
    this.fruitRadius = 5
    this.fruits = []
    this.lastPoint = null
    // this.snakePoints = []
    // this.snakePoints = null
    // for (let i = 0; i < 10; i++) {
    //   let color = 'blue'
    //   if (i === 0) {
    //     color = 'red'
    //   }
    //   this.snakePoints.unshift(new SnakePoint(window.innerWidth / 2 - this.playerRadius * 2 * i, window.innerHeight / 2, this.playerRadius, color, 0))
    // }
  }
}