class Route {

  constructor(crud = false) {
    this.crud = crud
  }

  imports() {
    const routing = `const routing = require('bagong').Router\n`
    const controller = `const <controller> = require('./<controller.file>')\n`

    return routing + controller
  }

  importsRequest() {
    return `const <request> = require('./requests')\n\n`
  }

  exports() {
    return `module.exports = routing({\n\tpath: '/<name>',\n\troutes\n})`
  }

  routeOpen() {
    if (this.crud) {
      return this.imports() + this.importsRequest() + `const routes = [\n`
    }

    return this.imports() + `\nconst routes = [\n`
  }

  routeEnd() {
    return `\n]\n\n` + this.exports()
  }

  path(endpoint) {
    return endpoint.join(',\n')
  }

  endpoint(name, methods) {
    let path = `\t{\n`
    path += `\t\tpath: '${name}',\n`
    path += `\t\tend: {\n`
    
    path = methods.reduce((paths, method) => paths + `\t\t\t${method},\n`, path)

    path += `\t\t}\n\t}`

    return path
  }

}

module.exports = (crud = false) => {
  const route = new Route(crud)

  const index = route.endpoint('/', ['get: <controller>.get'])
  const crudGenerator = route.path([
    route.endpoint('/', [
      'get: <controller>.get',
      'post: [<request>.create, <controller>.create]'
    ]),
    route.endpoint('/:id', [
      'get: <controller>.find',
      'put: [<request>.update, <controller>.update]',
      'delete: <controller>.remove'
    ])
  ])

  if (!crud) {
    return route.routeOpen() + index + route.routeEnd()
  } else {
    return route.routeOpen() + crudGenerator + route.routeEnd()
  }
}