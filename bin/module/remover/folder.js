const path = require('path')
const fs = require('fs').promises

module.exports = async name => {
  const dir = path.resolve(`./src/modules/${name}`)

  await fs.rm(dir, { recursive: true })
}