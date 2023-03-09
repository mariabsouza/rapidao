const { request } = require('express')
const {DataTypes} = require('sequelize')

const db= require('../db/conn')

const Tutorial = db.define('Tutorial', {
  pilar: {
    type: DataTypes.STRING,
    required: true
  },
  request: {
    type: DataTypes.STRING,
    required: true
  },
  systems: {
    type: DataTypes.STRING,
    required: true
  },
  steps: {
    type: DataTypes.TEXT('long'),
    required: true
  }, 
  script: {
    type: DataTypes.STRING,
  }, 
  customer_manual: {
    type: DataTypes.STRING,
  }, 
  internal_manual: {
    type: DataTypes.STRING,
  }, 
  video: {
    type: DataTypes.STRING,
  }, 
})

module.exports = Tutorial