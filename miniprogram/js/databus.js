import Direction from './libs/canvas-direction'
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
    // 地图移动速度
    this.mapSpeed = 2
    // 蛇头半径
    this.playerRadius = 5
    // 食物半径
    this.fruitRadius = 5
    this.fruits = []
  }
}