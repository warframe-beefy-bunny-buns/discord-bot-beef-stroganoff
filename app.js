const fs = require('fs')
const Discord = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()
const colors = require('colors')
const { TOKEN, PREFIX } = require('./config.js')
const commandManager = require('./commands')

const client = new Discord.Client()

commandManager.connectClient(client)

client.on('ready', () => {
  console.log(`Bot <${client.user.tag}> is now active`.green.inverse)
  client.user.setActivity('Warframe | type !help', { type: 'PLAYING' })
})

client.login(TOKEN)
