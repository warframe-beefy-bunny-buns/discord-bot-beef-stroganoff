const fs = require('fs')
const path = require('path')

function requireAll(modulePath) {
  const files = fs
    .readdirSync(modulePath)
    .filter((file) => file.endsWith('.js') && file !== 'index.js')

  const modulePaths = files.map((file) => path.join(modulePath, file))

  return modulePaths.map((modulePath) => require(modulePath))
}

module.exports = requireAll
