const fs = require('fs').promises

const stub = `const validator = require('bagong').Validator\n\nconst rules = {\n\tname: ['required', 'string']\n}\n\nmodule.exports = validator(rules)`

module.exports = async name => {
  await fs.writeFile(name, stub)
}