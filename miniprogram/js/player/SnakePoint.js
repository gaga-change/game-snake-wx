import Point from "../base/Point";

export default class SnakePoint extends Point {
  constructor(x, y, r, color) {
    super(x, y, r, color)
    // 初始角度
    // todo 初始节点数量和移动速率有关
    this.gs = [0, 0, 0, 0, 0]
  }
}