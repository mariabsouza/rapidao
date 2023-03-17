//É um middleware que checa se o usuário está logado, usado para quando há rotas protegidas
module.exports.checkAuth = function(req, res, next) {
  const userId = req.session.userId

  if(!userId) {
    res.redirect('auth/login')
  }

  next()
}

module.exports.checkAdmin = function(req, res, next) {
  const profile = req.session.profile

  if(profile != "admin") {
    res.redirect('error/nonAuthorized')
  }


  next()
}