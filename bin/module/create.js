const pluralize = require('pluralize')

const { createFolder, createController, createRequest, createRoute, createModel, createRepository, createService } = require('./creator')
const { appendRoutes, existsRoutes } = require('./routes')

module.exports = async (name, options) => {
  try {
    name = pluralize.singular(name).toLowerCase()

    const path = `./src/modules/${name}`
    const exists = await existsRoutes('./src/modules', name)

    const folder = await createFolder(path)
    const controller = await createController(name, { folder: path, crud: options.crud })
    const route = await createRoute(name, { folder: path, crud: options.crud })

    if (options.model || options.modelAndRepo || options.modelAndService || options.modelRepoAndService || options.crud) {
      await createModel(path, name)
    }

    if (options.repository || options.modelAndRepo || options.modelRepoAndService || options.repoAndService || options.crud) {
      await createRepository(name, { folder: path, crud: options.crud })
    }

    if (options.service || options.modelAndService || options.modelRepoAndService || options.repoAndService || options.crud) {
      await createService(name, { folder: path, crud: options.crud })
    }

    if (options.crud) {
      await createRequest(path, name)
    }

    if (!exists) {
      await appendRoutes(name)
    }

    console.log('module created')
  } catch (err) {
    console.log(err)
  }
}