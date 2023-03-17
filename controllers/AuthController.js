const User = require('../models/User')
const { raw } = require('express')
const { all } = require('../routes/authRoutes')
const Code = require('../models/Code')
const Tutorial = require('../models/Tutorial')
const Sequelize = require('sequelize')
const { where } = require('sequelize')
const bcrypt = require('bcryptjs')
const session = require('express-session')

module.exports = class AuthController {
  
  static login(req, res) {
    res.render('auth/login')
  }


  static register(req, res){
    res.render('auth/register')
  }

  static async registerPost(req, res){
    
    const { code, name, email, password, confirmpassword } = req.body

    //password match validation
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!')
      res.render('auth/register')

      return
    }

    //check if its a valid code
    const codeDb = await Code.findOne({where: {code: code}})

    if (!codeDb || codeDb.used == true) {
      req.flash('message', 'O código informado é inválido!')
      res.render('auth/register')

      return
    }


    //Check if user exists

    const checkIfUserExists = await User.findOne({ where: { email: email } })

    if (checkIfUserExists) {
      req.flash('message', 'O e-mail já está em uso!')
      res.render('auth/register')

      return
    }

    //create a password
    //O salt complica ainda mais a criptografia da senha
    const salt = bcrypt.genSaltSync(10)

    //Depois, a gente gera um hash em cima da o salt e criptografa a senha
    const hashedPassword = bcrypt.hashSync(password, salt)

    //Mandar o usuário para o banco de dados
    const user = {
      name,
      email,
      profile: 'user',
      password: hashedPassword
    }

    try {
      const createdUser = await User.create(user)

      Code.update({used: true}, {where: {code: code}})

      //Initialize session
      req.session.userId = createdUser.id
      req.session.user = user.profile
      req.session.profile = user.profile
      req.session.name = user.name

      // console.log( req.session.userId)

      req.flash('message', 'Cadastro realizado com sucesso!')

      req.session.save(() => {
        res.redirect('/')
      })

      console.log(req.session.userId)
      // console.log(session.name)
      // console.log(req.session, "\n\n\n")
    } catch (error) {
      console.log(error)
    }
  }


  static async registerAdmin(req, res){

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync('', salt)
    
    const admin = {
      name: '',
      email: '',
      profile: 'admin',
      password: hashedPassword
    }
    try {
      const createdUser = await User.create(admin)

      //Initialize session
      req.session.userId = createdUser.id
      req.session.user = admin.profile
      req.session.profile = admin.profile
      req.session.name = admin.name

      req.flash('message', 'Cadastro de admin realizado com sucesso!')

      req.session.save(() => {
        res.redirect('/')
      })
    } catch (error) {
      console.log(error)
    }
  }




  static async loginPost(req, res) {
    const email = req.body.email
    const password = req.body.password

    //find user
    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      req.flash('message', 'Usuário não encontrado')
      res.render('auth/login')

      return
    }

    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
      req.flash('message', 'Senha inválida!')
      res.render('auth/login')
      return
    }

    // auth user
    req.session.userId = user.id
    req.session.name = user.name

    if (user.profile == 'admin') {
      req.session.admin = user.profile
      req.session.profile = user.profile
    } else {
      req.session.user = user.profile
      req.session.profile = user.profile
    }

    req.flash('message', 'Login realizado com sucesso!')

    req.session.save(() => {
      res.redirect('/')
    })

    console.log(req.session.profile)
  }
  static logout(req, res) {
    req.session.destroy()
    res.redirect('/')
  }




}
