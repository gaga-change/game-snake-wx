import DataBus from "../DataBus"
const dataBus = new DataBus()

export default class GameInfo {
  constructor() {
    this.btnX = window.innerWidth / 2 - 50
    this.btnY =  window.innerHeight / 4 * 3
    this.btnWidth = 100
    this.btnHeight = 50
  }

  renderGameScore(ctx) {
    ctx.fillStyle = 'red'
    ctx.font = '20px Arial'

    ctx.fillText(
      dataBus.score,
      10,
      30
    )
  }

  renderGameOver(ctx) {
    // ctx.fillStyle = '#66666611'
    ctx.fillStyle = 'rgba(66, 66, 66, 0.5)'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fillStyle = 'red'
    ctx.font = '20px Arial'

    ctx.fillText(
      "游戏结束",
      window.innerWidth / 2 - 40,
      window.innerHeight / 2 - 30
    )

    ctx.fillText(
      `分数：${dataBus.score}`,
      window.innerWidth / 2 - 40,
      window.innerHeight / 2
    )

    ctx.fillStyle = 'yellow'
    ctx.fillRect(this.btnX, this.btnY, this.btnWidth, this.btnHeight)
    ctx.fillStyle = '#000'
    ctx.font = '20px Arial'
    ctx.fillText(
      `重新开始`,
      window.innerWidth / 2 - 40,
      window.innerHeight / 4 * 3 + 50 / 2 + 8
    )
  }


  isClickBtn(x, y) {
    return x <= this.btnX + this.btnWidth 
      && x >= this.btnX
      && y <= this.btnY + this.btnHeight
      && y >= this.btnY
  }

  update() {

  }

  render() {

  }
}