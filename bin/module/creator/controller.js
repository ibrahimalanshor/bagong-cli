const pluralize = require('pluralize')
const path = require('path')
const fs = require('fs').promises

const makeClass = require('./naming')
const controller = require('./stubs/controller')

const render = (stub, name) => {  
  return stub
    .replace(/<name>/gi, makeClass(name, 'Controller'))
    .replace(/<service>/gi, makeClass(name, 'Service'))
    .replace(/<file>/gi, name)
    .replace(/<results>/gi, pluralize.plural(name))
    .replace(/<result>/gi, pluralize.singular(name))
}

module.exports = async (name, { folder, crud = false }) => {
  const fileName = `${name}.controller.js`

  const content = await render(controller(crud), name)
  const file = path.resolve(folder, fileName)

  await fs.writeFile(file, content)

  return {
    name: makeClass(name, 'Controller'),
    file: fileName
  }
}