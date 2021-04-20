import DataBus from '../DataBus'
import Arrow from './Arrow'
const dataBus = new DataBus()

export default class Player {
  constructor() {
    this.reset()
  }

  reset() {
    this.arrow = new Arrow()
  }

  update(angle) {
    this.arrow.update(angle)
    let headerMoveX
    let headerMoveY
    const snakeLength = dataBus.snakePoints.length
    for (let i = snakeLength - 1; i >= 0; i--) {
      const point = dataBus.snakePoints[i]
      const prePoint = dataBus.snakePoints[i + 1]
      if (i === snakeLength - 1) {
        // 头部
        // 下一帧移动距离
        headerMoveY = Math.sin(2 * Math.PI / 360 * angle) * dataBus.mapSpeed
        headerMoveX = Math.cos(2 * Math.PI / 360 * angle) * dataBus.mapSpeed
        point.gs.unshift(angle)
      } else {
        // 身体部分
        // 获取上个圆点历史第五（圆半径*2/速度）帧移动的角度
        const historyAngle = prePoint.gs.pop() || 0
        const y = Math.sin(2 * Math.PI / 360 * historyAngle) * dataBus.mapSpeed
        const x = Math.cos(2 * Math.PI / 360 * historyAngle) * dataBus.mapSpeed
        point.gs.unshift(historyAngle)
        point.x = point.x + x - headerMoveX
        point.y = point.y - y + headerMoveY
        if (i === 0) {
          point.gs.pop()
        }
      }
    }
  }

  render(ctx) {
    this.arrow.render(ctx)
    // 从尾部开始绘制
    dataBus.snakePoints.forEach(point => point.render(ctx))
  }
  renderPoint() {

  }
}