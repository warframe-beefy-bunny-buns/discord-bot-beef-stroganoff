// @ts-check
const { PREFIX } = require('./config')
const Discord = require('discord.js')
require('colors')

/**
 * @typedef {(message: Discord.Message, args: string[]) => Promise<void>} CommandHandler
 * @typedef {{
 * name: string;
 * description?: string;
 * execute: CommandHandler;
 * }} CommandDefinition
 */
class CommandManager {
  /**
   * @type {Discord.Client | null}
   */
  #client = null

  /**
   * @type {Map<string, CommandDefinition>}
   */
  #commands = new Map()
  constructor() {}

  /**
   * @param {CommandDefinition} commandDefinition
   */
  addCommand(commandDefinition) {
    this.#commands.set(commandDefinition.name, commandDefinition)
  }

  /**
   * @param {Discord.Message} message
   */
  helpHandler(message) {
    message.reply(
      [
        `\n  ${PREFIX}help: Help new users by displaying list of commands`,
        ...Array.from(this.#commands.values()).map(
          (c) => `  ${PREFIX}${c.name}: ${c.description}`
        ),
      ].join('\n')
    )
  }

  /**
   * Execute a matching command handler.
   * @param {string} command
   * @param {Discord.Message} message
   * @param {string[]} args
   * @returns Promise<void>
   */
  async executeCommand(command, message, args) {
    const handler = this.#commands.get(command)?.execute
    if (!handler) {
      // No matching command found.
      return this.helpHandler(message)
    }

    try {
      return handler(message, args)
    } catch (error) {
      console.log('ERROR'.red.inverse)
      console.log(error)
      console.log('End of error message'.red.inverse)
      message.reply(`\nThere was an error trying to execute that command!`)
    }
  }

  /**
   * @param {Discord.Client} client
   */
  connectClient(client) {
    this.#client = client

    client.on('message', (message) => {
      const {
        content,
        author: { bot },
      } = message

      if (!content.startsWith(PREFIX) || bot) {
        // This message is not for this bot.
        return
      }

      const args = content.slice(PREFIX.length).trim().split(/ +/)
      const command = args.shift().toLowerCase()

      return this.executeCommand(command, message, args)
    })
  }
}

module.exports = CommandManager
