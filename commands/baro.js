const { MessageEmbed } = require('discord.js')
const { formatDistanceStrict } = require('date-fns')
const voidTrader = require('../adapters/void-trader.js')

const welcomeMessage = [
  "The wait is over Tenno, Baro Ki'Teer has arrived.",
  'My latest safari in the Void has yielded spectacular finds. Unique items for the Tenno of distinction.',
  'Tenno! May I extend an invitation to you, my latest collection of choice items from the Void is now available for viewing.',
]

module.exports = {
  name: 'baro',
  description: 'track baro and his wares',
  async execute(message, args) {
    const { active, location, activation, expiry, inventory } =
      await voidTrader()

    if (!active) {
      const timeActive = new Date(activation)
      const timeRemaining = formatDistanceStrict(timeActive, Date.now(), {
        addSuffix: true,
      })

      const joke =
        Math.random() < 0.9
          ? ''
          : `\n\n*They always ask When Barrow\nbut not How Barrow*`

      await message.reply(
        `\nBaro Ki'Teer will come to sell his wares to ***${location}*** ***${timeRemaining}*** ${joke}`
      )
    } else {
      const timeExpire = new Date(expiry)
      const timeRemaining = formatDistanceStrict(timeExpire, Date.now(), {
        addSuffix: true,
      })

      const itemList = inventory.reduce(
        (acc, item) => (acc += `\n${item.item}`),
        ''
      )
      const ducatsList = inventory.reduce(
        (acc, item) => (acc += `\n${item.ducats}`),
        ''
      )
      const creditsList = inventory.reduce(
        (acc, item) => (acc += `\n${item.credits}`),
        ''
      )

      // todo: embed the wares details and send embedded message
      const embed = new MessageEmbed()
        .setColor('#008080')
        .setTitle("Baro Ki'Teer's Delicious Wares")
        .setDescription(
          welcomeMessage[Math.floor(Math.random() * welcomeMessage.length)]
        )
        .setThumbnail(
          'https://static.wikia.nocookie.net/warframe/images/a/a7/TennoCon2020BaroCropped.png/revision/latest/scale-to-width-down/310?cb=20200712232455'
        )
        .addFields(
          { name: 'Item', value: itemList, inline: true },
          { name: 'Ducats', value: ducatsList, inline: true },
          { name: 'Credits', value: creditsList, inline: true }
        )
        .setTimestamp()
        .setFooter('Barooo')

      await message.channel.send(embed)
    }
  },
}
