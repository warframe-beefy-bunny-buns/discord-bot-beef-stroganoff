const fs = require('fs')
const { prefix } = require('../constants/constants.js')

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js') && file !== 'help.js')

let helpString = `\n  ${prefix}help: Help new users by displaying list of commands`
for (const file of commandFiles) {
  const command = require(`./${file}`)
  helpString += `\n  ${prefix}${command.name}: ${command.description}`
}

module.exports = {
  name: 'help',
  description: 'Help new users by displaying list of commands',
  execute(message, args) {
    message.reply(helpString)
  },
}
