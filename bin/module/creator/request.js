const fs = require('fs').promises
const path = require('path')

const createRequest = require('./stubs/request')

module.exports = async (folder, name) => {
  const root = path.resolve(folder, 'requests')

  await fs.mkdir(root)
  await createRequest(path.resolve(root, 'create.request.js'))
  await createRequest(path.resolve(root, 'update.request.js'))

  await fs.writeFile(path.resolve(root, 'index.js'), `module.exports = [\n\tcreate: require('./create.request'),\n\tupdate: require('./update.request')\n]`)
}