const express = require('express')
const router = express.Router()

const { verifyToken } = require('../helpers/jwt')

const tradeController = require('../controllers/trade.controller')

// router.get('/trade', tradeController.getAll)
router.get('/trade/:id', verifyToken, tradeController.getById)
router.post('/trade', verifyToken, tradeController.create)
router.put('/trade/:id', verifyToken, tradeController.updateById)

module.exports = router