const express = require('express')
const router = express.Router()

const bankController = require('../controllers/bank.controller')

router.get('/bank/user/:id', bankController.getByUser)
router.get('/bank/:id', bankController.getById)
router.post('/bank', bankController.create)
router.put('/bank/:id', bankController.updateById)

module.exports = router