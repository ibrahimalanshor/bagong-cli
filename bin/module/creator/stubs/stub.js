class Stub {

  openClass() {
    return `class <name> {\n\n`
  }

  closeClass() {
    return `}\n\nmodule.exports = new <name>`
  }

  methods(name, params, content) {
    const methodOpen = `\tasync ${name}(${params}) {\n\t\t`
    const methodEnd = `\n\t}\n\n`

    return methodOpen + content + methodEnd
  }

  tryCatch(content) {
    const tryCatchOpen = `try {\n\t\t\t`
    const tryCatchEnd = `\n\t\t} catch (err) {\n\t\t\tnext(err)\n\t\t}`

    return tryCatchOpen + content + tryCatchEnd
  }

  content(content) {
    return content.join('\n\n\t\t\t')
  }

}

module.exports = Stub