const express = require('express')
const router = express.Router()

const { verifyToken } = require('../helpers/jwt')

const bankController = require('../controllers/bank.controller')

router.get('/bank/user', verifyToken, bankController.getByUser)
router.get('/bank/:id', verifyToken, bankController.getById)
router.post('/bank', verifyToken, bankController.create)
router.put('/bank/:id', verifyToken, bankController.updateById)

module.exports = router