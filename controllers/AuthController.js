const User = require('../models/User')

const session = require('express-session')

module.exports = class AuthController {
  static login(req, res) {
    res.render('login')
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


    if (password != user.password ) {


      req.flash('message', 'Senha inválida!')
      res.render('login')
      return
    }

    // auth user
    req.session.userId = user.id

    req.flash('message', 'Login realizado com sucesso!')

    req.session.save(() => {
      res.redirect('/')
    })
  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect('/')
  }
}
