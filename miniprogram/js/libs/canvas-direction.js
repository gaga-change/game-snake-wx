let instance
export default class Direction {
  constructor(defaultAngle) {
    if (instance) {
      return instance
    }
    this.nowAngule = null
    this.hasEventBind = false
    this.bindEvnt()
    this.reset(defaultAngle)
  }

  reset(defaultAngle) {
    this.dirAngle = defaultAngle || 90
  }

  bindEvnt() {
    if (!this.hasEventBind) {
      this.hasEventBind = true
      this.touchHandler = this.touchEventHandler.bind(this)
      new Array('touchstart', 'touchmove', 'touchend').forEach(eName => {
        canvas.addEventListener(eName, this.touchHandler)
      })
    }
  }

  touchEventHandler(e) {
    if (e.type === 'touchstart') {
      this.startPoint = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    } else if (e.type === 'touchmove') {
      const nowPoint = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
      // 计算角度
      const angule = Math.atan2(this.startPoint.y - nowPoint.y, nowPoint.x - this.startPoint.x) * (180 / Math.PI)
      this.dirAngle = angule
      // this.changeCallback && this.changeCallback(angule)
    } else if (e.type === 'touchend') {
      this.startPoint = null
    }
  }
  nextAngule() {
    if (this.nowAngule === null) {
      this.nowAngule = this.dirAngle
    } else {
      this.nowAngule = this._nextAngule(this.dirAngle, this.nowAngule, 10)
    }
    return this.nowAngule
  }
  // 计算下一个角度，实现方向变换动画效果
  _nextAngule(goalAngule, nowAngule, step = 10) {
    const aotoAngule = (angule) => {
      if (angule < -180) return angule += 360
      if (angule > 180) return angule -= 360
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
}