
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
  }
}