const TabelaCliente = require('./TabelaClientes')
const CampoInvalido = require('../erros/CampoInvalido')
const DadosNaoFornecidos = require('../erros/DadosNaoFornecidos')

class Cliente {
  constructor ({ id, numero, email, nome, telefonePrimario, telefoneSecundario, status, dataCriacao, dataAtualizacao, versao }) {
    this.id = id
    this.numero = numero
    this.email = email
    this.nome = nome
    this.telefonePrimario = telefonePrimario
    this.telefoneSecundario = telefoneSecundario
    this.status = status
    this.dataCriacao = dataCriacao
    this.dataAtualizacao = dataAtualizacao
    this.versao = versao
  }

  async criar () {
    const resultado = await TabelaCliente.inserir({
      numero: this.numero,
      email: this.email,
      nome: this.nome,
      telefonePrimario: this.telefonePrimario,
      telefoneSecundario: this.telefoneSecundario,
      status: this.status
    })

    this.id = resultado.id
    this.dataCriacao = resultado.dataCriacao
    this.dataAtualizacao = resultado.dataAtualizacao
    this.versao = resultado.versao
  }

  async carregar () {
    const encontrado = await TabelaCliente.pegarPorId(this.id)
    this.numero = encontrado.numero
    this.email = encontrado.email
    this.nome = encontrado.nome
    this.status = encontrado.status
    this.telefonePrimario = encontrado.telefonePrimario
    this.telefoneSecundario = encontrado.telefoneSecundario
    this.dataCriacao = encontrado.dataCriacao
    this.dataAtualizacao = encontrado.dataAtualizacao
    this.versao = encontrado.versao
  }

  async atualizar () {
    await TabelaCliente.pegarPorId(this.id)
    const campos = ['numero', 'email', 'nome', 'telefonePrimario', 'telefoneSecundario', 'status']
    const dadosParaAtualizar = {}

    campos.forEach((campo) => {
      const valor = this[campo]

      if (typeof valor === 'string' && valor.length > 0) {
        dadosParaAtualizar[campo] = valor
      }
    })

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new DadosNaoFornecidos()
    }

    await TabelaCliente.atualizar(this.id, dadosParaAtualizar)
  }

  remover () {
    return TabelaCliente.remover(this.id)
  }

  validar () {
    const campos = ['numero', 'email', 'nome', 'telefonePrimario', 'telefoneSecundario', 'status']

    campos.forEach(campo => {
      const valor = this[campo]

      if (typeof valor !== 'string' || valor.length === 0) {
        throw new CampoInvalido(campo)
      }
    })
    return true
  }
}

module.exports = Cliente
