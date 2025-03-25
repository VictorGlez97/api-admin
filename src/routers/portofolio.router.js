const express = require('express')
const router = express.Router()

const portofolioController = require('../controllers/portofolio.controller')

router.post('/portofolio/contact', portofolioController.sendEmail)

module.exports = router