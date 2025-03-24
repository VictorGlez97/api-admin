const express = require('express')
const router = express.Router()

const { verifyToken } = require('../helpers/jwt')

const userController = require('../controllers/user.controller')

/**
 * @swagger
 * /user:
 *  get:
 *      summary: Obtiene todos los usuarios
 *      description: Retorna una lista de usuarios registrados.
 *      responses:
 *          200:
 *          description: Lista de usuarios obtenida correctamente
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  example: 1
 *                              name:
 *                                  type: string
 *                                  example: Juan Pérez
 */
router.get('/user', verifyToken, userController.getAll)

router.get('/user/:id', verifyToken, userController.getById)
router.post('/user', verifyToken, userController.create)
router.post('/user/login', userController.login)
router.put('/user/:id', verifyToken, userController.updateById)
router.put('/user/pass/:id', verifyToken, userController.updatePassword)

module.exports = router