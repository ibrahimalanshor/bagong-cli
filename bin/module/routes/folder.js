const path = require('path')
const fs = require('fs').promises

module.exports = async modulesPath => {
  let modules = await fs.readdir(modulesPath)

  modules = await Promise.all(modules.filter(async name => {
    const dir = path.join(modulesPath, name)
    const dirStat = await fs.lstat(dir)
    const isFolder = dirStat.isDirectory()

    if (isFolder) {
      const files = await fs.readdir(dir)

      return files.includes(`${name}.route.js`)
    }
  }))

  return modules
}