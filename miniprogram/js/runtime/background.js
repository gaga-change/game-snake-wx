export default class BackGround {
  constructor() {

  }

  render(ctx) {
    const height = window.innerHeight
    const width = window.innerWidth
    // 绘制格子，高度80%
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
  }
}