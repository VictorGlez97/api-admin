const express = require('express')
const router = express.Router()

const dictionaryController = require('../controllers/dictionary.controller')

router.get('/dictionary/:dictionary', dictionaryController.getByDictionary)

module.exports = router