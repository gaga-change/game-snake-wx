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

  render(ctx, angle) {
    this.arrow.render(ctx, angle)
    // 绘制一个中心点
    let headerMoveX
    let headerMoveY
    for (let i = dataBus.snakePoints.length - 1; i >= 0; i--) {
      const point = dataBus.snakePoints[i]
      const prePoint = dataBus.snakePoints[i + 1]
      if (i === dataBus.snakePoints.length - 1) {
        // 头部，正常绘制
        // 下一帧移动距离
        headerMoveY = Math.sin(2 * Math.PI / 360 * angle) * dataBus.mapSpeed
        headerMoveX = Math.cos(2 * Math.PI / 360 * angle) * dataBus.mapSpeed
        point.gs.unshift(angle)
        point.render(ctx)
      } else {
        // 身体部分
        // 获取上个原点历史第五（圆半径*2/速度）帧移动的角度
        const historyAngle = prePoint.gs.pop() || 0
        const y = Math.sin(2 * Math.PI / 360 * historyAngle) * dataBus.mapSpeed
        const x = Math.cos(2 * Math.PI / 360 * historyAngle) * dataBus.mapSpeed
        point.gs.unshift(historyAngle)
        point.x = point.x + x - headerMoveX
        point.y = point.y - y + headerMoveY
        point.render(ctx)
        if (i === 0) {
          point.gs.pop()
        }
      }
    }
    
  }
  renderPoint() {

  }
}