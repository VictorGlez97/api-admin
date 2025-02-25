const express = require('express')
const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

const app = express()

app.use(cors())

require('dotenv').config()

app.use(express.json())

app.use(express.static('public'))

// ROUTERS
const userRouter = require('./src/routers/user.router')
const dictionaryRouter = require('./src/routers/dictionary.router')
const bankRouter = require('./src/routers/bank.router')
const tradeRouter = require('./src/routers/trade.router')

app.use('/api', userRouter)
app.use('/api', dictionaryRouter)
app.use('/api', bankRouter)
app.use('/api', tradeRouter)

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})