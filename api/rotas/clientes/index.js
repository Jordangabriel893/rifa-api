const roteador = require('express').Router()
const TabelaClientes = require('../TabelaClientes')
const Cliente = require('../Cliente')
const SerializadorCliente = require('../../Serializador').SerializadorCliente

roteador.get('/', async (requisicao, resposta) => {
  const resultados = await TabelaClientes.listar()
  resposta.status(200)
  const serializador = new SerializadorCliente(
    resposta.getHeader('Content-Type')
  )
  resposta.send(
    serializador.serializar(resultados)
  )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
  try {
    const dadosRecebidos = requisicao.body
    const cliente = new Cliente(dadosRecebidos)
    await cliente.criar()
    const serializador = new SerializadorCliente(
      resposta.getHeader('Content-Type')
    )
    resposta.send(
      serializador.serializar(cliente)
    )
  } catch (erro) {
    proximo(erro)
  }
})

roteador.get('/:idCliente', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idCliente
    const cliente = new Cliente({ id: id })
    await cliente.carregar()
    resposta.status(200)
    const serializador = new SerializadorCliente(
      resposta.getHeader('Content-Type'),
      ['dataCriacao', 'dataAtualizacao', 'versao']
    )
    resposta.send(
      serializador.serializar(cliente)
    )
  } catch (erro) {
    proximo(erro)
  }
})

roteador.put('/:idCliente', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idCliente
    const dadosRecebidos = requisicao.body
    const dados = Object.assign({}, dadosRecebidos, { id: id })
    const cliente = new Cliente(dados)
    await cliente.atualizar()
    resposta.status(204)
    resposta.end()
  } catch (erro) {
    proximo(erro)
  }
})

roteador.delete('/:idCliente', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idCliente
    const cliente = new Cliente({ id: id })
    await cliente.carregar()
    await cliente.remover()
    resposta.status(204)
    resposta.end()
  } catch (erro) {
    proximo(erro)
  }
})

module.exports = roteador
