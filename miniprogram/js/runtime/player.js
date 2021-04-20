const DIR_MARGIN = 20 // 箭头离中心点距离，值越大箭头离中心点越远
const DIR_LENGTH = 5 // 方向箭头长度（单边），值越大箭头越大
import DataBus from '../databus'
import {
  aotoAngule
} from '../libs/canvas-direction'
import Point from './point'


class SnakeBody {
  constructor() {
    this.dataBus = new DataBus()
    // todo 加速逻辑待处理
    let temp = Math.floor(this.dataBus.playerRadius * 2 / this.dataBus.mapSpeed)
    this.historyAngle = []
    for (let i = 0; i < temp; i++) {
      this.historyAngle.push(0)
    }
  }

  render(prePoint, angule) {
    const bodyAngule = this.historyAngle.pop()
    this.historyAngle.unshift(angule)

  }

}

export default class Player {
  constructor() {
    this.dataBus = new DataBus()
  }

  render(ctx, angle) {
    // 绘制一个中心点
    const width = window.innerWidth
    const height = window.innerHeight
    let headerMoveX
    let headerMoveY
    for (let i = this.dataBus.snakePoints.length - 1; i >= 0; i--) {
      const point = this.dataBus.snakePoints[i]
      const prePoint = this.dataBus.snakePoints[i + 1]
      if (i === this.dataBus.snakePoints.length - 1) {
        // 头部，正常绘制
        // 下一帧移动距离
        headerMoveY = Math.sin(2 * Math.PI / 360 * angle) * this.dataBus.mapSpeed
        headerMoveX = Math.cos(2 * Math.PI / 360 * angle) * this.dataBus.mapSpeed
        point.gs.unshift(angle)
        point.render(ctx)
      } else {
        // 身体部分
        // 获取上个原点历史第五（圆半径*2/速度）帧移动的角度
        const historyAngle = prePoint.gs.pop() || 0
        const y = Math.sin(2 * Math.PI / 360 * historyAngle) * this.dataBus.mapSpeed
        const x = Math.cos(2 * Math.PI / 360 * historyAngle) * this.dataBus.mapSpeed
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