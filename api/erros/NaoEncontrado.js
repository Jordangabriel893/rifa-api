class NaoEncontrado extends Error {
  constructor () {
    super('Cliente não foi encontrado!')
    this.name = 'NaoEncontrado'
    this.idErro = 0
  }
}

module.exports = NaoEncontrado
