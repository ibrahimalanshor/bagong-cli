const { removeFolder } = require('./remover')
const { appendRoutes } = require('./routes')

module.exports = async name => {
  try {
    await removeFolder(name)
    await appendRoutes(name)

    console.log('module removed')
  } catch (err) {
    console.log(err)
  }
}