const path = require('path')
const fs = require('fs')
const folder = require('./folder')

const renderRoute = routes => {
  const start = `module.exports = [\n`
  const end = `\n]`

  routes = routes.map(route => `\trequire('./modules/${route}/${route}.route.js')`)
  routes = routes.join(',\n')

  return start + routes + end
}

module.exports = async name => {
  const modulesPath = './src/modules'

  let modules = await folder(modulesPath)

  modules = modules.map(name => {
    const dir = path.join(modulesPath, name)
    const dirStat = fs.lstatSync(dir)

    return {
      name,
      time: dirStat.mtime.getTime()
    }
  }).sort((a, b) => {
    return a.time - b.time
  }).map(item => item.name)

  const routes = path.resolve('./src/routes.js')

  await fs.promises.writeFile(routes, renderRoute(modules))
}