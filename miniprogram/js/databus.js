
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
    this.playerRadius = 5 // 蛇头半径
  }
}