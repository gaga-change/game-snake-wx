
import Direction from './libs/canvas-direction'
let instance

export default class DataBus {
  constructor() {
    if (instance) return instance
    instance = this
    this.reset()
  }

  reset() {
    this.frame = 0
    this.direction = new Direction()
  }
}