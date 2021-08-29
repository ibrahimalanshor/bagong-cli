const pluralize = require('pluralize')
const path = require('path')
const fs = require('fs').promises
const makeClass = require('./naming')

const service = require('./stubs/service')

const render = (stub, name) => {
  const className = makeClass(name, 'Service')
  const repoClass = makeClass(name, 'Repository')
  const repoName = `${name}.repository.js`

  return stub
    .replace(/<name>/gi, className)
    .replace(/<repo.name>/gi, repoClass)
    .replace(/<repo.file>/gi, repoName)
    .replace(/<results>/gi, pluralize.plural(name))
    .replace(/<result>/gi, pluralize.singular(name))
}

module.exports = async (name, { folder, crud = false }) => {
  const fileName = `${name}.service.js`

  const content = await render(service(crud), name)

  const file = await path.resolve(folder, fileName)

  await fs.writeFile(file, content)
}