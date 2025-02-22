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

app.use('/admin', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})