module.exports = (name, prefix) => {
  name = name.toLowerCase()
  name = name[0].toUpperCase() + name.substr(1) + prefix

  return name
}