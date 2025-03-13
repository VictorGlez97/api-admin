const express = require('express')
const cors = require('cors')
// const fs = require('fs');
// const path = require('path');
const cookieParser = require('cookie-parser')

// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']

const app = express()

app.use(cookieParser())

app.use(cors())

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }))

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             return callback(null, true);
//         }
//         return callback(new Error('Acceso bloqueado'));
//     }
// }));

require('dotenv').config()

app.use(express.json())

app.use(express.static('public'))

// ROUTERS
const userRouter = require('./src/routers/user.router')
const dictionaryRouter = require('./src/routers/dictionary.router')
const bankRouter = require('./src/routers/bank.router')
const tradeRouter = require('./src/routers/trade.router')
const dashboard = require('./src/routers/dashboard.router')

// PORTOFOLIO
const portofolio = require('./src/routers/portofolio.router')

app.use('/api', userRouter)
app.use('/api', dictionaryRouter)
app.use('/api', bankRouter)
app.use('/api', tradeRouter)
app.use('/api/', dashboard)

// PORTOFOLIO
app.use('/api', portofolio)

app.listen(process.env.PORT, () => {  
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})

// export const getBaseUrl = () => {
//     if (process.env.NODE_ENV === 'development') {
//         return 'http://localhost:5000';
//     }
//     return process.env.NEXT_PUBLIC_VERCEL_URL;
// }