const express = require('express')
const router = express.Router()

const { verifyToken } = require('../helpers/jwt')

const userController = require('../controllers/user.controller')

router.get('/user', verifyToken, userController.getAll)
router.get('/user/:id', verifyToken, userController.getById)
router.post('/user', verifyToken, userController.create)
router.post('/user/login', userController.login)
router.put('/user/:id', verifyToken, userController.updateById)
router.put('/user/pass/:id', verifyToken, userController.updatePassword)

module.exports = router