const pluralize = require('pluralize')
const path = require('path')
const fs = require('fs').promises
const makeClass = require('./naming')

const repository = require('./stubs/repository')

const render = (stub, name) => {
  const className = makeClass(name, 'Repository')
  const modelClass = makeClass(name, 'Model')
  const modelName = `${name}.model.js`

  return stub
    .replace(/<name>/gi, className)
    .replace(/<model.name>/gi, modelClass)
    .replace(/<model.file>/gi, modelName)
    .replace(/<results>/gi, pluralize.plural(name))
    .replace(/<result>/gi, pluralize.singular(name))
}

module.exports = async (name, { folder, crud = false }) => {
  const fileName = `${name}.repository.js`

  const content = await render(repository(crud), name)

  const file = await path.resolve(folder, fileName)

  await fs.writeFile(file, content)
}