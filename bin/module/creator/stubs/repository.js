const Stub = require('./stub')

class Repository extends Stub {

  imports() {
    const repository = `const Repository = require('bagong').Repository\n`
    const model = `const <model.name> = require('./<model.file>')\n\n`

    return repository + model
  }

  openClass() {
    return this.imports () + `class <name> extends Repository {\n\n`
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

const repository = new Repository

const crudMethods = [
  {
    name: 'get',
    params: '',
    content: [`const <results> = await <model.name>.find({})`, `return <results>`]
  },
  {
    name: 'create',
    params: 'data',
    content: [`const <result> = await <model.name>.create(data)`, `return <result>`]
  },
  {
    name: 'find',
    params: 'id',
    content: [`const <result> = await <model.name>.findById(id)`, `return this.result(<result>)`]
  },
  {
    name: 'update',
    params: 'id, data',
    content: [`const <result> = await <model.name>.findByIdAndUpdate(id, data)`, `return this.result(<result>)`]
  },
  {
    name: 'remove',
    params: 'id',
    content: [`const <result> = await <model.name>.findByIdAndDelete(id)`, `return this.result(<result>)`]
  }
]

const index = repository.methods('get', '', [`const <results> = await <model.name>.find({})`, `return <results>`].join('\n\n\t\t'))

const crudGenerator = repository.creator(crudMethods)

module.exports = (crud = false) => {
  if (!crud) {
    return repository.openClass() + index + repository.closeClass()
  } else {
    return repository.openClass() + crudGenerator + repository.closeClass()
  }
}