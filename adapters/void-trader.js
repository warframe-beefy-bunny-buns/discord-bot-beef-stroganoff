const axios = require('axios')

let cache = {
  // empty by default
}

module.exports = async () => {
  const { fetchedAt } = cache

  if (!fetchedAt || Date.now() - fetchedAt > 60000) {
    const { data } = await axios.get(
      'https://api.warframestat.us/pc/voidTrader'
    )
    cache = { fetchedAt: Date.now(), ...data }
  }

  return cache
}
