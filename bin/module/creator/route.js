const path = require('path')
const fs = require('fs').promises
const router = require('./stubs/route')
const makeClass = require('./naming')

const makeFile = (stub, name) => {
  return stub
    .replace(/<controller>/gi, makeClass(name, 'Controller'))
    .replace(/<controller.file>/gi, `${name}.controller.js`)
    .replace(/<request>/gi, makeClass(name, 'Request'))
    .replace(/<name>/gi, name)
}

module.exports = async (name, { folder, crud = false }) => {
  const fileName = `${name}.route.js`

  const routes = router(crud)

  const content = await makeFile(routes, name)
  const file = path.resolve(folder, fileName)

  await fs.writeFile(file, content)
}