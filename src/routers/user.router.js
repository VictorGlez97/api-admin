const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.get('/user', userController.getAll)
router.get('/user/:id', userController.getById)
router.post('/user', userController.create)
router.post('/user/login', userController.login)
router.put('/user/:id', userController.updateById)
router.put('/user/pass/:id', userController.updatePassword)

module.exports = router