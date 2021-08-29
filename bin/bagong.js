#! /usr/bin/env node

const { program } = require('commander')
const { createModule, createRequest, removeModule } = require('./module')
const createApp = require('./app')

program
  .command('module:create <name>')
  .description('create new module')
  .option('-m, --model', 'with model')
  .option('-r, --repository', 'with repository')
  .option('-s, --service', 'with service')
  .option('-mr, --modelAndRepo', 'with model and repository')
  .option('-ms, --modelAndService', 'with model and service')
  .option('-mrs, --modelRepoAndService', 'with model, repository and service')
  .option('-rs, --repoAndService', 'with repository and service')
  .option('-c, --crud', 'crud generator')
  .action(createModule)

program
  .command('module:remove <name>')
  .description('remove a module')
  .action(removeModule)

program
  .command('request:create <name>')
  .description('create form request')
  .option('-m, --module <module>', 'module name')
  .action((name, options) => {
    if (!options.module) {
      console.log(`error: option '-m, --module <module>' module missing`)
    } else {
      createRequest(name, options.module)
    }
  })

program
  .command('new <name>')
  .description('new bagong app')
  .action(createApp)

program.parse(process.argv)