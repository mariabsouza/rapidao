const express = require('express')
const Tutorial = require('../models/Tutorial')
const router = express.Router()
const TrainingController = require('../controllers/TrainingController')
const checkAuth = require('../helpers/auth').checkAuth
const checkAdmin = require('../helpers/auth').checkAdmin


router.get('/', TrainingController.home)
router.get('/get_data', TrainingController.getData)
router.get('/getTutorial', checkAuth, TrainingController.getTutorial)
router.get('/create', checkAdmin, TrainingController.create)
router.post('/uploadTutorial', checkAdmin, TrainingController.upload)
router.get('/edit/:id', checkAdmin, TrainingController.edit)
router.post('/edit/:id', checkAdmin, TrainingController.update)
router.post('/delete/:id', checkAdmin, TrainingController.delete)
router.get('/error/nonAuthorized', TrainingController.nonAuthorized)

// router.get('/usersDashboard', TrainingController.users)
// router.get('/code', TrainingController.generateCode)
// router.post('/enableCode', TrainingController.enableCode)


module.exports = router