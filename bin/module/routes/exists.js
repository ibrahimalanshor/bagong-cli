const fs = require('fs').promises
const path = require('path')
const folder = require('./folder')

module.exports = async (modulesPath, name) => {
  const modules = await folder(modulesPath)

  return modules.some(item => item === name)
}