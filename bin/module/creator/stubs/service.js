const Stub = require('./stub')

class Service extends Stub {

  imports() {
    const service = `const Service = require('bagong').Service\n`
    const repo = `const <repo.name> = require('./<repo.file>')\n\n`

    return service + repo
  }

  openClass() {
    return this.imports () + `class <name> extends Service {\n\n`
  }

  content(content) {
    return content.join('\n\n\t\t')
  }

  creator(methods) {
    const base = this

    return methods.map(function ({ name, params, content }) {
      return base.methods(name, params, base.content(content))
    }).join('')
  }

}

const service = new Service

const crudMethods = [
  {
    name: 'get',
    params: '',
    content: [`const <results> = await <repo.name>.get({})`, `return <results>`]
  },
  {
    name: 'create',
    params: 'data',
    content: [`const <result> = await <repo.name>.create(data)`, `return <result>`]
  },
  {
    name: 'find',
    params: 'id',
    content: [`await this.checkValidId(id)`, `const <result> = await <repo.name>.find(id)`, `return <result>`]
  },
  {
    name: 'update',
    params: 'id, data',
    content: [`await this.checkValidId(id)`, `const <result> = await <repo.name>.update(id, data)`, `return <result>`]
  },
  {
    name: 'remove',
    params: 'id',
    content: [`await this.checkValidId(id)`, `const <result> = await <repo.name>.delete(id)`, `return <result>`]
  }
]

const index = service.methods('get', '', [`const <results> = await <repo.name>.find({})`, `return <results>`].join('\n\n\t\t'))

const crudGenerator = service.creator(crudMethods)

module.exports = (crud = false) => {
  if (!crud) {
    return service.openClass() + index + service.closeClass()
  } else {
    return service.openClass() + crudGenerator + service.closeClass()
  }
}