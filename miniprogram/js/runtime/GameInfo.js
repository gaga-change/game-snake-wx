export default class GameInfo {
  constructor() {

  }

  renderGameScore(ctx, score) {
    ctx.fillStyle = 'red'
    ctx.font = '20px Arial'

    ctx.fillText(
      score,
      10,
      30
    )
  }

  update() {

  }

  render() {
    
  }
}