
const DIR_MARGIN = 20 // 箭头离中心点距离，值越大箭头离中心点越远
const DIR_LENGTH = 5 // 方向箭头长度（单边），值越大箭头越大

function nextAngule(goalAngule, nowAngule, step = 10) {
  const aotoAngule  = (angule) => {
    if (angule < -180) return angule += 360
    if (angule > 180 ) return angule -= 360
    return angule
  }
  let temp = goalAngule - nowAngule
  temp = aotoAngule(temp)
  if (Math.abs(temp) < step) {
    return goalAngule
  } else if (temp < 0) {
    return aotoAngule(nowAngule - step)
  } else if (temp > 0) {
    return aotoAngule(nowAngule + step)
  }
}

export default class Player {
  constructor() {
    this.angle = null
  }

  render(ctx, angle = 60) {
    // 角度 -180~180 转为 0 ~ 360
    if (this.angle === null) {
      this.angle = angle
    } else {
      let t = nextAngule(angle, this.angle, 10)
      console.log(angle, this.angle, t)
      this.angle = t
    }
    angle = this.angle
    // console.log(angle)
    // 绘制一个中心点
    const width = window.innerWidth
    const height = window.innerHeight
    // console.log(width / 2, height / 2, 5, 0, 2 * Math.PI)
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, 5, 0, 2 * Math.PI)
    ctx.fillStyle = '#b0efeb'
    ctx.fill()
    // ctx.strokeStyle = '#eca3f5'
    // ctx.stroke()

    // 绘制方向箭头
    const r = Math.sqrt(Math.pow(DIR_LENGTH, 2) * 2) / 2
    const sinAngle = Math.sin(2 * Math.PI / 360 * angle)
    const cosAngle = Math.cos(2 * Math.PI / 360 * angle)
    const centerPoint = {
      x: width / 2 + DIR_MARGIN * cosAngle,
      y: height / 2 - DIR_MARGIN * sinAngle
    }
    ctx.beginPath()
    ctx.moveTo(centerPoint.x - sinAngle * r, centerPoint.y - cosAngle * r )
    ctx.lineTo(centerPoint.x + cosAngle * r, centerPoint.y - sinAngle * r )
    ctx.lineTo(centerPoint.x + sinAngle * r, centerPoint.y + cosAngle * r )
    ctx.strokeStyle = '#eca3f5'
    ctx.stroke()
  }
}