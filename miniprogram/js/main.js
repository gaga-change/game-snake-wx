import DataBus from './databus'
import BackGround from './runtime/background'
import Player from './runtime/player'

const dataBus = new DataBus()
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
    dataBus.reset()
    const bg = new BackGround()
    const player = new Player()
    bg.render(ctx)
    player.render(ctx)
  }
}