const express = require('express')
const router = express.Router()

const portofolioController = require('../controllers/portofolio.controller')

/**
 * @swagger
 * /send-email:
 *   post:
 *     summary: Envía un mensaje de contacto por correo electrónico.
 *     description: Recibe los datos de contacto y los envía por correo usando un template HTML. También almacena los datos en la base de datos si el correo se envía correctamente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Victor Gonzalez"
 *               mail:
 *                 type: string
 *                 format: email
 *                 example: "vicglez@example.com"
 *               phone:
 *                 type: string
 *                 example: "+52 871123456"
 *               message:
 *                 type: string
 *                 example: "Hola, me interesa tu portafolio."
 *     responses:
 *       200:
 *         description: Mensaje enviado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Se envió el mensaje correctamente"
 *       402:
 *         description: No fue posible enviar el mensaje.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "No fue posible hacer el envío del mensaje"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Error en el servidor"
 */
router.post('/portofolio/contact', portofolioController.sendEmail)

module.exports = router