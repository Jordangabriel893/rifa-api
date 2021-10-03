const ModeloTabela = require('../rotas/ModeloTabelaClientes')

ModeloTabela
  .sync()
  .then(() => console.log('Tabela criada com sucesso'))
  .catch(console.log)
