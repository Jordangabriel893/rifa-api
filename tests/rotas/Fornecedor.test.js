jest.mock('../../api/rotas/TabelaClientes.js')
const Cliente = require('../../api/rotas/Cliente')

describe('classe Cliente', () => {
  test('o método validar() retorna true', () => {
    const cliente = new Cliente({
      numero: '001',
      email: 'contato@gatito.com.br',
      nome: 'Fulano de Almeida',
      telefonePrimario: '61987322922',
      telefoneSecundario: '61986352295',
      status: 'reservado'
    })

    expect(cliente.validar()).toBe(true)
  })

  test('o método criar() foi executado com sucesso', async () => {
    const cliente = new Cliente({
      numero: '001',
      email: 'contato@gatito.com.br',
      nome: 'Fulano de Almeida',
      telefonePrimario: '61987322922',
      telefoneSecundario: '61986352295',
      status: 'reservado'
    })

    await cliente.criar()

    expect(cliente.id).toBe(500)
    expect(cliente.dataCriacao).toBe('10/12/3420')
    expect(cliente.dataAtualizacao).toBe('10/12/3420')
    expect(cliente.versao).toBe(90)
  })
})
