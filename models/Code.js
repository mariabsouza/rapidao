const {DataTypes} = require('sequelize')

const db= require('../db/conn')

const Code = db.define('Code', {
  code: {
    type: DataTypes.STRING,
    required: true
  },
  used: {
    type: DataTypes.BOOLEAN,
    required: true
  }
})

module.exports = Code
