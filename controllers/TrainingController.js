const { raw } = require('express')
const Tutorial = require('../models/Tutorial')
const Code = require('../models/Code')
const { all } = require('../routes/trainingRoutes')
const Sequelize = require('sequelize')
var multer = require('multer')
const { where } = require('sequelize')
const User = require('../models/User')

module.exports = class TrainingController {
  static async home(req, res) {
    //base
    // let data = await Tutorial.findAll()
    // data = data.map((result) => result.get({plain: true}))

    let data = await Tutorial.aggregate('pilar', 'DISTINCT', { plain: false })

    res.render('home', { data })
  }

  static async getData(request, response, next) {
    let type = request.query.type
    let pilarValue = request.query.pilar_value
    // let requestValue = request.query.request_value

    const search_query = request.query.parent_value

    if (type == 'load_request') {

      var data = await Tutorial.findAll({
        where: { pilar: search_query },
        attributes: ['request'],
        col: 'request',
        distinct: true,
        raw: true
      })

      var data_arr = []

      data.forEach(function (row) {
        data_arr.push(row.request)
      })


      
      var data_arr = data_arr.filter((este, i) => data_arr.indexOf(este) === i); 



      response.json(data_arr)

    }

    if (type == 'load_systems') {
      var data = await Tutorial.findAll({
        where: { request: search_query, pilar: pilarValue },
        attributes: ['systems'],
        distinct: true,
        col: 'systems',
        raw: true
      })

      var data_arr = []

      data.forEach(function (row) {
        data_arr.push(row.systems)
      })

      response.json(data_arr)
    }
  }

  static async getTutorial(req, res) {
    const pilar = req.query.pilar
    const request = req.query.request
    const systems = req.query.systems

    var data = await Tutorial.findOne({
      where: { pilar, request, systems },
      raw: true
    })


    res.render('tutorial', { data })
  }

  static async create(req, res) {
    res.render('create')
  }

  static async upload(req, res) {

    const pilar = req.body.pilar
    const request = req.body.request
    const systems = req.body.systems
    const steps = req.body.steps.replace(/\r?\n/g, '<br>')
    const script = req.body.script
    const customer_manual = req.body.customer_manual
    const internal_manual = req.body.internal_manual
    const video = req.body.video

    const tutorial = {
      pilar,
      request,
      systems,
      steps,
      script,
      customer_manual,
      internal_manual,
      video
    }

    try {
      await Tutorial.create(tutorial)
  
      
      // req.flash('message', 'Tutorial criado com sucesso')
      res.redirect('/')
        
      } catch (error) {
        console.log(error)
      }

  }

  static async edit(req, res) {

    const id = req.params.id
    var data = await Tutorial.findOne({
      where: {id},
      raw: true
    })

    data.steps = data.steps.replace(/<br\s*\/?>/ig, "\r\n")

    res.render('edit', {data})
  }

  static async update(req, res) {

    const id = req.params.id

    const pilar = req.body.pilar
    const request = req.body.request
    const systems = req.body.systems
    const steps = req.body.steps
    const script = req.body.script
    const customer_manual = req.body.customer_manual
    const internal_manual = req.body.internal_manual
    const video = req.body.video

    await Tutorial.update({pilar: pilar, request: request, systems: systems, steps: steps, script: script, customer_manual: customer_manual, internal_manual: internal_manual, video: video}, {where: {id:id}})

    res.redirect('/')
  }

  static async delete(req, res){
    const id = req.params.id
    console.log(id)

    await Tutorial.destroy({where: {id : id}})

    res.redirect('/')
  }

  static async nonAuthorized(req, res) {
    res.render('error/nonAuthorized')
  }

  // static async generateCode(req, res) {
  //   let result = '';
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const charactersLength = characters.length;
  //   let counter = 0;
  //   while (counter < 8) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     counter += 1;
  //   }

  //   return res.json(result)


  // }

  // static async users (req, res) {

  //   let users = await User.findAll({
  //     raw: true, 
  //     where: {profile: 'user'}
  //   })

  //   res.render('usersDashboard', {users})
  // }



  // static async enableCode(req, res){
  //   const code = {
  //     code: req.body.result,
  //     used: false
  //   }
  //   try {
  //     await Code.create(code)
  
  //     res.redirect('/users')
        
  //     } catch (error) {
  //       console.log(error)
  //     }
  // }

}
