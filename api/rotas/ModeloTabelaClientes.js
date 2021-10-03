const Sequelize = require('sequelize')
const instancia = require('../banco-de-dados')

const colunas = {
  numero: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: true
  },
  telefonePrimario: {
    type: Sequelize.STRING,
    allowNull: true
  },
  telefoneSecundario: {
    type: Sequelize.STRING,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('livre', 'reservado', 'pago'),
    allowNull: true
  }
}

const opcoes = {
  freezeTableName: true,
  tableName: 'clientes',
  timestamps: true,
  createdAt: 'dataCriacao',
  updatedAt: 'dataAtualizacao',
  version: 'versao'
}

module.exports = instancia.define('clientes', colunas, opcoes)
