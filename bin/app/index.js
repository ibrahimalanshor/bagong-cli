const shell = require('shelljs')

module.exports = async name => {
  try {
    shell.exec(`git clone https://github.com/ibrahimalanshor/bagong-start.git ${name}`)
    shell.cd(name)
    shell.exec('npm install')

    console.log('success install bagong app!!!')
  } catch (err) {
    console.log(err)
  }
}