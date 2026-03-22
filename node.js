const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'skibidi69-anhdomixi.aternos.me:40482',
    port: 25565,
    username: 'MinhDz123'
  })

  bot.loadPlugin(pathfinder)

  bot.on('spawn', () => {
    console.log('✅ Bot đã vào server')

    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)
    bot.pathfinder.setMovements(defaultMove)

    // 🧠 Random di chuyển
    setInterval(() => {
      const x = bot.entity.position.x + (Math.random() * 10 - 5)
      const z = bot.entity.position.z + (Math.random() * 10 - 5)
      const y = bot.entity.position.y

      bot.pathfinder.setGoal(new goals.GoalBlock(x, y, z))
    }, 15000)

    // 👀 Nhìn người chơi gần nhất
    setInterval(() => {
      const players = Object.values(bot.players)
      if (players.length > 0) {
        const target = players[Math.floor(Math.random() * players.length)]
        if (target.entity) {
          bot.lookAt(target.entity.position.offset(0, 1.6, 0))
        }
      }
    }, 5000)

    // 💬 Chat random
    setInterval(() => {
      const msgs = ['hi', 'hello', 'afk tí', 'lag quá', 'đang farm']
      bot.chat(msgs[Math.floor(Math.random() * msgs.length)])
    }, 40000)

    // 🎮 Hành động random
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 10000)
  })

  bot.on('end', () => {
    console.log('❌ Bot bị out → reconnect...')
    setTimeout(createBot, 5000)
  })

  bot.on('error', err => console.log('Lỗi:', err.message))
}

createBot()