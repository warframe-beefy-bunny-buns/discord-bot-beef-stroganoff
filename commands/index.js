const CommandManager = require('./manager')

const manager = new CommandManager()

manager.addCommand(require('./about'))
manager.addCommand(require('./baro'))

module.exports = manager
