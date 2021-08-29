const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

const createRequest = require('./creator/stubs/request')

module.exports = async (name, moduleName) => {
  try {
    const folder = path.resolve('./src/modules', moduleName)
    const requestFolder = path.resolve(folder, 'requests')
    const indexPath = path.resolve(requestFolder, 'index.js')

    if (!fs.existsSync(folder)) {
      throw 'Module does not exists'
    }

    if (!fs.existsSync(requestFolder)) {
      await fsPromise.mkdir(requestFolder)
    }

    if (!fs.existsSync(indexPath)) {
      await fsPromise.writeFile(indexPath, 'module.exports = {\n}')
    }

    await createRequest(path.resolve(requestFolder, `${name}.request.js`))

    const indexFile = await fsPromise.readFile(indexPath, 'utf8')

    let routes = indexFile.substr(0, indexFile.length - 2) + `\n\t${name}: require('./${name}.request'),\n]`
    routes = routes.replace(/,{2,}/gi, ',')

    await fsPromise.writeFile(indexPath, routes)

    console.log('Request created')
  } catch (err) {
    console.log(err)
  }
}