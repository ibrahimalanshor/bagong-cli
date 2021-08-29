const path = require('path')
const fs = require('fs').promises
const makeClass = require('./naming')

const model = `const Model = require('bagong').Model

class <className> extends Model {

  model = '<name>'

  property() {
    return {
      name: String,
    }
  }

  attribute() {
    return {
      timestamps: true
    }
  }

}

module.exports = new <className>().get()`

const render = name => {
  const className = makeClass(name, 'Model')

  return model.replace(/<className>/gi, className).replace(/<name>/gi, name)
}

module.exports = async (folder, name) => {
  const fileName = `${name}.model.js`

  const content = await render(name)

  const file = await path.resolve(folder, fileName)

  await fs.writeFile(file, content)
}