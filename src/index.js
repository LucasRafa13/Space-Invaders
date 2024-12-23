import Player from './classes/Player.js'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

ctx.imageSmoothingEnabled = false

const player = new Player(canvas.width, canvas.height)
const playerProjectiles = []

const keys = {
  left: false,
  right: false,
  shoot: {
    pressed: false,
    released: true,
  },
}

const drawProjectiles = () => {
  playerProjectiles.forEach((projectile) => {
    projectile.draw(ctx)
    projectile.update()
  })
}

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawProjectiles()

  ctx.save()

  ctx.translate(
    player.position.x + player.width / 2,
    player.position.y + player.height / 2,
  )

  if (keys.shoot.pressed && keys.shoot.released) {
    player.shoot(playerProjectiles)
    keys.shoot.released = false
  }
  if (keys.left && player.position.x >= 0) {
    player.moveLeft()
    ctx.rotate(-0.15)
  }

  if (keys.right && player.position.x <= canvas.width - player.width) {
    player.moveRight()
    ctx.rotate(0.15)
  }

  ctx.translate(
    -player.position.x - player.width / 2,
    -player.position.y - player.height / 2,
  )

  player.draw(ctx)

  ctx.restore()

  window.requestAnimationFrame(gameLoop)
}

player.draw(ctx)

addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase()

  if (key === 'a') keys.left = true

  if (key === 'd') keys.right = true

  if (key === 'enter') keys.shoot.pressed = true
})

addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase()

  if (key === 'a') keys.left = false

  if (key === 'd') keys.right = false

  if (key === 'enter') {
    keys.shoot.pressed = false
    keys.shoot.released = true
  }
})

gameLoop()
