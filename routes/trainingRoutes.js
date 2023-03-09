const express = require('express')
const Tutorial = require('../models/Tutorial')
const router = express.Router()
const TrainingController = require('../controllers/TrainingController')
const checkAuth = require('../helpers/auth').checkAuth


router.get('/', TrainingController.home)
router.get('/get_data', TrainingController.getData)
router.get('/getTutorial', TrainingController.getTutorial)
router.get('/create', checkAuth, TrainingController.create)
router.post('/uploadTutorial', TrainingController.upload)
router.get('/dashboard', checkAuth, TrainingController.dashboard)
router.get('/edit/:id', checkAuth, TrainingController.edit)
router.post('/edit/:id', checkAuth, TrainingController.update)
router.post('/delete/:id', checkAuth, TrainingController.delete)


module.exports = router