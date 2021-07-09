const ABOUT = `
Discord bot for displaying various Warframe data

Born in July 9th, 2021

Honoring the Warframe alliance of Beefy Bunny Buns

Written by Ghu'Zach#7701, ccld44#1790`

module.exports = {
  name: 'about',
  description: 'Display info about Noffy',
  execute(message, args) {
    message.reply(ABOUT)
  },
}
