const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Celestial_MC.aternos.me:41456',
    port: 41456,
    username: 'DominatorBot'
  });

  bot.on('spawn', () => {
    console.log('Bot is online on 2b2t');

    // AFK anti-kick movement - walk in a small circle
    let direction = 0;
    setInterval(() => {
      bot.look(direction, 0);
      bot.setControlState('forward', true);
      setTimeout(() => {
        bot.setControlState('forward', false);
        direction += Math.PI / 2; // turn 90 degrees
        if (direction >= 2 * Math.PI) direction = 0;
      }, 2000); // walk for 2 seconds
    }, 30000); // every 30 seconds

    // Optional: send chat to avoid kick
    setInterval(() => {
      bot.chat('AFK');
    }, 600000); // every 10 minutes
  });

  bot.on('end', () => {
    console.log('Disconnected, reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', console.log);
}

createBot();
