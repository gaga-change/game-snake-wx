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
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)
    this.player.render(ctx, databus.direction.nextAngule())
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