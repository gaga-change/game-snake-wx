import DataBus from './databus'
import BackGround from './runtime/background'
import Player from './runtime/player'

const databus = new DataBus()
const ctx = canvas.getContext('2d')
/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.personalHighScore = null
    this.restart()
  }

  restart() {
    databus.reset()
    this.bg = new BackGround()
    this.player = new Player()
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    window.cancelAnimationFrame(this.aniId)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
    )
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
      databus.dirAngle = Math.atan2(this.startPoint.y - nowPoint.y, nowPoint.x - this.startPoint.x) * (180 / Math.PI)
    } else if (e.type === 'touchend') {
      this.startPoint = null
    }
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)
    this.player.render(ctx, databus.dirAngle)
    // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    // this.bg.render(ctx)
    // this.player.render(ctx, databus.dirAngle)
    if (!this.hasEventBind) {
      this.hasEventBind = true
      this.touchHandler = this.touchEventHandler.bind(this)
      new Array('touchstart', 'touchmove', 'touchend').forEach(eName => {
        canvas.addEventListener(eName, this.touchHandler)
      })
    }
  }
  loop() {
    databus.frame++
    this.render()
    this.aniId = window.requestAnimationFrame(
      this.bindLoop
    )
  }
}