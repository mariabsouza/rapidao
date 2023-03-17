const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersController')


router.get('/dashboard', UsersController.dashboard)
router.get('/code', UsersController.generateCode)
router.post('/enableCode', UsersController.enableCode)
router.post('/delete/:id', UsersController.delete)




module.exports = router