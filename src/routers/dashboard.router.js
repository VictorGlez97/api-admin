const express = require('express')
const router = express.Router()

const { verifyToken } = require('../helpers/jwt')

const dashboardController = require('../controllers/dashboard.controller')

router.get('/dashboard/banks', verifyToken, dashboardController.chartBanksByUser)
router.get('/dashboard/bydate', verifyToken, dashboardController.chartByDate)

module.exports = router