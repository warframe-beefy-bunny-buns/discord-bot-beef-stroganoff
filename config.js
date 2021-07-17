const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()

function fromFile(filename) {
  if (!filename) return undefined
  return fs.readFileSync(filename, 'ascii')
}

module.exports = {
  TOKEN: fromFile(process.env.TOKEN_FILE) ?? process.env.TOKEN,
  PREFIX: process.env.PREFIX || '!',
}
