const CommandManager = require('../command-manager')
const requireAll = require('../utils/requireAll')

const manager = new CommandManager()

requireAll(__dirname).forEach((commandDefinition) =>
  manager.addCommand(commandDefinition)
)

module.exports = manager
