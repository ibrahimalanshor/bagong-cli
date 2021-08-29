const Stub = require('./stub')

class Controller extends Stub {

  imports() {
    const collection = `const { collection } = require('bagong').Helpers\n\n`
    const service = `const <service> = require('./<file>.service')\n\n`

    return collection + service
  }

  creator(methods) {
    const base = this

    return methods.map(function ({ name, content }) {
      return base.methods(name, 'req, res, next', base.tryCatch(base.content(content)))
    }).join('')
  }  

}

const controller = new Controller

const crudMethods = [
  {
    name: 'get',
    content: [`const <results> = await <service>.get(req.query)`, `return collection(res, <results>)`]
  },
  {
    name: 'create',
    content: [`const <result> = await <service>.create(req.body)`, `return collection(res, { status: 201, data: <result> })`]
  },
  {
    name: 'show',
    content: [`const <result> = await <service>.find(req.params.id)`, `return collection(res, <result>)`]
  },
  {
    name: 'update',
    content: [`const <result> = await <service>.update(req.params.id, req.body)`, `return collection(res, <result>)`]
  },
  {
    name: 'remove',
    content: [`const <result> = await <service>.delete(req.params.id)`, `return collection(res, 'Success delete data')`]
  }
]

const index = controller.methods('get', 'req, res, next', controller.tryCatch(`return res.status(200).json('Ok')`))

const crudGenerator = controller.creator(crudMethods)

module.exports = (crud = false) => {
  if (!crud) {
    return controller.openClass() + index + controller.closeClass()
  } else {
    return controller.imports() + controller.openClass() + crudGenerator + controller.closeClass()
  }
}