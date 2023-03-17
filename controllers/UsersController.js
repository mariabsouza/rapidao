const { raw } = require('express')
const Tutorial = require('../models/Tutorial')
const Code = require('../models/Code')
const { all } = require('../routes/trainingRoutes')
const Sequelize = require('sequelize')
var multer = require('multer')
const { where } = require('sequelize')
const User = require('../models/User')

module.exports = class UserControllers  {
  static async dashboard (req, res) {

    let users = await User.findAll({
      raw: true, 
      where: {profile: 'user'}
    })

    res.render('users/dashboard', {users})
  }

  static async enableCode(req, res){
    const code = {
      code: req.body.result,
      used: false
    }
    try {
      await Code.create(code)
  
      res.redirect('/users/dashboard')
        
      } catch (error) {
        console.log(error)
      }
  }

  static async generateCode(req, res) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 8) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return res.json(result)


  }

  static async delete(req, res) {
    const id = req.params.id

    await User.destroy({where: {id : id}})

    res.redirect('/users/dashboard')
  }

  


}