const express = require('express')
const router = express.Router()

const tradeController = require('../controllers/trade.controller')

// router.get('/trade', tradeController.getAll)
router.get('/trade/:id', tradeController.getById)
router.post('/trade', tradeController.create)
router.put('/trade/:id', tradeController.updateById)

module.exports = router