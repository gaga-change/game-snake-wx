import DataBus from './DataBus'
import BackGround from './runtime/Background'
import Player from './player/Player'
import Fruit from './fruit/Fruit'
import SnakePoint from './player/SnakePoint'
import GameInfo from './runtime/GameInfo'

const dataBus = new DataBus()
const ctx = canvas.getContext('2d')

// 抗锯齿
canvas.width = canvas.width * window.devicePixelRatio
canvas.height = canvas.height * window.devicePixelRatio
ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

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
    // dataBus.snakePoints = new SnakePoint(window.innerWidth / 2, window.innerHeight / 2)
    this.bg = new BackGround()
    this.gameInfo = new GameInfo()
    this.player = new Player()
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    this.gameEnd = false
    window.cancelAnimationFrame(this.aniId)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
    )
  }

  touchEventHandler(e) {
    if (this.gameEnd && e.type === 'touchend') {
      if (this.gameInfo.isClickBtn(e.changedTouches[0].clientX,e.changedTouches[0].clientY )) {
        this.restart()
      }
    }
  }
  // 全局碰撞检测
  collisionDetection() {
    // 是否吃到水果（碰到算吃掉）
    const snakeHeaderPoint = this.player.snakeHeader
    const eatFruitIndex = dataBus.fruits.findIndex(fruit => {
      return snakeHeaderPoint.isCollide(fruit)
    })
    if (eatFruitIndex > -1) { // 吃到水果
      dataBus.fruits.splice(eatFruitIndex, 1)
      // 蛇身体增加
      this.player.addPoint()
    }
    // 撞墙检测
    if (dataBus.mapY >= window.innerHeight / 2 - dataBus.playerRadius ||
      dataBus.mapY + dataBus.mapHeight <= window.innerHeight / 2 + dataBus.playerRadius) {
      // dataBus.mapY -= y
      this.gameEnd = true
    }
    if (dataBus.mapX >= window.innerWidth / 2 - dataBus.playerRadius ||
      dataBus.mapX + dataBus.mapWidth <= window.innerWidth / 2 + dataBus.playerRadius) {
      // dataBus.mapX += x
      this.gameEnd = true
    }
    // 撞身体检测
    if (this.player.isCollide()) {
      this.gameEnd = true
    }
  }

  update() {
    // 下一帧 蛇的方向
    this.newAngule = dataBus.direction.nextAngule()
    this.bg.update(this.newAngule)
    dataBus.fruits.forEach((item) => item.update())
    this.player.update(this.newAngule)
    this.collisionDetection()
  }

  render() {
    if (this.gameEnd) {
      this.gameInfo.renderGameOver(ctx)
      return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 背景绘制
    this.bg.render(ctx)
    // 每一秒新增一个水果，数量最多10个
    if (dataBus.frame % 60 === 0 && dataBus.fruits.length < 10) {
      dataBus.fruits.push(new Fruit())
    }
    // 水果绘制
    dataBus.fruits.forEach((item) => item.render(ctx))
    // 蛇绘制
    this.player.render(ctx)
    // 分数
    this.gameInfo.renderGameScore(ctx, dataBus.score)
    // 事件绑定
    if (!this.hasEventBind) {
      this.hasEventBind = true
      this.touchHandler = this.touchEventHandler.bind(this)
      new Array('touchstart', 'touchmove', 'touchend').forEach(eName => {
        canvas.addEventListener(eName, this.touchHandler)
      })
    }
  }

  loop() {
    dataBus.frame++
    this.update()
    this.render()
    if (this.gameEnd) {
      return  
    }
    this.aniId = window.requestAnimationFrame(
      this.bindLoop
    )
  }
}