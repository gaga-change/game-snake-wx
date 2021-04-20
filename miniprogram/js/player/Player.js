const DIR_MARGIN = 20 // 箭头离中心点距离，值越大箭头离中心点越远
const DIR_LENGTH = 5 // 方向箭头长度（单边），值越大箭头越大
import DataBus from '../DataBus'
const dataBus = new DataBus()

export default class Player {
  constructor() {
    
  }

  render(ctx, angle) {
    // 绘制一个中心点
    const width = window.innerWidth
    const height = window.innerHeight
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
    // 绘制方向箭头
    const r = Math.sqrt(Math.pow(DIR_LENGTH, 2) * 2) / 2
    const sinAngle = Math.sin(2 * Math.PI / 360 * angle)
    const cosAngle = Math.cos(2 * Math.PI / 360 * angle)
    const centerPoint = {
      x: width / 2 + DIR_MARGIN * cosAngle,
      y: height / 2 - DIR_MARGIN * sinAngle
    }
    ctx.beginPath()
    ctx.moveTo(centerPoint.x - sinAngle * r, centerPoint.y - cosAngle * r)
    ctx.lineTo(centerPoint.x + cosAngle * r, centerPoint.y - sinAngle * r)
    ctx.lineTo(centerPoint.x + sinAngle * r, centerPoint.y + cosAngle * r)
    ctx.strokeStyle = '#eca3f5'
    ctx.stroke()
  }
  renderPoint() {

  }
}