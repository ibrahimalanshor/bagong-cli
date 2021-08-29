const fs = require('fs')
const path = require('path')

module.exports = async name => {
  const folder = path.resolve(name)

  const exists = await fs.existsSync(folder)
  
  if (!exists) {
    await fs.promises.mkdir(folder)
  } else {
    throw 'Module already exists'
  }

  return folder
}